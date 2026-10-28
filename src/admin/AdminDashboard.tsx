// import {
//   CalendarDays,
//   CheckCircle2,
//   Clock3,
//   FileText,
//   Plus,
//   ArrowUpRight,
//   Globe2,
//   Activity,
// } from "lucide-react";
// import "./AdminDashboard.css";
// import { Link } from "react-router-dom";

// const stats = [
//   {
//     label: "Total Conferences",
//     value: "7",
//     note: "Existing conference records",
//     icon: CalendarDays,
//     tone: "green",
//   },
//   {
//     label: "Published",
//     value: "1",
//     note: "Current conference",
//     icon: CheckCircle2,
//     tone: "gold",
//   },
//   {
//     label: "Drafts",
//     value: "6",
//     note: "Upcoming conference entries",
//     icon: FileText,
//     tone: "blue",
//   },
//   {
//     label: "Pending Updates",
//     value: "—",
//     note: "Live data not connected yet",
//     icon: Clock3,
//     tone: "purple",
//   },
// ];

// const conferences = [
//   {
//     name: "Global Summit on Diabetes, Cardiology & Cardiometabolic Health",
//     date: "09–10 December 2026",
//     status: "Existing",
//     statusClass: "existing",
//   },
//   {
//     name: "International Conference on Dental and Oral Health",
//     date: "20–21 December 2026",
//     status: "Upcoming",
//     statusClass: "upcoming",
//   },
//   {
//     name: "International Conference on Psychiatry and Mental Health",
//     date: "12–13 November 2026",
//     status: "Upcoming",
//     statusClass: "upcoming",
//   },
// ];

// export default function AdminDashboard() {
//   return (
//     <div className="admin-dashboard">
//       <section className="admin-welcome">
//         <div>
//           <span className="admin-eyebrow">
//             <Activity size={14} />
//             WORKSPACE OVERVIEW
//           </span>
//           <h1>Welcome to your workspace</h1>
//           <p>
//             Manage your conferences and keep event content up to date from
//             one place.
//           </p>
//         </div>

//         <Link to="/admin/conferences" className="admin-primary-button">
//           <Plus size={18} />
//           Manage Conferences
//         </Link>
//       </section>

//       <section className="admin-stats-grid">
//         {stats.map(({ label, value, note, icon: Icon, tone }) => (
//           <article className="admin-stat-card" key={label}>
//             <div className={`admin-stat-icon ${tone}`}>
//               <Icon size={21} strokeWidth={1.8} />
//             </div>
//             <p>{label}</p>
//             <div className="admin-stat-value">{value}</div>
//             <span className="admin-stat-note">{note}</span>
//           </article>
//         ))}
//       </section>

//       <section className="admin-dashboard-grid">
//         <article className="admin-panel admin-conferences-panel">
//           <div className="admin-panel-heading">
//             <div>
//               <h2>Conference Overview</h2>
//               <p>Your existing conference entries</p>
//             </div>
//             <Link to="/admin/conferences" className="admin-text-link">
//               View all <ArrowUpRight size={15} />
//             </Link>
//           </div>

//           <div className="admin-table-wrapper">
//             <table className="admin-table">
//               <thead>
//                 <tr>
//                   <th>Conference</th>
//                   <th>Date</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {conferences.map((conference) => (
//                   <tr key={conference.name}>
//                     <td>
//                       <div className="admin-conference-name">
//                         <span className="admin-conference-icon">
//                           <CalendarDays size={17} />
//                         </span>
//                         <span>{conference.name}</span>
//                       </div>
//                     </td>
//                     <td className="admin-date-cell">{conference.date}</td>
//                     <td>
//                       <span
//                         className={`admin-status-badge ${conference.statusClass}`}
//                       >
//                         {conference.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="admin-panel-footer">
//             <Globe2 size={16} />
//             <span>
//               This overview uses sample UI data, not live Firestore records.
//             </span>
//           </div>
//         </article>

//         <article className="admin-panel admin-quick-panel">
//           <div className="admin-panel-heading">
//             <div>
//               <h2>Quick Actions</h2>
//               <p>Common workspace tasks</p>
//             </div>
//           </div>

//           <Link to="/admin/conferences" className="admin-quick-action">
//             <span className="admin-quick-icon">
//               <CalendarDays size={19} />
//             </span>
//             <span className="admin-quick-copy">
//               <strong>Conference Management</strong>
//               <small>Review conference entries</small>
//             </span>
//             <ArrowUpRight size={17} />
//           </Link>

