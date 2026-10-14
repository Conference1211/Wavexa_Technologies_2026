import * as React from "react";

import { Helmet } from "@/components/Seo";
import { motion } from "framer-motion";

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

import {
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronDown,
  CreditCard,
  FileCheck2,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Building2,
  Percent,
} from "lucide-react";

import { PageHero } from "@/components/sections/Hero";

import {
  Section,
  Heading,
  Reveal,
  Button,
} from "@/components/ui-kit";
import { FaqAccordion } from "@/components/forms";
import { useConference } from "@/context/ConferenceContext";
import { conferencePath } from "@/data/conferences";
import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

type Currency = "EUR" | "USD" | "GBP";

type RegistrationPeriod =
  | "earlyBird"
  | "standard"
  | "final";

type FormErrors = Record<string, string>;

/* =========================================================
   COUNTRIES
========================================================= */

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Australia",
  "Canada",
  "Germany",
  "France",
  "Switzerland",
  "Singapore",
  "Malaysia",
  "Saudi Arabia",
  "South Africa",
  "Japan",
  "China",
  "Other",
];

/* =========================================================
   SHARED STYLE TOKENS
========================================================= */

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/10";
const labelCls =
  "mb-1.5 block text-xs font-semibold text-foreground";

const errorCls =
  "border-red-500 focus:border-red-500 focus:ring-red-500/10";

const brandGradientCls =
  "[background-image:var(--gradient-brand)]";

const sectionEyebrowCls =
  "text-xs font-semibold uppercase tracking-[0.18em] text-primary";

/* =========================================================
   VALIDATION REGEX
========================================================= */

