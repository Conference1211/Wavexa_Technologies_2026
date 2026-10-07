import { Link } from "react-router-dom";
import { ShieldCheck, FileText } from "lucide-react";
import { privacy, terms } from "@/data/legal";

type LegalSection = [string, string[]];

export default function Legal({
  type,
}: {
  type: "privacy" | "terms";
}) {
  const isPrivacy = type === "privacy";

  const sections: LegalSection[] = isPrivacy ? privacy : terms;

  return (
    <div className="business-page">
      <section className="business-inner-hero business-legal-hero">
        <div className="business-container">
          <span className="business-eyebrow">
            WAVEXA TECHNOLOGIES
          </span>

          <h1>
            {isPrivacy ? "Privacy Policy" : "Terms & Conditions"}
          </h1>

          <p>
            {isPrivacy
              ? "Your privacy matters to us."
              : "By using our website, you agree to these terms."}
          </p>
        </div>
      </section>

      <section className="business-section">
        <div className="business-container business-legal-layout">
          <aside className="business-legal-side">
            <div className="business-legal-side-icon">
              {isPrivacy ? <ShieldCheck /> : <FileText />}
            </div>

            <h2>
              {isPrivacy
                ? "Privacy Policy"
                : "Terms & Conditions"}
            </h2>

            <p>Wavexa Technologies</p>

            <Link to="/business/contact">
              Contact Us
            </Link>
          </aside>

          <article className="business-legal-content">
            {isPrivacy ? (
              <p className="business-legal-intro">
                At Wavexa Technologies . ("wavexa Technologies",
                "Company", "we", "our", or "us"), we respect your
                privacy and are committed to protecting the personal
                information you share with us. This Privacy Policy
                explains how we collect, use, store, disclose and
                protect your information when you visit our website
                or use our products and services. By accessing or
                using our website, you agree to this Privacy Policy.
              </p>
            ) : (
              <p className="business-legal-intro">
                Welcome to Wavexa Technologies. ("Company", "we",
                "our", or "us"). These Terms & Conditions govern your
                access to and use of our website, products, and
                services. By accessing or using our website, you
                acknowledge that you have read, understood, and
                agreed to be bound by these Terms & Conditions. If
                you do not agree with any part of these Terms, please
                discontinue the use of our website and services.
              </p>
            )}

            {sections.map(([title, items]) => (
              <section key={title}>
                <h2>{title}</h2>

                {items.map((item, i) => (
                  <p
                    key={i}
                    className={
                      i > 0 && items.length > 3
                        ? "business-legal-item"
                        : ""
                    }
                  >
                    {item}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
}