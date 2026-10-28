
import os
import uuid
from pathlib import Path
from urllib.parse import quote
from dotenv import load_dotenv
import math
import requests
import firebase_admin
from firebase_admin import credentials, storage, firestore
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


app = FastAPI(title="Wavexa Backend")
load_dotenv(Path(__file__).resolve().parent / ".env")

# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://wavexaglobal.com",
        "https://www.wavexaglobal.com",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


# =========================================================
# FIREBASE ADMIN
# =========================================================

KEY_PATH = Path(__file__).resolve().parent / "serviceAccountKey.json"

if not firebase_admin._apps:
    if os.getenv("K_SERVICE"):
        # Cloud Run: use attached service identity.
        firebase_admin.initialize_app(
            options={
                "storageBucket": "health-conference.firebasestorage.app",
            }
        )
    else:
        # Local development.
        if not KEY_PATH.is_file() or KEY_PATH.stat().st_size == 0:
            raise RuntimeError(
                "Firebase service account key is missing or empty."
            )

        credential = credentials.Certificate(str(KEY_PATH))
        firebase_admin.initialize_app(
            credential,
            {
                "storageBucket": "health-conference.firebasestorage.app",
            },
        )

bucket = storage.bucket()
db = firestore.client()


# =========================================================
# ABSTRACT UPLOAD CONFIGURATION
# =========================================================

MAX_FILE_SIZE = 5 * 1024 * 1024

ALLOWED_TYPES = {
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": (
        "application/vnd.openxmlformats-officedocument."
        "wordprocessingml.document"
    ),
}


# =========================================================
# PAYPAL CONFIGURATION
# =========================================================

PAYPAL_MODE = os.getenv("PAYPAL_MODE", "sandbox").strip().lower()
PAYPAL_CLIENT_ID = os.getenv("PAYPAL_CLIENT_ID", "").strip()
PAYPAL_CLIENT_SECRET = os.getenv("PAYPAL_CLIENT_SECRET", "").strip()

if PAYPAL_MODE not in {"sandbox", "live"}:
    raise RuntimeError("PAYPAL_MODE must be 'sandbox' or 'live'.")

PAYPAL_BASE_URL = (
    "https://api-m.sandbox.paypal.com"
    if PAYPAL_MODE == "sandbox"
    else "https://api-m.paypal.com"
)

PAYPAL_TIMEOUT = 25


# =========================================================
# BACKEND TICKET PRICES
#
# Keep these prices synchronized with TICKETS in
# src/data/conferenceLegacy.ts.
#
# Never accept a payment amount supplied by the browser.
# =========================================================

