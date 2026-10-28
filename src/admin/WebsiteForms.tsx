
import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  type DocumentData,
  type QuerySnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import "./Admin.css";
import "./WebsiteForms.css";

const COLLECTIONS = [
  "abstractSubmissions",
  "businessContactMessages",
  "contactMessages",
  "newsletterSubscriptions",
  "participants",
  "registrations",
] as const;

type CollectionName = (typeof COLLECTIONS)[number];
type DateFilterMode = "all" | "single" | "range";

type FormRecord = {
  id: string;
  createdAt?: unknown;
  fileUrl?: unknown;
  downloadUrl?: unknown;
  attachmentUrl?: unknown;
  fileName?: unknown;
  [key: string]: unknown;
};

const COLLECTION_INFO: Record<
  CollectionName,
  { title: string; description: string }
> = {
  abstractSubmissions: {
    title: "Abstract Submissions",
    description: "Submitted research abstracts and attached files.",
  },
  businessContactMessages: {
    title: "Business Contact",
    description: "Business enquiries submitted through the website.",
  },
  contactMessages: {
    title: "Contact Messages",
    description: "Messages sent through the contact form.",
  },
  newsletterSubscriptions: {
    title: "Newsletter Subscribers",
    description: "Email addresses subscribed to the newsletter.",
  },
  participants: {
    title: "Participants",
    description: "Participant profiles stored in Firebase.",
  },
  registrations: {
    title: "Registrations",
    description: "Conference registration records stored in Firebase.",
  },
};

const PREFERRED_COLUMNS: Record<CollectionName, string[]> = {
  abstractSubmissions: [
    "firstName",
    "lastName",
    "email",
    "track",
    "category",
    "status",
    "createdAt",
  ],
  businessContactMessages: [
    "name",
    "email",
    "phone",
    "source",
    "createdAt",
  ],
  contactMessages: [
    "name",
    "email",
    "phone",
    "countryCode",
    "createdAt",
  ],
  newsletterSubscriptions: [
    "email",
    "createdAt",
    "status",
  ],
  participants: [
    "firstName",
    "lastName",
    "email",
    "phone",
    "createdAt",
  ],
  registrations: [
    "participantId",
    "conferenceId",
    "status",
    "paymentStatus",
    "createdAt",
  ],
};

function isTimestamp(
  value: unknown
): value is { toDate: () => Date } {
  return (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate?: unknown }).toDate === "function"
  );
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (isTimestamp(value)) {
    return value.toDate().toLocaleString();
  }

  if (value instanceof Date) {
    return value.toLocaleString();
  }

  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return "[Object]";
    }
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
}


function getTime(value: unknown): number {
  if (isTimestamp(value)) {
    return value.toDate().getTime();
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "string" || typeof value === "number") {
    const time = new Date(value).getTime();
    return Number.isNaN(time) ? 0 : time;
  }

  return 0;
}


function humanizeLabel(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getFileUrl(record: FormRecord): string {
  for (const key of [
    "fileUrl",
    "downloadUrl",
    "attachmentUrl",
  ]) {
    const value = record[key];

    if (typeof value === "string" && value.trim() !== "") {
      return value;
    }
  }

  return "";
}

function getFileName(record: FormRecord): string {
  if (
    typeof record.fileName === "string" &&
    record.fileName.trim() !== ""
  ) {
    return record.fileName.trim();
  }

  const url = getFileUrl(record);

  if (!url) return "";

  try {
    const pathname = new URL(url).pathname;
    const lastPart = pathname.split("/").pop() || "";
    const decoded = decodeURIComponent(lastPart);

    return decoded.includes(".") ? decoded : "";
  } catch {
    return "";
  }
}


function getFileExtension(record: FormRecord): string {
  const fileName = getFileName(record);
  const match = fileName.match(/\.([a-z0-9]+)$/i);

  if (match?.[1]) {
    return match[1].toLowerCase();
  }

  const fileType = record.fileType;

  if (typeof fileType === "string") {
    const type = fileType.toLowerCase();

    if (type.includes("pdf")) return "pdf";
    if (type.includes("wordprocessingml")) return "docx";
    if (type.includes("msword")) return "doc";
  }

  return "";
}


function getDownloadLabel(record: FormRecord): string {
  const extension = getFileExtension(record);

  if (extension === "pdf") return "Download PDF";
  if (extension === "doc") return "Download DOC";
  if (extension === "docx") return "Download DOCX";

  return "Download File";
}

function getPersonName(record: FormRecord): string {
  const fullName = [record.firstName, record.lastName]
    .filter(
      (part): part is string =>
        typeof part === "string" && part.trim() !== ""
    )
    .join(" ");

  if (fullName) return fullName;

  if (typeof record.name === "string" && record.name.trim()) {
    return record.name;
  }

  return "Unnamed record";
}


function makeDate(dateString: string, endOfDay = false): number {
  const parts = dateString.split("-");

  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  if (
    parts.length !== 3 ||
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    year < 1 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return Number.NaN;
  }

  const date = endOfDay
    ? new Date(year, month - 1, day, 23, 59, 59, 999)
    : new Date(year, month - 1, day, 0, 0, 0, 0);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return Number.NaN;
  }

  return date.getTime();
}

