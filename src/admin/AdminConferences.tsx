import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Search,
  Plus,
  CalendarDays,
  MapPin,
  Pencil,
  X,
  FileText,
  Globe,
  Trash2,
} from "lucide-react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import "./AdminConferences.css";

type ConferenceStatus = "Draft" | "Published" | "Archived";

interface ConferenceItem {
  id: string;
  title: string;
  date: string;
  venue: string;
  status: ConferenceStatus;
}

const emptyForm = {
  title: "",
  date: "",
  venue: "",
  status: "Draft" as ConferenceStatus,
};

export default function AdminConferences() {
  const [conferences, setConferences] = useState<ConferenceItem[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [status, setStatus] = useState<ConferenceStatus>("Draft");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "conferences"),
      (snapshot) => {
        const items: ConferenceItem[] = snapshot.docs.map((item) => {
          const data = item.data();

          return {
            id: item.id,
            title: typeof data.title === "string" ? data.title : "",
            date: typeof data.date === "string" ? data.date : "To be announced",
            venue: typeof data.venue === "string" ? data.venue : "To be announced",
            status:
              data.status === "Published" || data.status === "Archived"
                ? data.status
                : "Draft",
          };
        });

        setConferences(items);
        setError("");
        setLoading(false);
      },
      (err) => {
        console.error("Conferences Firestore listener failed:", err);
        setError(
          "Could not load conferences. Check your Firestore Rules and admin access."
        );
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const filteredConferences = useMemo(() => {
    return conferences.filter((conference) => {
      const matchesSearch = conference.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        filter === "All" || conference.status === filter;

      return matchesSearch && matchesStatus;
    });
  }, [conferences, search, filter]);

  const resetForm = () => {
    setTitle("");
    setDate("");
    setVenue("");
    setStatus("Draft");
    setEditingId(null);
    setShowForm(false);
  };

  const openAddForm = () => {
    setError("");
    setNotice("");
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (conference: ConferenceItem) => {
    setError("");
    setNotice("");
    setEditingId(conference.id);
    setTitle(conference.title);
    setDate(
      conference.date === "To be announced" ? "" : conference.date
    );
    setVenue(
      conference.venue === "To be announced" ? "" : conference.venue
    );
    setStatus(conference.status);
    setShowForm(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!title.trim()) {
      setError("Please enter a conference name.");
      return;
    }

    const conferenceData = {
      title: title.trim(),
      date: date.trim() || "To be announced",
      venue: venue.trim() || "To be announced",
      status,
      updatedAt: serverTimestamp(),
    };

    setSaving(true);

    try {
      if (editingId) {
        await updateDoc(doc(db, "conferences", editingId), conferenceData);
        setNotice("Conference updated successfully.");
      } else {
        await addDoc(collection(db, "conferences"), {
          ...conferenceData,
          createdAt: serverTimestamp(),
        });
        setNotice("Conference added successfully.");
      }

      resetForm();
    } catch (err) {
      console.error("Saving conference failed:", err);
      setError(
        "Unable to save. Check your internet connection, Firestore Rules, and admin permissions."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (conference: ConferenceItem) => {
    const confirmed = window.confirm(
      `Delete "${conference.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setNotice("");

    try {
      await deleteDoc(doc(db, "conferences", conference.id));
      setNotice("Conference deleted successfully.");
    } catch (err) {
      console.error("Deleting conference failed:", err);
      setError(
        "Unable to delete this conference. Check your Firestore Rules and admin permissions."
      );
    }
  };

  const getStatusClass = (value: ConferenceStatus) =>
    value.toLowerCase();

  return (
    <section className="conference-management">
      <div className="conference-page-heading">
        <div>
          <span className="conference-eyebrow">CONTENT WORKSPACE</span>
          <h1>Conferences</h1>
          <p>Manage your conference information and publication status.</p>
        </div>

        <button
          className="conference-primary-btn"
          onClick={openAddForm}
          type="button"
        >
          <Plus size={18} />
          Add Conference
        </button>
      </div>

      <div className="conference-summary-grid">
        <div className="conference-summary-card">
          <span className="conference-summary-icon blue">
            <CalendarDays size={21} />
          </span>
          <div>
            <p>Total Conferences</p>
            <h2>{conferences.length}</h2>
          </div>
        </div>

        <div className="conference-summary-card">
          <span className="conference-summary-icon green">
            <Globe size={21} />
          </span>
          <div>
            <p>Published</p>
            <h2>
              {conferences.filter((item) => item.status === "Published").length}
            </h2>
          </div>
        </div>

        <div className="conference-summary-card">
          <span className="conference-summary-icon purple">
            <FileText size={21} />
          </span>
          <div>
            <p>Drafts</p>
            <h2>
              {conferences.filter((item) => item.status === "Draft").length}
            </h2>
          </div>
        </div>
      </div>

      {error && (
        <p className="auth-message auth-error" role="alert">
          {error}
        </p>
      )}

      {notice && (
        <p className="auth-message auth-success" role="status">
          {notice}
        </p>
      )}

      <div className="conference-list-panel">
        <div className="conference-list-toolbar">
          <div>
            <h2>All Conferences</h2>
            <p>Search and manage conference entries.</p>
          </div>

          <div className="conference-toolbar-controls">
            <label className="conference-search">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search conferences..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <select
              className="conference-filter"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="conference-empty-state">
            <p>Loading conferences from Firebase...</p>
          </div>
        ) : filteredConferences.length > 0 ? (
          <div className="conference-table-wrapper">
            <table className="conference-management-table">
              <thead>
                <tr>
                  <th>Conference</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredConferences.map((conference) => (
                  <tr key={conference.id}>
                    <td>
                      <div className="conference-name-cell">
                        <span className="conference-row-icon">
                          <CalendarDays size={19} />
                        </span>
                        <span>{conference.title}</span>
                      </div>
                    </td>

                    <td>{conference.date}</td>

                    <td>
                      <span className="conference-venue">
                        <MapPin size={15} />
                        {conference.venue}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`conference-status ${getStatusClass(
                          conference.status
                        )}`}
                      >
                        {conference.status}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="conference-edit-btn"
                        onClick={() => openEditForm(conference)}
                        aria-label={`Edit ${conference.title}`}
                        title="Edit conference"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="conference-edit-btn"
                        onClick={() => handleDelete(conference)}
                        aria-label={`Delete ${conference.title}`}
                        title="Delete conference"
                        style={{ marginLeft: 8 }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="conference-empty-state">
            <Search size={30} />
            <h3>
              {conferences.length === 0
                ? "No conferences in Firebase yet"
                : "No conferences found"}
            </h3>
            <p>
              {conferences.length === 0
                ? "Use Add Conference to create your first Firestore record."
                : "Try another search term or status filter."}
            </p>
          </div>
        )}
      </div>

      {showForm && (
        <div
          className="conference-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) {
              resetForm();
            }
          }}
        >
          <div
            className="conference-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="conference-form-title"
          >
            <div className="conference-modal-heading">
              <div>
                <span className="conference-eyebrow">CONFERENCE DETAILS</span>
                <h2 id="conference-form-title">
                  {editingId ? "Edit Conference" : "Add Conference"}
                </h2>
                <p>Enter the basic information below.</p>
              </div>

              <button
                type="button"
                className="conference-modal-close"
                onClick={resetForm}
                aria-label="Close form"
                disabled={saving}
              >
                <X size={20} />
              </button>
            </div>

            <form className="conference-form" onSubmit={handleSubmit}>
              <label>
                Conference Name <span>*</span>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Enter conference name"
                  required
                  autoFocus
                />
              </label>

              <label>
                Date
                <input
                  type="text"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  placeholder="e.g. 09–10 December 2026"
                />
              </label>

              <label>
                Venue
                <input
                  type="text"
                  value={venue}
                  onChange={(event) => setVenue(event.target.value)}
                  placeholder="e.g. Webinar"
                />
              </label>

              <label>
                Status
                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as ConferenceStatus)
                  }
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Archived">Archived</option>
                </select>
              </label>

              {error && (
                <p className="auth-message auth-error" role="alert">
                  {error}
                </p>
              )}

              <div className="conference-form-actions">
                <button
                  type="button"
                  className="conference-secondary-btn"
                  onClick={resetForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="conference-primary-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Details"
                      : "Add Conference"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}