TICKET_PRICES = {
    "Academic": {
        "Speaker": {
            "earlyBird": {"EUR": 149, "USD": 159, "GBP": 129},
            "standard": {"EUR": 169, "USD": 179, "GBP": 145},
            "final": {"EUR": 189, "USD": 199, "GBP": 159},
        },
        "Delegate": {
            "earlyBird": {"EUR": 79, "USD": 85, "GBP": 69},
            "standard": {"EUR": 89, "USD": 95, "GBP": 79},
            "final": {"EUR": 99, "USD": 109, "GBP": 89},
        },
        "Workshop Presenter": {
            "earlyBird": {"EUR": 179, "USD": 195, "GBP": 149},
            "standard": {"EUR": 199, "USD": 215, "GBP": 169},
            "final": {"EUR": 219, "USD": 235, "GBP": 185},
        },
    },
    "Industry": {
        "Exhibitor": {
            "earlyBird": {"EUR": 299, "USD": 325, "GBP": 259},
            "standard": {"EUR": 349, "USD": 375, "GBP": 299},
            "final": {"EUR": 399, "USD": 425, "GBP": 339},
        },
        "Speaker": {
            "earlyBird": {"EUR": 199, "USD": 215, "GBP": 169},
            "standard": {"EUR": 229, "USD": 245, "GBP": 195},
            "final": {"EUR": 259, "USD": 279, "GBP": 219},
        },
        "Delegate": {
            "earlyBird": {"EUR": 129, "USD": 139, "GBP": 109},
            "standard": {"EUR": 149, "USD": 159, "GBP": 125},
            "final": {"EUR": 169, "USD": 179, "GBP": 139},
        },
    },
    "Student": {
        "Speaker": {
            "earlyBird": {"EUR": 69, "USD": 75, "GBP": 59},
            "standard": {"EUR": 79, "USD": 85, "GBP": 69},
            "final": {"EUR": 89, "USD": 95, "GBP": 75},
        },
        "Delegate": {
            "earlyBird": {"EUR": 39, "USD": 45, "GBP": 35},
            "standard": {"EUR": 49, "USD": 55, "GBP": 45},
            "final": {"EUR": 59, "USD": 65, "GBP": 49},
        },
    },
    "Add-on": {
        "e-Poster": {
            "earlyBird": {"EUR": 49, "USD": 55, "GBP": 45},
            "standard": {"EUR": 59, "USD": 65, "GBP": 49},
            "final": {"EUR": 69, "USD": 75, "GBP": 59},
        },
        "Video Presentation": {
            "earlyBird": {"EUR": 59, "USD": 65, "GBP": 49},
            "standard": {"EUR": 69, "USD": 75, "GBP": 59},
            "final": {"EUR": 79, "USD": 85, "GBP": 69},
        },
    },
}


# =========================================================
# REQUEST MODELS
# =========================================================

class CreateOrderRequest(BaseModel):
    registrationId: str = Field(min_length=1, max_length=200)


class CaptureOrderRequest(BaseModel):
    registrationId: str = Field(min_length=1, max_length=200)
    orderId: str = Field(min_length=1, max_length=200)


# =========================================================
# HELPERS
# =========================================================

def get_registration(registration_id: str):
    if not registration_id.strip():
        raise HTTPException(
            status_code=400,
            detail="Registration ID is required.",
        )

    ref = db.collection("registrations").document(registration_id)
    snapshot = ref.get()

    if not snapshot.exists:
        raise HTTPException(
            status_code=404,
            detail="Registration was not found.",
        )

    return ref, snapshot.to_dict()


def normalize_period(value):
    """Accept common display labels and internal period keys."""
    if not isinstance(value, str):
        return None

    cleaned = value.strip().lower().replace("_", "").replace("-", "")
    cleaned = cleaned.replace(" ", "")

    
    aliases = {
        "earlybird": "earlyBird",
        "earlybirdregistration": "earlyBird",
        "standard": "standard",
        "standardregistration": "standard",
        "final": "final",
        "finalregistration": "final",
    }

    return aliases.get(cleaned)



def get_server_price(registration):
    """
    Determine the price using backend configuration.
    Do not trust originalAmount, finalAmount, or discountAmount
    received from the frontend.
    """
    category = registration.get("registrationCategory")
    option = registration.get("participationOption")
    currency = registration.get("currency")
    period = normalize_period(registration.get("registrationPeriod"))

    if not isinstance(category, str) or not isinstance(option, str):
        raise HTTPException(
            status_code=400,
            detail="Registration category or option is missing.",
        )

    if not isinstance(currency, str):
        raise HTTPException(
            status_code=400,
            detail="Registration currency is missing.",
        )

    currency = currency.strip().upper()

    try:
        amount = TICKET_PRICES[category][option][period][currency]
    except (KeyError, TypeError):
        raise HTTPException(
            status_code=400,
            detail=(
                "The selected ticket category, option, period, "
                "or currency is invalid."
            ),
        )

    return amount, currency



