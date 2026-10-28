import { NavLink, Outlet } from "react-router-dom";
import "./Admin.css";
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Settings,
  Globe,
  LogOut,
  Menu,
  Bell,
  Inbox,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Conferences", path: "/admin/conferences", icon: CalendarDays },
   { label: "Website Forms", path: "/admin/forms", icon: Inbox },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="admin-brand">
          <div className="admin-brand-mark">W</div>
          <div>
            <h2>WAVEXA</h2>
            <span>ADMIN PORTAL</span>
          </div>
        </div>

        <div className="admin-workspace">
          <span className="workspace-dot" />
          <div>
            <strong>Wavexa Technologies</strong>
            <small>Management workspace</small>
          </div>
        </div>

        <p className="admin-nav-heading">WORKSPACE</p>

        <nav className="admin-navigation">
          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/admin"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-help">
            <Globe size={19} />
            <div>
              <strong>Public Website</strong>
              <small>Visit Wavexa</small>
            </div>
          </div>

          <button
            type="button"
            className="admin-logout"
            onClick={() => {
              window.location.href = "/signin";
            }}
          >
            <LogOut size={18} />
            <span>Sign In / Sign Out</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-menu-button"
            aria-label="Toggle navigation"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={22} />
          </button>

          <div className="admin-breadcrumb">
            <span>Wavexa</span>
            <span className="breadcrumb-separator">/</span>
            <strong>Admin Workspace</strong>
          </div>

          <div className="admin-topbar-actions">
            <span className="admin-status">
              <span className="workspace-dot" />
              Management Portal
            </span>
            <button
              type="button"
              className="admin-notification"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={19} />
            </button>
            <div className="admin-avatar">W</div>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}