//           <Link to="/admin/content" className="admin-quick-action">
//             <span className="admin-quick-icon">
//               <FileText size={19} />
//             </span>
//             <span className="admin-quick-copy">
//               <strong>Edit Website Content</strong>
//               <small>Manage page content</small>
//             </span>
//             <ArrowUpRight size={17} />
//           </Link>

//           <div className="admin-tip">
//             <div className="admin-tip-icon">
//               <CheckCircle2 size={19} />
//             </div>
//             <div>
//               <strong>Content management</strong>
//               <p>
//                 Changes will be connected to Firestore after the access
//                 rules and data structure are configured.
//               </p>
//             </div>
//           </div>
//         </article>
//       </section>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Plus,
  ArrowUpRight,
  Globe2,
  Activity,
  Archive,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  collection,
  onSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/firebase";
import "./AdminDashboard.css";

type Conference = {
  id: string;
  title?: string;
  name?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  venue?: string;
  status?: string;
};

function normalizeStatus(status?: string) {
  const normalized = (status ?? "").trim().toLowerCase();

  if (normalized === "published" || normalized === "existing") {
    return "published";
  }

  if (normalized === "archived" || normalized === "archive") {
    return "archived";
  }

  return "draft";
}

function formatConferenceDate(conference: Conference) {
  if (conference.date) return conference.date;

  if (conference.startDate && conference.endDate) {
    return `${conference.startDate} – ${conference.endDate}`;
  }

  return conference.startDate || conference.endDate || "Date not set";
}