def get_server_pricing(registration):
    """
    Calculate the original ticket price and the valid
    admin-assigned discount on the backend.

    Never trust discount or final amount values sent by
    the frontend.
    """
    original_amount, currency = get_server_price(registration)

    discount_type = registration.get("adminDiscountType")
    discount_status = registration.get("adminDiscountStatus")
    raw_discount_value = registration.get("adminDiscountValue")
    discount_currency = registration.get("adminDiscountCurrency")

    discount_value = 0.0
    discount_amount = 0.0
    applied_discount_type = None

    # No active admin discount: charge the original price.
    if discount_status != "active":
        return {
            "original_amount": float(original_amount),
            "currency": currency,
            "discount_type": None,
            "discount_value": 0.0,
            "discount_amount": 0.0,
            "final_amount": float(original_amount),
        }

    # An active discount must have valid configuration.
    if discount_type not in {"percent", "fixed"}:
        raise HTTPException(
            status_code=409,
            detail="The assigned discount type is invalid.",
        )

    if isinstance(raw_discount_value, bool):
        raise HTTPException(
            status_code=409,
            detail="The assigned discount value is invalid.",
        )

    try:
        discount_value = float(raw_discount_value)
    except (TypeError, ValueError):
        raise HTTPException(
            status_code=409,
            detail="The assigned discount value is invalid.",
        )

    if not math.isfinite(discount_value) or discount_value <= 0:
        raise HTTPException(
            status_code=409,
            detail="The assigned discount value is invalid.",
        )

    if discount_type == "percent":
        if discount_value > 100:
            raise HTTPException(
                status_code=409,
                detail="The percentage discount cannot exceed 100%.",
            )

        discount_amount = (
            float(original_amount) * discount_value / 100
        )
        applied_discount_type = "percent"

    elif discount_type == "fixed":
        if discount_currency not in {"EUR", "USD", "GBP"}:
            raise HTTPException(
                status_code=409,
                detail="The fixed discount currency is invalid.",
            )

        # Match the frontend: a fixed discount applies only
        # when its currency matches the selected registration currency.
        if discount_currency == currency:
            discount_amount = min(
                float(original_amount),
                discount_value,
            )
            applied_discount_type = "fixed"
        else:
            # Currency mismatch: do not apply the fixed discount.
            discount_amount = 0.0
            applied_discount_type = None
            discount_value = 0.0

    final_amount = max(
        0.0,
        float(original_amount) - discount_amount,
    )

    return {
        "original_amount": float(original_amount),
        "currency": currency,
        "discount_type": applied_discount_type,
        "discount_value": discount_value,
        "discount_amount": discount_amount,
        "final_amount": final_amount,
    }

def paypal_access_token():
    if not PAYPAL_CLIENT_ID or not PAYPAL_CLIENT_SECRET:
        raise HTTPException(
            status_code=503,
            detail="PayPal is not configured on the backend.",
        )

    try:
        response = requests.post(
            f"{PAYPAL_BASE_URL}/v1/oauth2/token",
            auth=(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET),
            headers={
                "Accept": "application/json",
                "Accept-Language": "en_US",
            },
            data={"grant_type": "client_credentials"},
            timeout=PAYPAL_TIMEOUT,
        )
    except requests.RequestException:
        raise HTTPException(
            status_code=502,
            detail="Could not connect to PayPal.",
        )

    if not response.ok:
        # Do not expose credentials or raw provider responses.
        raise HTTPException(
            status_code=502,
            detail="PayPal authentication failed. Check backend configuration.",
        )

    try:
        token = response.json().get("access_token")
    except ValueError:
        token = None

    if not token:
        raise HTTPException(
            status_code=502,
            detail="PayPal did not return an access token.",
        )

    return token