function DownloadAttachment({
  record,
}: {
  record: FormRecord;
}) {
  const url = getFileUrl(record);

  if (!url) {
    return <span className="website-forms-muted">No attachment</span>;
  }

  const fileName = getFileName(record);

  return (
    <a
      className="website-forms-file-link"
      href={url}
      download={fileName || true}
      title={fileName || getDownloadLabel(record)}
    >
      {getDownloadLabel(record)} ↓
    </a>
  );
}

export default function WebsiteForms() {
  const [selected, setSelected] =
    useState<CollectionName>("abstractSubmissions");

  const [records, setRecords] = useState<FormRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [dateFilterMode, setDateFilterMode] =
    useState<DateFilterMode>("all");

  const [specificDate, setSpecificDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selectedRecord, setSelectedRecord] =
    useState<FormRecord | null>(null);
  const [discountType, setDiscountType] =
  useState<"percent" | "fixed">("percent");

const [discountValue, setDiscountValue] = useState("");
const [discountCurrency, setDiscountCurrency] = useState("EUR");
const [discountStatus, setDiscountStatus] =
  useState<"active" | "inactive">("active");

const [discountSaving, setDiscountSaving] = useState(false);
const [discountMessage, setDiscountMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    setRecords([]);
    setSearch("");
    setDateFilterMode("all");
    setSpecificDate("");
    setFromDate("");
    setToDate("");
    setSelectedRecord(null);

    const selectedCollection = collection(db, selected);

    const unsubscribe = onSnapshot(
      selectedCollection,
      (snapshot: QuerySnapshot<DocumentData>) => {
        
const loadedRecords: FormRecord[] = snapshot.docs
  .map((item): FormRecord => ({
    ...item.data(),
    id: item.id,
  }))
  .sort(
    (a: FormRecord, b: FormRecord) =>
      getTime(b.createdAt) - getTime(a.createdAt)
  );

setRecords(loadedRecords);
setLoading(false);

      },
      (firebaseError) => {
        console.error(
          `Error loading ${selected}:`,
          firebaseError.code,
          firebaseError.message
        );

        setError(
          firebaseError.code === "permission-denied"
            ? `Access denied for "${COLLECTION_INFO[selected].title}". Check your sign-in status and Firestore rules.`
            : `Could not load "${COLLECTION_INFO[selected].title}". ${firebaseError.message}`
        );

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [selected]);

  const filteredRecords = useMemo(() => {
    const term = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        !term ||
        Object.values(record).some((value) =>
          formatValue(value).toLowerCase().includes(term)
        );

      if (!matchesSearch) return false;

      if (dateFilterMode === "all") {
        return true;
      }

      const recordTime = getTime(record.createdAt);

      if (recordTime === 0) {
        return false;
      }

      if (dateFilterMode === "single") {
        if (!specificDate) return true;

        const start = makeDate(specificDate);
        const end = makeDate(specificDate, true);

        return recordTime >= start && recordTime <= end;
      }

      if (dateFilterMode === "range") {
        if (!fromDate && !toDate) return true;

        const start = fromDate
          ? makeDate(fromDate)
          : Number.NEGATIVE_INFINITY;

        const end = toDate
          ? makeDate(toDate, true)
          : Number.POSITIVE_INFINITY;

        return recordTime >= start && recordTime <= end;
      }

      return true;
    });
  }, [
    records,
    search,
    dateFilterMode,
    specificDate,
    fromDate,
    toDate,
  ]);

  const columns = useMemo(() => {
    const available = new Set(
      records.flatMap((record) => Object.keys(record))
    );

    const preferred = PREFERRED_COLUMNS[selected].filter(
      (column) => available.has(column)
    );

    if (preferred.length > 0) return preferred;

    return Array.from(available)
      .filter((column) => column !== "id")
      .slice(0, 5);
  }, [records, selected]);

  const collectionInfo = COLLECTION_INFO[selected];

  function clearDateFilter() {
    setDateFilterMode("all");
    setSpecificDate("");
    setFromDate("");
    setToDate("");
  }
  async function handleSaveDiscount() {
  if (selected !== "registrations" || !selectedRecord) {
    setDiscountMessage("Please select a registration first.");
    return;
  }

  const value = Number(discountValue);

  if (!Number.isFinite(value) || value <= 0) {
    setDiscountMessage("Enter a discount value greater than zero.");
    return;
  }

  if (discountType === "percent" && value > 100) {
    setDiscountMessage("Percentage discount cannot exceed 100%.");
    return;
  }

  if (
    discountType === "fixed" &&
    !["EUR", "USD", "GBP"].includes(discountCurrency)
  ) {
    setDiscountMessage("Select a valid currency.");
    return;
  }

  if (
    selectedRecord.paymentStatus === "paid" ||
    selectedRecord.registrationStatus === "confirmed"
  ) {
    setDiscountMessage(
      "Discount cannot be changed for an already paid registration."
    );
    return;
  }

  setDiscountSaving(true);
  setDiscountMessage("");

  try {
    await updateDoc(doc(db, "registrations", selectedRecord.id), {
      adminDiscountType: discountType,
      adminDiscountValue: value,
      adminDiscountCurrency:
        discountType === "fixed" ? discountCurrency : null,
      adminDiscountStatus: discountStatus,
      adminDiscountUpdatedAt: serverTimestamp(),
    });

    setDiscountMessage("Discount assignment saved successfully.");
  } catch (error) {
    console.error("Error saving registration discount:", error);
    setDiscountMessage(
      "Could not save discount. Check Firestore permissions."
    );
  } finally {
    setDiscountSaving(false);
  }
}

  return (
    <div className="admin-page website-forms-page">
      <div className="website-forms-heading">
        <div>
          <div className="website-forms-eyebrow">
            MANAGEMENT WORKSPACE
          </div>
          <h1>Website Forms</h1>
          <p>
            View, search, filter and download website submissions.
          </p>
        </div>

        <div className="website-forms-total-card">
          <span>Records in this collection</span>
          <strong>{loading ? "…" : records.length}</strong>
          <small>{collectionInfo.title}</small>
        </div>
      </div>

      <div className="website-forms-collections">
        {COLLECTIONS.map((name) => (
          <button
            key={name}
            type="button"
            className={`website-forms-collection ${
              selected === name ? "active" : ""
            }`}
            onClick={() => setSelected(name)}
            aria-pressed={selected === name}
          >
            <span>{COLLECTION_INFO[name].title}</span>
            <span className="website-forms-collection-arrow">
              →
            </span>
          </button>
        ))}
      </div>

      <section className="website-forms-panel">
        <div className="website-forms-panel-heading">
          <div>
            <h2>{collectionInfo.title}</h2>
            <p>{collectionInfo.description}</p>
          </div>

          <span className="website-forms-count">
            {loading
              ? "Loading…"
              : `${filteredRecords.length} records`}
          </span>
        </div>

        
        <div className="website-forms-controls">
          <label
            className="website-forms-select-label"
            htmlFor="form-collection"
          >
            Collection
            <select
              id="form-collection"
              value={selected}
              onChange={(event) =>
                setSelected(event.target.value as CollectionName)
              }
            >
              {COLLECTIONS.map((name) => (
                <option key={name} value={name}>
                  {COLLECTION_INFO[name].title}
                </option>
              ))}
            </select>
          </label>

          <label
            className="website-forms-search-label"
            htmlFor="forms-search"
          >
            Search records
            <input
              id="forms-search"
              type="search"
              placeholder="Search name, email, phone..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          
<div className="website-forms-date-filters">
  {dateFilterMode === "all" && (
    <label>
      Date Filter
      <select
        value={dateFilterMode}
        onChange={(event) =>
          setDateFilterMode(
            event.target.value as DateFilterMode
          )
        }
      >
        <option value="all">All Dates</option>
        <option value="single">Specific Date</option>
        <option value="range">Date Range</option>
      </select>
    </label>
  )}

  {dateFilterMode === "single" && (
    <label>
      Select Date
      <input
        type="date"
        value={specificDate}
        onChange={(event) =>
          setSpecificDate(event.target.value)
        }
      />
    </label>
  )}

  {dateFilterMode === "range" && (
    <>
      <label>
        From Date
        <input
          type="date"
          value={fromDate}
          max={toDate || undefined}
          onChange={(event) =>
            setFromDate(event.target.value)
          }
        />
      </label>

      <label>
        To Date
        <input
          type="date"
          value={toDate}
          min={fromDate || undefined}
          onChange={(event) =>
            setToDate(event.target.value)
          }
        />
      </label>
    </>
  )}

  {dateFilterMode !== "all" && (
    <button
      type="button"
      className="website-forms-view-button"
      onClick={clearDateFilter}
    >
      Clear
    </button>
  )}
</div>

        </div>


        {loading && (
          <div className="website-forms-state">
            <span className="website-forms-spinner" />
            <p>Loading records…</p>
          </div>
        )}

        {!loading && error && (
          <div
            className="website-forms-state website-forms-error"
            role="alert"
          >
            <strong>Unable to load records</strong>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && records.length === 0 && (
          <div className="website-forms-state">
            <h3>No records yet</h3>
            <p>
              There are no documents in this collection, or none are
              accessible to the current account.
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          records.length > 0 &&
          filteredRecords.length === 0 && (
            <div className="website-forms-state">
              <h3>No matching records</h3>
              <p>
                Try another search term or date range. Records without
                a valid createdAt date are excluded when a date filter
                is active.
              </p>
            </div>
          )}

        {!loading && !error && filteredRecords.length > 0 && (
          <div className="website-forms-table-wrapper">
            <table className="website-forms-table">
              <thead>
                <tr>
                  <th>Person / Record</th>
                  {columns.map((column) => (
                    <th key={column}>
                      {humanizeLabel(column)}
                    </th>
                  ))}
                  <th>Attachment</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <div className="website-forms-person">
                        <strong>{getPersonName(record)}</strong>
                        <span title={record.id}>
                          ID: {record.id}
                        </span>
                      </div>
                    </td>

                    {columns.map((column) => {
                      const value = record[column];
                      const isStatus =
                        column.toLowerCase().includes("status");

                      return (
                        <td key={column}>
                          {isStatus && value != null ? (
                            <span className="website-forms-status">
                              {formatValue(value)}
                            </span>
                          ) : (
                            <span
                              className="website-forms-cell-value"
                              title={formatValue(value)}
                            >
                              {formatValue(value)}
                            </span>
                          )}
                        </td>
                      );
                    })}

                    <td>
                      <DownloadAttachment record={record} />
                    </td>

                    <td>
                      <button
                        type="button"
                        className="website-forms-view-button"
                        onClick={() => setSelectedRecord(record)}
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && records.length > 0 && (
          <div className="website-forms-footer">
            Showing {filteredRecords.length} of {records.length} records
          </div>
        )}
      </section>

      {selectedRecord && (
        <div
          className="website-forms-modal-backdrop"
          onClick={() => setSelectedRecord(null)}
          role="presentation"
        >
          <section
            className="website-forms-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="record-details-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="website-forms-modal-heading">
              <div>
                <span className="website-forms-eyebrow">
                  SUBMISSION DETAILS
                </span>
                <h2 id="record-details-title">
                  {getPersonName(selectedRecord)}
                </h2>
                <p>{collectionInfo.title}</p>
              </div>

              <button
                type="button"
                className="website-forms-close-button"
                onClick={() => setSelectedRecord(null)}
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <div className="website-forms-detail-grid">
              {Object.entries(selectedRecord).map(([key, value]) => {
                const isFileField = [
                  "fileUrl",
                  "downloadUrl",
                  "attachmentUrl",
                ].includes(key);

                const isFileName = key === "fileName";

                if (isFileField || isFileName) {
                  return null;
                }

                return (
                  <div
                    className="website-forms-detail-item"
                    key={key}
                  >
                    <span>{humanizeLabel(key)}</span>
                    <strong>{formatValue(value)}</strong>
                  </div>
                );
              })}
            </div>
             
{selected === "registrations" && (
  <div className="website-forms-discount-panel">
    <h3>Assign Registration Discount</h3>

    <p>
      Assign a discount to this specific registration.
    </p>

    <label>
      Discount Type
      <select
        value={discountType}
        onChange={(e) =>
          setDiscountType(e.target.value as "percent" | "fixed")
        }
      >
        <option value="percent">Percentage (%)</option>
        <option value="fixed">Fixed Amount</option>
      </select>
    </label>

    <label>
      Discount Value
      <input
        type="number"
        min="0"
        step="0.01"
        value={discountValue}
        onChange={(e) => setDiscountValue(e.target.value)}
        placeholder={
          discountType === "percent"
            ? "Example: 10"
            : "Example: 50"
        }
      />
    </label>

    {discountType === "fixed" && (
      <label>
        Discount Currency
        <select
          value={discountCurrency}
          onChange={(e) => setDiscountCurrency(e.target.value)}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
      </label>
    )}

    <label>
      Discount Status
      <select
        value={discountStatus}
        onChange={(e) =>
          setDiscountStatus(e.target.value as "active" | "inactive")
        }
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </label>

    <button
      type="button"
      onClick={handleSaveDiscount}
      disabled={discountSaving}
    >
      {discountSaving ? "Saving..." : "Save Discount"}
    </button>

    {discountMessage && <p>{discountMessage}</p>}
  </div>
)}


            {getFileUrl(selectedRecord) && (
              <div className="website-forms-detail-item">
                <span>Attachment</span>
                <DownloadAttachment record={selectedRecord} />
              </div>
            )}

            <div className="website-forms-modal-footer">
              <button
                type="button"
                className="website-forms-close-action"
                onClick={() => setSelectedRecord(null)}
              >
                Close details
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