const nameRegex = /^[A-Za-zÀ-ÿ]+(?:[\s'-][A-Za-zÀ-ÿ]+)*$/;
const phoneRegex = /^\+?[1-9]\d{6,14}$/;

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

const institutionRegex = /^[A-Za-zÀ-ÿ0-9\s&.,'()/-]{2,100}$/;
const addressRegex = /^[A-Za-zÀ-ÿ0-9\s.,#'()/-]{5,250}$/;

/* =========================================================
   HELPERS
========================================================= */

const cleanValue = (value: FormDataEntryValue | null): string =>
  typeof value === "string" ? value.trim() : "";

const getField = (formData: FormData, name: string): string =>
  cleanValue(formData.get(name));

const currencySymbols: Record<Currency, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

const periodLabels: Record<RegistrationPeriod, string> = {
  earlyBird: "Early Bird Registration",
  standard: "Standard Registration",
  final: "Final Registration",
};

const isPeriodAvailable = (
  period: RegistrationPeriod,
  deadlines: Record<RegistrationPeriod, string>
): boolean => {
  const deadline = new Date(deadlines[period]);

  if (Number.isNaN(deadline.getTime())) {
    return false;
  }

  deadline.setHours(23, 59, 59, 999);

  return new Date() <= deadline;
};

/* =========================================================
   STATIC CONTENT — SIDEBAR
========================================================= */

const eligibilityItems = [
  {
    title: "Presenting Author Registration",
    description:
      "Required for accepted oral, panel, and poster presenters. Registration confirms program inclusion.",
  },
  {
    title: "Professional Delegate Registration",
    description:
      "For clinicians, researchers, faculty, public health professionals, and policy leaders seeking full congress access.",
  },
  {
    title: "Emerging Scholar Registration",
    description:
      "For doctoral candidates and early-career professionals (≤5 years post-degree). Verification may be requested.",
  },
  {
    title: "Institutional Group Registration",
    description:
      "For institutions registering five (5) or more participants under a consolidated participation structure.",
  },
];

const registrationIncludes = [
  "Access to the conference scientific sessions",
  "Conference participation certificate",
  "Access to conference materials",
  "Scientific presentations and discussions",
  "Networking opportunities",
  "Digital conference resources",
];

const registrationPolicies = [
  "All registrations are non-transferable unless formally approved by the Secretariat.",
  "Program inclusion for presenters requires completed registration.",
  "Access credentials will be issued electronically prior to the congress.",
  "Institutional packages are subject to confirmation.",
];

/* =========================================================
   COMPONENT
========================================================= */

export default function Registration() {
  const conference = useConference();
  const { faqs: FAQS, tickets: TICKETS, registrationDeadlines: REGISTRATION_DEADLINES } = conference;

  /* =======================================================
     STEP STATE & IDENTIFIERS
  ======================================================= */
  const [step, setStep] = React.useState<1 | 2>(1);
  const [participantId, setParticipantId] = React.useState<string | null>(null);
  const [registrationId, setRegistrationId] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  /* =======================================================
     CURRENCY
  ======================================================= */
  const [currency, setCurrency] = React.useState<Currency>("EUR");
  const currencySymbol = currencySymbols[currency];

  /* =======================================================
     REGISTRATION SELECTION
  ======================================================= */
  const getDefaultPeriod = (): RegistrationPeriod => {
    if (isPeriodAvailable("earlyBird", REGISTRATION_DEADLINES)) return "earlyBird";
    if (isPeriodAvailable("standard", REGISTRATION_DEADLINES)) return "standard";
    return "final";
  };

  const [selectedPeriod, setSelectedPeriod] =
    React.useState<RegistrationPeriod>(getDefaultPeriod);

  const [selectedCategory, setSelectedCategory] =
    React.useState("");

  const [selectedOptionName, setSelectedOptionName] =
    React.useState("");

  /* =======================================================
     FORM STATE (Persisted across steps)
  ======================================================= */
  const [formValues, setFormValues] = React.useState({
    title: "",
    designation: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    institution: "",
    country: "",
    city: "",
    address: "",
    billingName: "",
    billingEmail: "",
    billingPhone: "",
    billingCountry: "",
    billingAddress: "",
  });

  const [confirmed, setConfirmed] = React.useState(false);
  const [agreed, setAgreed] = React.useState(false);
  const [sameBilling, setSameBilling] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});

  /* =======================================================
     REAL-TIME FIELD INPUT & CAPITALIZATION HANDLER
  ======================================================= */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const formattedValue = ["designation", "firstName", "lastName", "city", "billingName"].includes(name)
      ? value.replace(/(^|\s)\S/g, (l) => l.toUpperCase())
      : value;

    setFormValues((prev) => ({ ...prev, [name]: formattedValue }));

    setErrors((prevErrors) => {
      const nextErrors = { ...prevErrors };
      const trimmedVal = formattedValue.trim();

      if (name === "title") {
        if (trimmedVal) delete nextErrors.title;
      } else if (name === "designation") {
        if (!trimmedVal) nextErrors.designation = "Designation is required.";
        else if (!nameRegex.test(trimmedVal)) nextErrors.designation = "Designation must contain valid characters only.";
        else delete nextErrors.designation;
      } else if (name === "firstName") {
        if (!trimmedVal) nextErrors.firstName = "First name is required.";
        else if (!nameRegex.test(trimmedVal)) nextErrors.firstName = "First name must contain valid characters only.";
        else if (trimmedVal.length < 2) nextErrors.firstName = "First name must contain at least 2 characters.";
        else delete nextErrors.firstName;
      } else if (name === "lastName") {
        if (!trimmedVal) nextErrors.lastName = "Last name is required.";
        else if (!nameRegex.test(trimmedVal)) nextErrors.lastName = "Last name must contain valid characters only.";
        else if (trimmedVal.length < 2) nextErrors.lastName = "Last name must contain at least 2 characters.";
        else delete nextErrors.lastName;
      } else if (name === "email") {
        if (!trimmedVal) nextErrors.email = "Email address is required.";
        else if (!emailRegex.test(trimmedVal)) nextErrors.email = "Please enter a valid email address.";
        else delete nextErrors.email;
      } else if (name === "institution") {
        if (!trimmedVal) nextErrors.institution = "Institution / Organization is required.";
        else if (!institutionRegex.test(trimmedVal)) nextErrors.institution = "Please enter a valid institution name.";
        else delete nextErrors.institution;
      } else if (name === "country") {
        if (trimmedVal) delete nextErrors.country;
      } else if (name === "city") {
        if (!trimmedVal) nextErrors.city = "City is required.";
        else if (!nameRegex.test(trimmedVal)) nextErrors.city = "City must contain valid characters only.";
        else delete nextErrors.city;
      } else if (name === "address") {
        if (!trimmedVal) nextErrors.address = "Address is required.";
        else if (!addressRegex.test(trimmedVal)) nextErrors.address = "Please enter a valid address.";
        else delete nextErrors.address;
      } else if (name === "billingName") {
        if (!trimmedVal) nextErrors.billingName = "Billing name is required.";
        else if (!nameRegex.test(trimmedVal)) nextErrors.billingName = "Billing name must contain valid characters only.";
        else delete nextErrors.billingName;
      } else if (name === "billingEmail") {
        if (!trimmedVal) nextErrors.billingEmail = "Billing email is required.";
        else if (!emailRegex.test(trimmedVal)) nextErrors.billingEmail = "Please enter a valid billing email.";
        else delete nextErrors.billingEmail;
      } else if (name === "billingCountry") {
        if (trimmedVal) delete nextErrors.billingCountry;
      } else if (name === "billingAddress") {
        if (!trimmedVal) nextErrors.billingAddress = "Billing address is required.";
        else if (!addressRegex.test(trimmedVal)) nextErrors.billingAddress = "Please enter a valid billing address.";
        else delete nextErrors.billingAddress;
      }

      return nextErrors;
    });
  };

  /* =======================================================
     ADMIN-ASSIGNED PARTICIPANT DISCOUNT STATE
  ======================================================= */
  const [adminDiscount, setAdminDiscount] = React.useState<any | null>(null);
  const [isDiscountLoading, setIsDiscountLoading] = React.useState(false);

  React.useEffect(() => {
    if (!participantId || step !== 2) {
      setAdminDiscount(null);
      setIsDiscountLoading(false);
      return;
    }

    setIsDiscountLoading(true);
    const discountRef = doc(db, "participantDiscounts", participantId);
    const unsubscribe = onSnapshot(
      discountRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const isValidStatus = data.status === "active";
          const isValidType = data.discountType === "percent" || data.discountType === "fixed";
          const val = Number(data.discountValue);
          const isValidValue = Number.isFinite(val) && val > 0;

          if (isValidStatus && isValidType && isValidValue) {
            if (data.discountType === "percent" && val > 100) {
              setAdminDiscount(null);
            } else {
              setAdminDiscount({ id: docSnap.id, ...data, discountValue: val });
            }
          } else {
            setAdminDiscount(null);
          }
        } else {
          setAdminDiscount(null);
        }
        setIsDiscountLoading(false);
      },
      (error) => {
        console.error("Error fetching participant discount:", error);
        setAdminDiscount(null);
        setIsDiscountLoading(false);
      }
    );

    return () => unsubscribe();
  }, [participantId, step]);

  const ErrorMessage = ({ name }: { name: string }) => {
    const message = errors[name];
    if (!message) return null;
    return <p className="mt-1.5 text-xs font-medium text-red-500">{message}</p>;
  };

  /* =======================================================
     DERIVED PRICING & ADMIN DISCOUNT CALCULATIONS
  ======================================================= */
  const currentCategory = TICKETS.find(
    (cat) => cat.category === selectedCategory
  );

  const currentOption = currentCategory?.options.find(
    (opt) => opt.name === selectedOptionName
  );

  const basePrice = currentOption
    ? currentOption.prices[selectedPeriod][currency]
    : undefined;

  let discountPercent = 0;
  let discountAmount = 0;
  let discountType: string | null = null;
  let discountValue = 0;
  let discountAssignedId: string | null = null;
  let currencyMismatch = false;

  if (adminDiscount && basePrice !== undefined) {
    if (adminDiscount.discountType === "percent") {
      discountType = "percent";
      discountValue = adminDiscount.discountValue;
      discountPercent = discountValue;
      discountAmount = (basePrice * discountPercent) / 100;
      discountAssignedId = adminDiscount.id;
    } else if (adminDiscount.discountType === "fixed") {
      if (!adminDiscount.currency || adminDiscount.currency === currency) {
        discountType = "fixed";
        discountValue = adminDiscount.discountValue;
        discountAmount = Math.min(basePrice, discountValue);
        discountAssignedId = adminDiscount.id;
      } else {
        currencyMismatch = true;
      }
    }
  }

  const finalAmount = basePrice !== undefined ? Math.max(0, basePrice - discountAmount) : undefined;

  const formattedBasePrice = basePrice !== undefined ? `${currencySymbol}${basePrice.toFixed(2)}` : null;
  const formattedDiscountAmount = discountAmount > 0 ? `${currencySymbol}${discountAmount.toFixed(2)}` : null;
  const formattedFinalAmount = finalAmount !== undefined ? `${currencySymbol}${finalAmount.toFixed(2)}` : null;

  const discCurrency = adminDiscount?.currency;
  const discSymbol = (discCurrency && ["EUR", "USD", "GBP"].includes(discCurrency))
    ? currencySymbols[discCurrency as Currency]
    : currencySymbol;

  const selectedPeriodLabel = periodLabels[selectedPeriod];

  /* =======================================================
     SCROLL TO FORM
  ======================================================= */
  const scrollToForm = () => {
    setTimeout(() => {
      document
        .getElementById("registration-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const clearRegistrationErrors = () => {
    setErrors((previous) => {
      const next = { ...previous };
      delete next.registrationCategory;
      delete next.registrationOption;
      return next;
    });
  };

  /* =======================================================
     CATEGORY & OPTION CHANGE HANDLERS
  ======================================================= */
  const handleCategoryChange = (categoryName: string) => {
    const category = TICKETS.find((item) => item.category === categoryName);
    if (!category) {
      setSelectedCategory("");
      setSelectedOptionName("");
      return;
    }
    setSelectedCategory(category.category);
    setSelectedOptionName("");
    setConfirmed(false);
    clearRegistrationErrors();
  };

  const handleOptionChange = (optionName: string) => {
    const option = currentCategory?.options.find((item) => item.name === optionName);
    if (!option) return;
    setSelectedOptionName(option.name);
    setConfirmed(false);
    setErrors((previous) => {
      const next = { ...previous };
      delete next.registrationOption;
      return next;
    });
  };

  const handlePeriodChange = (period: RegistrationPeriod) => {
    if (!isPeriodAvailable(period, REGISTRATION_DEADLINES)) return;
    setSelectedPeriod(period);
    setConfirmed(false);
  };

  const handlePricingOptionSelect = (
    category: string,
    optionName: string,
    period: RegistrationPeriod
  ) => {
    if (!isPeriodAvailable(period, REGISTRATION_DEADLINES)) return;
    setSelectedCategory(category);
    setSelectedOptionName(optionName);
    setSelectedPeriod(period);
    setConfirmed(false);
    clearRegistrationErrors();
    scrollToForm();
  };

  /* =======================================================
     VALIDATION HELPERS
  ======================================================= */
  const validateStep1 = (form: HTMLFormElement): FormErrors => {
    const formData = new FormData(form);
    const newErrors: FormErrors = {};

    const title = getField(formData, "title");
    const designation = getField(formData, "designation");
    const firstName = getField(formData, "firstName");
    const lastName = getField(formData, "lastName");
    const email = getField(formData, "email");
    const phone = getField(formData, "phone");
    const institution = getField(formData, "institution");
    const country = getField(formData, "country");
    const city = getField(formData, "city");
    const address = getField(formData, "address");

    if (!title) newErrors.title = "Please select your title.";
    if (!designation) newErrors.designation = "Designation is required.";
    else if (!nameRegex.test(designation)) newErrors.designation = "Designation must contain valid characters only.";

    if (!firstName) newErrors.firstName = "First name is required.";
    else if (!nameRegex.test(firstName)) newErrors.firstName = "First name must contain valid characters only.";
    else if (firstName.length < 2) newErrors.firstName = "First name must contain at least 2 characters.";

    if (!lastName) newErrors.lastName = "Last name is required.";
    else if (!nameRegex.test(lastName)) newErrors.lastName = "Last name must contain valid characters only.";
    else if (lastName.length < 2) newErrors.lastName = "Last name must contain at least 2 characters.";

    if (!email) newErrors.email = "Email address is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address.";

    if (!phone) newErrors.phone = "Phone number is required.";
    else if (!phoneRegex.test(phone)) newErrors.phone = "Enter a valid international phone number with 7–15 digits, including country code where applicable.";

    if (!institution) newErrors.institution = "Institution / Organization is required.";
    else if (!institutionRegex.test(institution)) newErrors.institution = "Please enter a valid institution name.";

    if (!country) newErrors.country = "Please select your country.";
    if (!city) newErrors.city = "City is required.";
    else if (!nameRegex.test(city)) newErrors.city = "City must contain valid characters only.";

    if (!address) newErrors.address = "Address is required.";
    else if (!addressRegex.test(address)) newErrors.address = "Please enter a valid address.";

    return newErrors;
  };

  const validateStep2 = (form: HTMLFormElement): FormErrors => {
    const formData = new FormData(form);
    const newErrors: FormErrors = {};

    if (!selectedCategory) newErrors.registrationCategory = "Please select a registration category.";
    if (!selectedOptionName) newErrors.registrationOption = "Please select a registration option.";

    if (!sameBilling) {
      const billingName = getField(formData, "billingName");
      const billingEmail = getField(formData, "billingEmail");
      const billingPhone = getField(formData, "billingPhone");
      const billingCountry = getField(formData, "billingCountry");
      const billingAddress = getField(formData, "billingAddress");

      if (!billingName) newErrors.billingName = "Billing name is required.";
      else if (!nameRegex.test(billingName)) newErrors.billingName = "Billing name must contain valid characters only.";

      if (!billingEmail) newErrors.billingEmail = "Billing email is required.";
      else if (!emailRegex.test(billingEmail)) newErrors.billingEmail = "Please enter a valid billing email.";

      if (!billingPhone) newErrors.billingPhone = "Billing phone is required.";
      else if (!phoneRegex.test(billingPhone)) newErrors.billingPhone = "Enter a valid international phone number with 7–15 digits.";

      if (!billingCountry) newErrors.billingCountry = "Please select billing country.";
      if (!billingAddress) newErrors.billingAddress = "Billing address is required.";
      else if (!addressRegex.test(billingAddress)) newErrors.billingAddress = "Please enter a valid billing address.";
    }

    if (!agreed) newErrors.terms = "Please accept the Terms & Conditions before continuing.";

    return newErrors;
  };

  /* =======================================================
     STEP 1 ACTION: ROBUST PARTICIPANT UPSERT & DRAFT CREATION
  ======================================================= */
  const handleSaveAndNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget.form;
    if (!form) return;

    setErrors({});
    const validationErrors = validateStep1(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      setTimeout(() => {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
        if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
          element.focus();
        }
      }, 50);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(form);
      const emailVal = getField(formData, "email").toLowerCase();
      const rawEmail = getField(formData, "email");
      const phoneVal = getField(formData, "phone");
      const firstNameVal = getField(formData, "firstName");
      const lastNameVal = getField(formData, "lastName");
      const fullNameVal = `${firstNameVal} ${lastNameVal}`.trim();

      const participantsRef = collection(db, "participants");
      
      let q = query(participantsRef, where("normalizedEmail", "==", emailVal));
      let querySnapshot = await getDocs(q);

      if (querySnapshot.empty && rawEmail) {
        const fallbackQuery = query(participantsRef, where("email", "==", rawEmail));
        querySnapshot = await getDocs(fallbackQuery);
      }

      let currentParticipantId = "";
      const participantPayload = {
        fullName: fullNameVal,
        firstName: firstNameVal,
        lastName: lastNameVal,
        title: getField(formData, "title"),
        designation: getField(formData, "designation"),
        email: rawEmail,
        normalizedEmail: emailVal,
        phone: phoneVal,
        institution: getField(formData, "institution"),
        country: getField(formData, "country"),
        city: getField(formData, "city"),
        address: getField(formData, "address"),
        updatedAt: serverTimestamp(),
      };

      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0];
        if (existingDoc) {
  currentParticipantId = existingDoc.id;
}
        await updateDoc(doc(db, "participants", currentParticipantId), participantPayload);
      } else {
        const newDocRef = await addDoc(participantsRef, {
          ...participantPayload,
          createdAt: serverTimestamp(),
        });
        currentParticipantId = newDocRef.id;
      }

      setParticipantId(currentParticipantId);

      const registrationsRef = collection(db, "registrations");
      const draftPayload = {
        participantId: currentParticipantId,
        conferenceId: conference.id,
        conferenceName: conference.name,
        title: getField(formData, "title"),
        designation: getField(formData, "designation"),
        firstName: firstNameVal,
        lastName: lastNameVal,
        email: rawEmail,
        phone: phoneVal,
        institution: getField(formData, "institution"),
        country: getField(formData, "country"),
        city: getField(formData, "city"),
        address: getField(formData, "address"),
        registrationStatus: "draft",
        updatedAt: serverTimestamp(),
      };

      if (!registrationId) {
        const regDocRef = await addDoc(registrationsRef, {
          ...draftPayload,
          createdAt: serverTimestamp(),
        });
        setRegistrationId(regDocRef.id);
      } else {
        await updateDoc(doc(db, "registrations", registrationId), draftPayload);
      }

      setStep(2);
      scrollToForm();
    } catch (error) {
      console.error("Error saving participant draft in Firestore:", error);
      alert("Unable to process participant information at this moment. Please verify your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     STEP 2 ACTION: FINAL SUBMISSION
  ======================================================= */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmed || isSubmitting || !participantId || !registrationId) return;

    const form = e.currentTarget;
    setErrors({});

    if (!isPeriodAvailable(selectedPeriod, REGISTRATION_DEADLINES)) {
      setErrors({
        registrationPeriod: `The ${periodLabels[selectedPeriod].toLowerCase()} deadline has passed. Please select an available registration period.`,
      });
      return;
    }

    const validationErrors = validateStep2(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      setTimeout(() => {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
        if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
          element.focus();
        }
      }, 50);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(form);

      const finalPayload = {
        participantId,
        conferenceId: conference.id,
        conferenceName: conference.name,
        participantName: `${formValues.firstName} ${formValues.lastName}`.trim(),
        participantEmail: formValues.email,

        sameBilling,
        billingName: sameBilling
          ? `${formValues.firstName} ${formValues.lastName}`.trim()
          : getField(formData, "billingName"),
        billingEmail: sameBilling
          ? formValues.email
          : getField(formData, "billingEmail"),
        billingPhone: sameBilling
          ? formValues.phone
          : getField(formData, "billingPhone"),
        billingCountry: sameBilling
          ? formValues.country
          : getField(formData, "billingCountry"),
        billingAddress: sameBilling
          ? formValues.address
          : getField(formData, "billingAddress"),

        registrationPeriod: selectedPeriod,
        registrationPeriodLabel: selectedPeriodLabel,
        registrationCategory: selectedCategory,
        participationOption: selectedOptionName,
        currency,
        originalAmount: basePrice ?? null,
        discountType: discountType,
        discountValue: discountValue,
        discountPercent: discountPercent,
        discountAmount: discountAmount,
        finalAmount: finalAmount ?? null,
        discountAssignedId: discountAssignedId,

        termsAccepted: agreed,
        registrationStatus: "submitted",
        paymentStatus: "pending",
        updatedAt: serverTimestamp(),
      };

      await updateDoc(
        doc(db, "registrations", registrationId),
        finalPayload
      );

      setConfirmed(true);
      scrollToForm();
    } catch (error) {
      console.error("Error finalizing registration:", error);
      alert("Unable to submit your registration right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     INPUT RESTRICTION & REAL-TIME PHONE VALIDATION HANDLERS
  ======================================================= */
  const handleNumbersOnly = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    const cleaned = value
      .replace(/[^\d+]/g, "")
      .replace(/(?!^)\+/g, "")
      .replace(/^(\+)?/, "$1")
      .slice(0, 16);

    setFormValues((prev) => ({
      ...prev,
      [name]: cleaned,
    }));

    setErrors((prevErrors) => {
      const nextErrors = { ...prevErrors };
      if (!cleaned) {
        nextErrors[name] = "Phone number is required.";
      } else if (!phoneRegex.test(cleaned)) {
        nextErrors[name] = "Enter a valid international phone number with 7–15 digits, including country code where applicable.";
      } else {
        delete nextErrors[name];
      }
      return nextErrors;
    });
  };

  const handleInstitutionInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    input.value = input.value.replace(/[^A-Za-zÀ-ÿ0-9\s&.,'()/-]/g, "");
  };

  /* =======================================================
     RENDER
  ======================================================= */
  return (
    <>
      <Helmet>
        <title>{`Registration & Passes — ${conference.name}`}</title>
        <meta
          name="description"
          content={`Register for ${conference.name}. Choose your participation category and complete your conference registration.`}
        />
        <meta property="og:title" content="Registration & Passes — Wavexa Conferences" />
        <meta property="og:description" content="Choose your conference registration category and complete your Wavexa Conferences registration." />
        <meta property="og:url" content={`/conferences/${conference.id}/registration`} />
        <link rel="canonical" href="/registration" />
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}
      <div className="relative overflow-visible">
        <PageHero
          eyebrow={`${conference.dates} • ${conference.venue}`}
          title={conference.name}
          body={`Secure your participation for ${conference.name} and connect with healthcare professionals, researchers, and experts from around the world.`}
        />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-2 bottom-[-35px] z-10 w-[130px] sm:right-6 sm:bottom-[-30px] sm:w-[190px] md:right-8 md:top-[68%] md:bottom-auto md:w-[280px] lg:right-[7%] lg:top-[55%] lg:bottom-auto lg:w-[500px] xl:right-[6%] xl:top-[55%] xl:w-[580px] -translate-y-1/2"
        />
      </div>

      {/* =====================================================
          REGISTRATION INTRO + CURRENCY + PRICING
      ===================================================== */}
      <Section className="pt-12 sm:pt-16">
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto max-w-5xl">
            <Heading
              eyebrow="Registration"
              title="Secure your participation"
              accent="in the summit"
              align="center"
            />
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
              Choose your registration category and period below, then complete your participant details to confirm your place at the summit.
            </p>
          </div>

          {/* CURRENCY SELECTOR */}
          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4 rounded-2xl border border-border/60 bg-card px-6 py-5 text-center shadow-sm">
            <p className="text-xl font-semibold text-foreground">Choose Your Currency</p>
            <p className="text-xs text-muted-foreground">Prices are displayed in your selected currency.</p>
            <div className="inline-flex items-center rounded-lg border border-border/60 bg-muted/30 p-1">
              {(["EUR", "USD", "GBP"] as Currency[]).map((code) => {
                const active = currency === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code)}
                    className={cn(
                      "flex min-w-[76px] items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-150",
                      active ? cn(brandGradientCls, "text-primary-foreground shadow-sm") : "text-muted-foreground hover:bg-background hover:text-foreground"
                    )}
                  >
                    <span className="font-numeric text-base font-bold">{currencySymbols[code]}</span>
                    <span>{code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COMPACT PRICING TABLE */}
          <div className="mt-10">
            <div className="mb-5 text-center">
              <h3 className="text-2xl font-bold tracking-[-0.035em] text-foreground sm:text-3xl">
                Registration Pricing
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Choose your participation category and registration period.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse">
                  <thead>
                    <tr className={cn(brandGradientCls, "text-primary-foreground")}>
                      <th className="w-[28%] px-4 py-3.5 text-left text-sm font-bold">Participation Category</th>
                      {([
                        ["earlyBird", "Early Bird Registration"],
                        ["standard", "Standard Registration"],
                        ["final", "Final Registration"],
                      ] as [RegistrationPeriod, string][]).map(([key, label]) => (
                        <th key={key} className="w-[24%] px-3 py-3.5 text-center text-sm font-bold">
                          <div>{label}</div>
                          <div className="mt-0.5 text-xs font-medium opacity-85">{REGISTRATION_DEADLINES[key]}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TICKETS.map((ticket) => (
                      <React.Fragment key={ticket.category}>
                        <tr className="border-b border-border/60 bg-muted/30">
                          <td colSpan={4} className="px-3 py-2 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                              <span className="font-serif text-xs font-bold uppercase tracking-wide text-foreground">{ticket.category}</span>
                              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            </div>
                          </td>
                        </tr>
                        {ticket.options.map((option) => {
                          const isSelected = selectedCategory === ticket.category && selectedOptionName === option.name;
                          return (
                            <tr key={option.name} className={cn("border-b border-border/60 transition-colors", isSelected ? "bg-primary/5" : "hover:bg-muted/20")}>
                              <td className="px-4 py-3 text-xs font-semibold text-foreground">
                                <div className="flex items-center gap-2.5">
                                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-muted-foreground shadow-xs">
                                    <ArrowRight className="h-3.5 w-3.5" />
                                  </div>
                                  
<div>
  <div className="font-semibold text-foreground text-sm">
    {option.name}
  </div>
</div>

                                </div>
                              </td>
                              {(["earlyBird", "standard", "final"] as RegistrationPeriod[]).map((period) => {
                                const price = option.prices[period][currency];
                                const available = isPeriodAvailable(period, REGISTRATION_DEADLINES);
                                const isCellSelected = isSelected && selectedPeriod === period;
                                return (
                                  
<td key={period} className="px-3 py-3 align-middle">
  <button
    type="button"
    disabled={!available}
    onClick={() =>
      handlePricingOptionSelect(ticket.category, option.name, period)
    }
    className={cn(
      "relative mx-auto flex w-[45%] flex-col items-center justify-center rounded-lg px-1 py-1 text-center transition-all duration-200",
      !available && "opacity-45 cursor-not-allowed",
      isCellSelected
        ? "border-2 border-primary bg-primary/10 shadow-sm"
        : "border border-border/60 bg-background hover:border-primary/50 hover:bg-muted/40"
    )}
  >
    <span className="flex min-h-[30px] w-full items-center justify-center text-center font-numeric text-xs font-bold text-blue-500 sm:text-sm">
      {currencySymbol}{price.toFixed(2)}
    </span>

    <span className="flex min-h-[10px] items-center justify-center text-xs font-medium text-muted-foreground">
      {isCellSelected ? (
        <Check className="h-3.5 w-3.5 text-primary" />
      ) : !available ? (
        <span className="text-[10px]">Closed</span>
      ) : null}
    </span>
  </button>
</td>

                                );
                              })}
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* =================================================
              MAIN TWO-STEP REGISTRATION CONTAINER
          ================================================= */}
          <div id="registration-form" className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12">
            
            {/* LEFT COLUMN — FORM */}
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
                
                {/* STEP INDICATOR HEADER */}
                {!confirmed && (
                  <div className="mb-8 flex items-center justify-between border-b border-border/60 pb-6">
                    <div>
                      <span className={sectionEyebrowCls}>Step {step} of 2</span>
                      <h3 className="text-xl font-bold text-foreground">
                        {step === 1 ? "Participant Details" : "Billing & Registration"}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={cn("h-2.5 w-8 rounded-full", step === 1 ? "bg-primary" : "bg-primary/30")} />
                      <div className={cn("h-2.5 w-8 rounded-full", step === 2 ? "bg-primary" : "bg-primary/30")} />
                    </div>
                  </div>
                )}

                {confirmed ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                      <Check className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Registration Successful!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Thank you for registering for {conference.name}. Your participant profile and registration record have been successfully saved.
                    </p>
                    <div className="mt-8">
                      <Button
                        type="button"
                        onClick={() => {
                          setConfirmed(false);
                          setStep(1);
                          setParticipantId(null);
                          setRegistrationId(null);
                        }}
                      >
                        Register Another Participant
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">

                    {/* =========================================
                        STEP 1: PARTICIPANT DETAILS
                    ========================================= */}
                    <div className={cn(step !== 1 && "hidden")}>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-12">
                          <div className="sm:col-span-4">
                            <label className={labelCls}>Title *</label>
                            <select
                              name="title"
                              value={formValues.title}
                              onChange={handleInputChange}
                              className={cn(inputCls, errors.title && errorCls)}
                            >
                              <option value="">Select Title</option>
                              <option value="Dr">Dr.</option>
                              <option value="Prof">Prof.</option>
                              <option value="Mr">Mr.</option>
                              <option value="Ms">Ms.</option>
                              <option value="Mrs">Mrs.</option>
                            </select>
                            <ErrorMessage name="title" />
                          </div>

                          <div className="sm:col-span-8">
                            <label className={labelCls}>Designation *</label>
                            <input
                              type="text"
                              name="designation"
                              value={formValues.designation}
                              onChange={handleInputChange}
                              placeholder="e.g. Senior Researcher"
                              className={cn(inputCls, errors.designation && errorCls)}
                            />
                            <ErrorMessage name="designation" />
                          </div>

                          <div className="sm:col-span-6">
                            <label className={labelCls}>First Name *</label>
                            <input
                              type="text"
                              name="firstName"
                              value={formValues.firstName}
                              onChange={handleInputChange}
                              placeholder="First name"
                              className={cn(inputCls, errors.firstName && errorCls)}
                            />
                            <ErrorMessage name="firstName" />
                          </div>

                          <div className="sm:col-span-6">
                            <label className={labelCls}>Last Name *</label>
                            <input
                              type="text"
                              name="lastName"
                              value={formValues.lastName}
                              onChange={handleInputChange}
                              placeholder="Last name"
                              className={cn(inputCls, errors.lastName && errorCls)}
                            />
                            <ErrorMessage name="lastName" />
                          </div>

                          <div className="sm:col-span-6">
                            <label className={labelCls}>Email Address *</label>
                            <input
                              type="email"
                              name="email"
                              value={formValues.email}
                              onChange={handleInputChange}
                              placeholder="name@institution.com"
                              className={cn(inputCls, errors.email && errorCls)}
                            />
                            <ErrorMessage name="email" />
                          </div>

                          <div className="sm:col-span-6">
                            <label className={labelCls}>Phone Number *</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formValues.phone}
                              onChange={handleNumbersOnly}
                              placeholder="Numbers only (7-15 digits)"
                              className={cn(inputCls, errors.phone && errorCls)}
                            />
                            <ErrorMessage name="phone" />
                          </div>

                          <div className="sm:col-span-12">
                            <label className={labelCls}>Institution / Organization *</label>
                            <input
                              type="text"
                              name="institution"
                              value={formValues.institution}
                              onChange={handleInputChange}
                              onInput={handleInstitutionInput}
                              placeholder="University or Company Name"
                              className={cn(inputCls, errors.institution && errorCls)}
                            />
                            <ErrorMessage name="institution" />
                          </div>

                          <div className="sm:col-span-6">
                            <label className={labelCls}>Country *</label>
                            <select
                              name="country"
                              value={formValues.country}
                              onChange={handleInputChange}
                              className={cn(inputCls, errors.country && errorCls)}
                            >
                              <option value="">Select Country</option>
                              {countries.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                            <ErrorMessage name="country" />
                          </div>

                          <div className="sm:col-span-6">
                            <label className={labelCls}>City *</label>
                            <input
                              type="text"
                              name="city"
                              value={formValues.city}
                              onChange={handleInputChange}
                              placeholder="City"
                              className={cn(inputCls, errors.city && errorCls)}
                            />
                            <ErrorMessage name="city" />
                          </div>

                          <div className="sm:col-span-12">
                            <label className={labelCls}>Address *</label>
                            <textarea
                              name="address"
                              rows={2}
                              value={formValues.address}
                              onChange={handleInputChange}
                              placeholder="Street address"
                              className={cn(inputCls, errors.address && errorCls)}
                            />
                            <ErrorMessage name="address" />
                          </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                          <Button
                            type="button"
                            onClick={handleSaveAndNext}
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2"
                          >
                            <span>{isSubmitting ? "Saving Profile..." : "Save & Next"}</span>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* =========================================
                        STEP 2: BILLING & REGISTRATION CONFIRMATION
                    ========================================= */}
                    <div className={cn(step !== 2 && "hidden")}>
                      <div className="space-y-8">
                        
                        {/* REGISTRATION SUMMARY & ADMIN DISCOUNT PRICING */}
                        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
                            Registration Summary & Pricing
                          </h4>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs mb-4">
                            <div>
                              <span className="text-muted-foreground block">Category</span>
                              <span className="font-semibold text-foreground text-sm">{selectedCategory || "Not Selected"}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block">Option</span>
                              <span className="font-semibold text-foreground text-sm">{selectedOptionName || "Not Selected"}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block">Period</span>
                              <span className="font-semibold text-foreground text-sm">{selectedPeriodLabel}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block">Original Price</span>
                              <span className="font-numeric font-bold text-foreground text-base">{formattedBasePrice || "Select option"}</span>
                            </div>
                          </div>

                          {isDiscountLoading ? (
                            <div className="mb-4 rounded-xl bg-card border border-border/60 p-3 text-xs text-muted-foreground animate-pulse">
                              Checking assigned participant discounts...
                            </div>
                          ) : currencyMismatch ? (
                            <div className="mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 text-xs text-amber-800 dark:text-amber-300">
                              Assigned fixed discount currency ({adminDiscount?.currency}) does not match selected currency ({currency}). Discount not applied.
                            </div>
                          ) : adminDiscount && discountAmount > 0 ? (
                            <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Percent className="h-4 w-4 text-emerald-600" />
                                <span>
                                  Special Discount Applied ({adminDiscount.discountType === "percent" ? `${adminDiscount.discountValue}% off` : `${discSymbol}${adminDiscount.discountValue} off`})
                                </span>
                              </div>
                              <span className="font-numeric font-bold">-{formattedDiscountAmount}</span>
                            </div>
                          ) : null}

                          <div className="border-t border-border/60 pt-3 flex items-center justify-between">
                            <span className="text-sm font-bold text-foreground">Final Payable Amount</span>
                            <span className="font-numeric font-bold text-primary text-xl">
                              {formattedFinalAmount || formattedBasePrice || "Please select option"}
                            </span>
                          </div>

                          {(errors.registrationCategory || errors.registrationOption) && (
                            <p className="mt-3 text-xs text-red-500 font-medium">
                              {errors.registrationCategory || errors.registrationOption}
                            </p>
                          )}
                        </div>

                        {/* BILLING INFORMATION */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-base font-bold text-foreground">Billing Information</h4>
                            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                              <input
                                type="checkbox"
                                checked={sameBilling}
                                onChange={(e) => setSameBilling(e.target.checked)}
                                className="rounded border-border text-primary focus:ring-primary/20"
                              />
                              <span>Same as participant information</span>
                            </label>
                          </div>

                          {!sameBilling && (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-12 pt-2">
                              <div className="sm:col-span-12">
                                <label className={labelCls}>Billing Name *</label>
                                <input
                                  type="text"
                                  name="billingName"
                                  value={formValues.billingName}
                                  onChange={handleInputChange}
                                  placeholder="Full Name / Company Name"
                                  className={cn(inputCls, errors.billingName && errorCls)}
                                />
                                <ErrorMessage name="billingName" />
                              </div>

                              <div className="sm:col-span-6">
                                <label className={labelCls}>Billing Email *</label>
                                <input
                                  type="email"
                                  name="billingEmail"
                                  value={formValues.billingEmail}
                                  onChange={handleInputChange}
                                  placeholder="billing@email.com"
                                  className={cn(inputCls, errors.billingEmail && errorCls)}
                                />
                                <ErrorMessage name="billingEmail" />
                              </div>

                              <div className="sm:col-span-6">
                                <label className={labelCls}>Billing Phone *</label>
                                <input
                                  type="tel"
                                  name="billingPhone"
                                  value={formValues.billingPhone}
                                  onChange={handleNumbersOnly}
                                  placeholder="Phone number"
                                  className={cn(inputCls, errors.billingPhone && errorCls)}
                                />
                                <ErrorMessage name="billingPhone" />
                              </div>

                              <div className="sm:col-span-6">
                                <label className={labelCls}>Billing Country *</label>
                                <select
                                  name="billingCountry"
                                  value={formValues.billingCountry}
                                  onChange={handleInputChange}
                                  className={cn(inputCls, errors.billingCountry && errorCls)}
                                >
                                  <option value="">Select Country</option>
                                  {countries.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                  ))}
                                </select>
                                <ErrorMessage name="billingCountry" />
                              </div>

                              <div className="sm:col-span-6">
                                <label className={labelCls}>Billing Address *</label>
                                <input
                                  type="text"
                                  name="billingAddress"
                                  value={formValues.billingAddress}
                                  onChange={handleInputChange}
                                  placeholder="Billing Address"
                                  className={cn(inputCls, errors.billingAddress && errorCls)}
                                />
                                <ErrorMessage name="billingAddress" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* TERMS AND CONDITIONS */}
                        <div className="pt-4 border-t border-border/60">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={agreed}
                              onChange={(e) => setAgreed(e.target.checked)}
                              className="mt-1 rounded border-border text-primary focus:ring-primary/20"
                            />
                            <span className="text-xs text-muted-foreground leading-relaxed">
                              I agree to the conference registration terms, participation policies, and code of conduct. I confirm that all provided information is accurate.
                            </span>
                          </label>
                          <ErrorMessage name="terms" />
                        </div>

                        {/* NAVIGATION BUTTONS */}
                        <div className="flex items-center justify-between pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setStep(1);
                              scrollToForm();
                            }}
                            className="inline-flex items-center gap-2"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back</span>
                          </Button>

                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2"
                          >
                            <span>{isSubmitting ? "Submitting..." : "Submit Registration"}</span>
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                  </form>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN — SIDEBAR */}
            <div className="lg:col-span-4 space-y-8">
              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Registration Includes</h4>
                <ul className="space-y-3">
                  {registrationIncludes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Eligibility & Passes</h4>
                <div className="space-y-4">
                  {eligibilityItems.map((item, index) => (
                    <div key={index} className="border-b border-border/40 pb-3 last:border-0 last:pb-0">
                      <h5 className="text-xs font-bold text-foreground mb-1">{item.title}</h5>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Policies & Guidelines</h4>
                <ul className="space-y-2.5">
                  {registrationPolicies.map((policy, index) => (
                    <li key={index} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                      <span>{policy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>
      </Section>

      {/* FAQS */}
      {FAQS && FAQS.length > 0 && (
        <Section className="bg-muted/30">
          <div className="mx-auto max-w-4xl">
            <Heading
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              accent="About Registration"
              align="center"
            />
            <div className="mt-10">
              <FaqAccordion items={FAQS} />
            </div>
          </div>
        </Section>
      )}
    </>
  );
}