def paypal_request(method, endpoint, token, payload=None, request_id=None):
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    if request_id:
        headers["PayPal-Request-Id"] = request_id

    try:
        response = requests.request(
            method=method,
            url=f"{PAYPAL_BASE_URL}{endpoint}",
            headers=headers,
            json=payload,
            timeout=PAYPAL_TIMEOUT,
        )
    except requests.RequestException:
        raise HTTPException(
            status_code=502,
            detail="Could not communicate with PayPal.",
        )

    if not response.ok:
        raise HTTPException(
            status_code=502,
            detail="PayPal could not complete the requested operation.",
        )

    try:
        return response.json()
    except ValueError:
        raise HTTPException(
            status_code=502,
            detail="PayPal returned an invalid response.",
        )


def money_string(amount):
    return f"{amount:.2f}"


# =========================================================
# BASIC ENDPOINTS
# =========================================================

@app.get("/")
def home():
    return {
        "status": "success",
        "message": "Wavexa Python backend is running",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


# =========================================================
# ABSTRACT UPLOAD
# =========================================================

@app.post("/upload-abstract")
async def upload_abstract(file: UploadFile = File(...)):
    original_name = Path(file.filename or "").name
    extension = Path(original_name).suffix.lower()

    if not original_name or extension not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, DOC and DOCX files are allowed.",
        )

    content = await file.read(MAX_FILE_SIZE + 1)

    if not content:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty.",
        )

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File size must not exceed 5 MB.",
        )

    object_name = (
        f"abstract-submissions/{uuid.uuid4().hex}{extension}"
    )

    try:
        blob = bucket.blob(object_name)

        blob.upload_from_string(
            content,
            content_type=ALLOWED_TYPES[extension],
        )

        download_token = uuid.uuid4().hex

        blob.metadata = {
            "firebaseStorageDownloadTokens": download_token,
        }
        blob.patch()

        file_url = (
            "https://firebasestorage.googleapis.com/v0/b/"
            f"{bucket.name}/o/{quote(object_name, safe='')}"
            f"?alt=media&token={download_token}"
        )

        return {
            "status": "success",
            "message": "Abstract file uploaded successfully.",
            "fileName": original_name,
            "storagePath": object_name,
            "fileUrl": file_url,
            "size": len(content),
        }

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=500,
            detail=(
                "File upload failed. Check backend logs "
                "and Firebase Storage configuration."
            ),
        )
    finally:
        await file.close()


# =========================================================
# CREATE PAYPAL ORDER
# =========================================================

@app.post("/create-paypal-order")
def create_paypal_order(request: CreateOrderRequest):
    registration_ref, registration = get_registration(
        request.registrationId
    )

    if registration.get("registrationStatus") != "submitted":
        raise HTTPException(
            status_code=400,
            detail="Registration has not been submitted.",
        )

    if registration.get("termsAccepted") is not True:
        raise HTTPException(
            status_code=400,
            detail="Registration terms must be accepted.",
        )

    if registration.get("paymentStatus") == "paid":
        raise HTTPException(
            status_code=409,
            detail="This registration has already been paid.",
        )

    
    pricing = get_server_pricing(registration)

    currency = pricing["currency"]
    final_amount = pricing["final_amount"]


    token = paypal_access_token()

    
    order = paypal_request(
        "POST",
        "/v2/checkout/orders",
        token,
        payload={
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "reference_id": request.registrationId,
                    "custom_id": request.registrationId,
                    "description": "Wavexa Conference Registration",
                    "amount": {
                        "currency_code": currency,
                        "value": money_string(final_amount),
                    },
                }
            ],
        },
        request_id=str(uuid.uuid4()),
    )

    order_id = order.get("id")

    print("PAYPAL ORDER STATUS:", order.get("status"))
    print(
        "PAYPAL ORDER LINKS:",
        [
            {"rel": link.get("rel"), "method": link.get("method")}
            for link in order.get("links", [])
        ],
    )

    if not order_id:
        raise HTTPException(
            status_code=502,
            detail="PayPal did not return an order ID.",
        )

   

    # Save the server-calculated amount and the PayPal order ID.
    
    # Save the server-calculated final amount and discount audit details.
    registration_ref.update(
        {
            "paymentStatus": "pending",
            "paypalOrderId": order_id,
            "paypalMode": PAYPAL_MODE,
            "paypalAmount": money_string(final_amount),
            "paypalCurrency": currency,
            "paypalOriginalAmount": money_string(
                pricing["original_amount"]
            ),
            "paypalDiscountType": pricing["discount_type"],
            "paypalDiscountValue": pricing["discount_value"],
            "paypalDiscountAmount": money_string(
                pricing["discount_amount"]
            ),
            "paypalOrderCreatedAt": firestore.SERVER_TIMESTAMP,
        }
    )


    return {
        "status": "success",
        "orderID": order_id,
        "amount": money_string(final_amount),
        "currency": currency,
        "mode": PAYPAL_MODE,
    }