export default function AdminDashboard() {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "conferences"),
      (snapshot) => {
        const records = snapshot.docs.map((document) => {
          const data = document.data() as DocumentData;

          return {
            id: document.id,
            ...data,
          } as Conference;
        });

        setConferences(records);
        setLoading(false);
        setError("");
      },
      (snapshotError) => {
        console.error("Dashboard conference loading failed:", snapshotError);
        setError("Unable to load conferences. Please check your access and try again.");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const stats = useMemo(() => {
    const published = conferences.filter(
      (conference) => normalizeStatus(conference.status) === "published",
    ).length;

    const archived = conferences.filter(
      (conference) => normalizeStatus(conference.status) === "archived",
    ).length;

    const drafts = conferences.length - published - archived;

    return {
      total: conferences.length,
      published,
      drafts,
      archived,
      publishedPercent:
        conferences.length > 0
          ? Math.round((published / conferences.length) * 100)
          : 0,
      draftPercent:
        conferences.length > 0
          ? Math.round((drafts / conferences.length) * 100)
          : 0,
      archivedPercent:
        conferences.length > 0
          ? Math.round((archived / conferences.length) * 100)
          : 0,
    };
  }, [conferences]);

  const recentConferences = useMemo(
    () => conferences.slice(0, 5),
    [conferences],
  );

  const statCards = [
    {
      label: "Total Conferences",
      value: stats.total,
      note: "All conference records",
      icon: CalendarDays,
      tone: "green",
    },
    {
      label: "Published",
      value: stats.published,
      note: `${stats.publishedPercent}% of all conferences`,
      icon: CheckCircle2,
      tone: "gold",
    },
    {
      label: "Drafts",
      value: stats.drafts,
      note: `${stats.draftPercent}% of all conferences`,
      icon: FileText,
      tone: "blue",
    },
    {
      label: "Archived",
      value: stats.archived,
      note: `${stats.archivedPercent}% of all conferences`,
      icon: Archive,
      tone: "purple",
    },
  ];

  return (
    <div className="admin-dashboard">
      <section className="admin-welcome">
        <div>
          <span className="admin-eyebrow">
            <Activity size={14} />
            WORKSPACE OVERVIEW
          </span>

          <h1>Welcome to your workspace</h1>

          <p>
            Manage your conferences and monitor your event content from one
            place.
          </p>
        </div>

        <Link to="/admin/conferences" className="admin-primary-button">
          <Plus size={18} />
          Manage Conferences
        </Link>
      </section>

      {error && (
        <div className="admin-dashboard-error" role="alert">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <section className="admin-stats-grid">
        {statCards.map(({ label, value, note, icon: Icon, tone }) => (
          <article className="admin-stat-card" key={label}>
            <div className={`admin-stat-icon ${tone}`}>
              <Icon size={21} strokeWidth={1.8} />
            </div>

            <p>{label}</p>

            <div className="admin-stat-value">
              {loading ? "—" : value}
            </div>

            <span className="admin-stat-note">{note}</span>
          </article>
        ))}
      </section>

      <section className="admin-dashboard-grid">
        <article className="admin-panel admin-conferences-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Conference Overview</h2>
              <p>Latest records from your conference collection</p>
            </div>

            <Link to="/admin/conferences" className="admin-text-link">
              View all <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Conference</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="admin-dashboard-message">
                      Loading conferences...
                    </td>
                  </tr>
                ) : recentConferences.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="admin-dashboard-message">
                      No conferences found. Add a conference to get started.
                    </td>
                  </tr>
                ) : (
                  recentConferences.map((conference) => {
                    const status = normalizeStatus(conference.status);
                    const title =
                      conference.title ||
                      conference.name ||
                      "Untitled conference";

                    return (
                      <tr key={conference.id}>
                        <td>
                          <div className="admin-conference-name">
                            <span className="admin-conference-icon">
                              <CalendarDays size={17} />
                            </span>
                            <span>{title}</span>
                          </div>
                        </td>

                        <td className="admin-date-cell">
                          {formatConferenceDate(conference)}
                        </td>

                        <td>
                          <span
                            className={`admin-status-badge ${
                              status === "published"
                                ? "existing"
                                : status === "archived"
                                  ? "archived"
                                  : "upcoming"
                            }`}
                          >
                            {status === "published"
                              ? "Published"
                              : status === "archived"
                                ? "Archived"
                                : "Draft"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="admin-panel-footer">
            <Globe2 size={16} />
            <span>
              {loading
                ? "Connecting to Firestore..."
                : "Dashboard statistics update automatically when conference records change."}
            </span>
          </div>
        </article>

        <article className="admin-panel admin-quick-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Publishing Analytics</h2>
              <p>Conference status breakdown</p>
            </div>
          </div>

          <div className="admin-publishing-content">
            <div className="admin-publishing-circle">
              <svg
                className="admin-progress-ring"
                viewBox="0 0 120 120"
                role="img"
                aria-label={`${stats.publishedPercent}% of conferences published`}
              >
                <circle
                  className="admin-progress-ring-track"
                  cx="60"
                  cy="60"
                  r="49"
                />

                <circle
                  className="admin-progress-ring-value"
                  cx="60"
                  cy="60"
                  r="49"
                  strokeDasharray={`${(stats.publishedPercent / 100) * 307.88} 307.88`}
                />
              </svg>

              <div className="admin-publishing-circle-label">
                <strong>{loading ? "—" : `${stats.publishedPercent}%`}</strong>
                <span>Published</span>
              </div>
            </div>

            <div className="admin-progress-list">
              <div className="admin-progress-heading">
                <span>Published</span>
                <strong>{loading ? "—" : stats.published}</strong>
              </div>
              <div
                className="admin-progress-track"
                role="progressbar"
                aria-label="Published conferences"
                aria-valuenow={stats.publishedPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span
                  className="admin-progress-fill published"
                  style={{ width: `${stats.publishedPercent}%` }}
                />
              </div>

              <div className="admin-progress-heading">
                <span>Drafts</span>
                <strong>{loading ? "—" : stats.drafts}</strong>
              </div>
              <div
                className="admin-progress-track"
                role="progressbar"
                aria-label="Draft conferences"
                aria-valuenow={stats.draftPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span
                  className="admin-progress-fill drafts"
                  style={{ width: `${stats.draftPercent}%` }}
                />
              </div>

              <div className="admin-progress-heading">
                <span>Archived</span>
                <strong>{loading ? "—" : stats.archived}</strong>
              </div>
              <div
                className="admin-progress-track"
                role="progressbar"
                aria-label="Archived conferences"
                aria-valuenow={stats.archivedPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span
                  className="admin-progress-fill archived"
                  style={{ width: `${stats.archivedPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="admin-dashboard-divider" />

          <Link to="/admin/conferences" className="admin-quick-action">
            <span className="admin-quick-icon">
              <CalendarDays size={19} />
            </span>
            <span className="admin-quick-copy">
              <strong>Conference Management</strong>
              <small>View and manage conference records</small>
            </span>
            <ArrowUpRight size={17} />
          </Link>

          <Link to="/admin/content" className="admin-quick-action">
            <span className="admin-quick-icon">
              <FileText size={19} />
            </span>
            <span className="admin-quick-copy">
              <strong>Edit Website Content</strong>
              <small>Open the content management page</small>
            </span>
            <ArrowUpRight size={17} />
          </Link>

          <div className="admin-tip">
            <div className="admin-tip-icon">
              <TrendingUp size={19} />
            </div>
            <div>
              <strong>Live dashboard</strong>
              <p>
                Status counts and publishing progress are calculated from the
                conference records available in Firestore.
              </p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
