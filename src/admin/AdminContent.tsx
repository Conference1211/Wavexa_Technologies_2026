import { FileText, Globe, Info } from "lucide-react";
import "./AdminContent.css";

export default function AdminContent() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-eyebrow">WEBSITE MANAGEMENT</span>
          <h1>Content Management</h1>
          <p>Manage and maintain your Wavexa website content.</p>
        </div>
        <div className="admin-page-icon">
          <FileText size={25} />
        </div>
      </div>

      <div className="admin-content-notice">
        <Info size={20} />
        <div>
          <strong>Content workspace</strong>
          <p>
            This page is ready for the website content management features.
            No website content has been changed or saved yet.
          </p>
        </div>
      </div>

      <div className="admin-content-cards">
        <div className="admin-content-card">
          <div className="admin-content-card-icon">
            <Globe size={22} />
          </div>
          <h2>Website Pages</h2>
          <p>
            Manage content for Home, About Us, Services, Technology and Contact
            pages.
          </p>
          <span className="admin-content-status">Setup required</span>
        </div>

        <div className="admin-content-card">
          <div className="admin-content-card-icon">
            <FileText size={22} />
          </div>
          <h2>Page Content</h2>
          <p>
            Prepare content editing and publishing controls for your website.
          </p>
          <span className="admin-content-status">Setup required</span>
        </div>
      </div>
    </div>
  );
}