# =========================================================
# CAPTURE PAYPAL ORDER
# =========================================================

@app.post("/capture-paypal-order")
def capture_paypal_order(request: CaptureOrderRequest):
    registration_ref, registration = get_registration(
        request.registrationId
    )

    if registration.get("paymentStatus") == "paid":
        if registration.get("paypalOrderId") == request.orderId:
            return {
                "status": "paid",
                "message": "Payment has already been confirmed.",
            }

        raise HTTPException(
            status_code=409,
            detail="This registration has already been paid.",
        )

    saved_order_id = registration.get("paypalOrderId")

    if not saved_order_id or saved_order_id != request.orderId:
        raise HTTPException(
            status_code=400,
            detail="PayPal order does not match this registration.",
        )

    
    # Recalculate pricing from the trusted registration record.
    pricing = get_server_pricing(registration)

    currency = pricing["currency"]
    expected_amount = money_string(pricing["final_amount"])


    if registration.get("paypalAmount") != expected_amount:
        raise HTTPException(
            status_code=409,
            detail="The saved payment amount does not match the ticket price.",
        )

    if registration.get("paypalCurrency") != currency:
        raise HTTPException(
            status_code=409,
            detail="The saved payment currency does not match the ticket.",
        )

    if registration.get("paypalMode") != PAYPAL_MODE:
        raise HTTPException(
            status_code=409,
            detail="PayPal mode mismatch. Check Sandbox/Live configuration.",
        )

    token = paypal_access_token()

    capture_result = paypal_request(
        "POST",
        f"/v2/checkout/orders/{request.orderId}/capture",
        token,
        payload={},
        request_id=f"capture-{request.orderId}",
    )

    if capture_result.get("status") != "COMPLETED":
        raise HTTPException(
            status_code=402,
            detail="PayPal has not completed this payment.",
        )

    purchase_units = capture_result.get("purchase_units") or []
    captures = []

    for unit in purchase_units:
        payments = unit.get("payments") or {}
        captures.extend(payments.get("captures") or [])

    matching_capture = None

    for capture in captures:
        capture_amount = capture.get("amount") or {}

        if (
            capture.get("status") == "COMPLETED"
            and capture_amount.get("currency_code") == currency
            and capture_amount.get("value") == expected_amount
        ):
            matching_capture = capture
            break

    if not matching_capture:
        raise HTTPException(
            status_code=402,
            detail=(
                "A completed PayPal capture with the expected "
                "amount and currency could not be verified."
            ),
        )

    payer = capture_result.get("payer") or {}

    registration_ref.update(
        {
            "paymentStatus": "paid",
            "registrationStatus": "confirmed",
            "paypalCaptureId": matching_capture.get("id"),
            "paypalCaptureStatus": matching_capture.get("status"),
            "paypalPayerId": payer.get("payer_id"),
            "paidAmount": expected_amount,
            "paidCurrency": currency,
            "paidAt": firestore.SERVER_TIMESTAMP,
        }
    )

    return {
        "status": "paid",
        "message": "PayPal payment completed successfully.",
        "registrationId": request.registrationId,
        "amount": expected_amount,
        "currency": currency,
    }
