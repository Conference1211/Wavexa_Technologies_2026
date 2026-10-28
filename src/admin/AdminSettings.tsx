import { useState, type FormEvent } from "react";
import {
  Settings,
  UserRound,
  Bell,
  ShieldCheck,
  Save,
  Info,
} from "lucide-react";
import "./AdminSettings.css";

export default function AdminSettings() {
  const [adminName, setAdminName] = useState("Wavexa Admin");
  const [email, setEmail] = useState("admit@gmail.com");
  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Settings are displayed locally only. Database saving is not connected yet."
    );
  }

  return (
    <div className="admin-settings-page">
      <div className="admin-settings-header">
        <div>
          <span className="admin-settings-eyebrow">WORKSPACE PREFERENCES</span>
          <h1>Settings</h1>
          <p>Manage your admin profile and dashboard preferences.</p>
        </div>

        <div className="admin-settings-header-icon">
          <Settings size={26} />
        </div>
      </div>

      <div className="admin-settings-notice">
        <Info size={19} />
        <p>
          Profile changes below are local to this page and are not saved to
          Firebase yet.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <section className="admin-settings-card">
          <div className="admin-settings-card-heading">
            <div className="admin-settings-section-icon profile-icon">
              <UserRound size={21} />
            </div>
            <div>
              <h2>Admin Profile</h2>
              <p>View and edit the profile details shown on this page.</p>
            </div>
          </div>

          <div className="admin-settings-fields">
            <label>
              Display Name
              <input
                value={adminName}
                onChange={(event) => setAdminName(event.target.value)}
                placeholder="Enter display name"
              />
            </label>

            <label>
              Admin Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter admin email"
              />
            </label>
          </div>
        </section>

        <section className="admin-settings-card">
          <div className="admin-settings-card-heading">
            <div className="admin-settings-section-icon notification-icon">
              <Bell size={21} />
            </div>
            <div>
              <h2>Notifications</h2>
              <p>Choose your dashboard notification preference.</p>
            </div>
          </div>

          <label className="admin-settings-toggle">
            <span>
              <strong>Dashboard notifications</strong>
              <small>Enable notification preferences for this page.</small>
            </span>

            <input
              type="checkbox"
              checked={notifications}
              onChange={(event) => setNotifications(event.target.checked)}
            />
          </label>
        </section>

        <section className="admin-settings-card">
          <div className="admin-settings-card-heading">
            <div className="admin-settings-section-icon security-icon">
              <ShieldCheck size={21} />
            </div>
            <div>
              <h2>Security</h2>
              <p>Account security information.</p>
            </div>
          </div>

          <div className="admin-settings-security-info">
            <ShieldCheck size={20} />
            <div>
              <strong>Firebase Authentication</strong>
              <p>
                Authentication is managed by the existing Firebase setup.
                Password and security changes are not handled on this page.
              </p>
            </div>
          </div>
        </section>

        <div className="admin-settings-actions">
          {message && <p className="admin-settings-message">{message}</p>}

          <button type="submit" className="admin-settings-save">
            <Save size={17} />
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
