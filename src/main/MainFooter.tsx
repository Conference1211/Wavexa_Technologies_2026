import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Twitter, Youtube, ArrowUpRight } from "lucide-react";
import logoVideo from "@/assets/logo1.webm";
import { BUSINESS, BUSINESS_SERVICES as services } from "@/data/business";


/*
const socialLinks = [
  ["Facebook", Facebook, "hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"],
  ["Instagram", Instagram, "hover:border-pink-500 hover:text-pink-400 hover:bg-pink-500/20 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]"],
  ["LinkedIn", Linkedin, "hover:border-sky-600 hover:text-sky-500 hover:bg-sky-600/20 hover:shadow-[0_0_15px_rgba(2,132,199,0.3)]"],
  ["Twitter", Twitter, "hover:border-sky-400 hover:text-sky-300 hover:bg-sky-400/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]"],
  ["YouTube", Youtube, "hover:border-red-500 hover:text-red-400 hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"],
] as const;
*/

export default function MainFooter() {
  return (
    <footer className="business-footer conference-style-business-footer">
      <div className="business-footer-glow" />

      <div className="business-footer-inner">
        <div className="business-footer-brand">
          <div className="business-footer-logo">
            <video
              src={logoVideo}
              autoPlay
              loop
              muted
              playsInline
              aria-label="Wavexa logo"
            />

            <div>
              <strong>WAVEXA</strong>
            </div>
          </div>

          <p>
            Advanced IT solutions & Healthcare services designed to help businesses
            move forward with confidence.
          </p>

          {/*
          <div className="business-footer-socials">
            {socialLinks.map(([name, Icon, hoverStyle]) => (
              <a
                key={name}
                href="#"
                aria-label={name}
                className={hoverStyle}
              >
                <Icon />
              </a>
            ))}
          </div>
          */}
        </div>

        <div>
          <h4>Explore</h4>

          <Link to="/">Home</Link>
          <Link to="/business/about">About Us</Link>
          <Link to="/business/technologies">Technologies</Link>
          <Link to="/business/contact">Contact Us</Link>
        </div>

        <div>
          <h4>Our Services</h4>

          {services.map(([label, path]) => (
            <Link key={path} to={path}>
              {label}
            </Link>
          ))}
        </div>

        <div className="business-footer-contact">
          <h4>Reach Us</h4>

          <p>
            <MapPin />
            {BUSINESS.address}
          </p>

          <a href={`mailto:${BUSINESS.email}`}>
            <Mail />
            {BUSINESS.email}
          </a>

          <a href={`tel:${BUSINESS.phoneRaw}`}>
            <Phone />
            {BUSINESS.phone}
          </a>

          <Link
            to="/business/contact"
            className="business-footer-seat"
          >
            <span>Contact Wavexa</span>
            <ArrowUpRight />
          </Link>
        </div>
      </div>

      <div className="business-footer-bottom">
        <span>
          © {new Date().getFullYear()} Wavexa Technologies. All rights reserved.
        </span>

        <div>
          <Link to="/business/privacy-policy">
            Privacy Policy
          </Link>

          <Link to="/business/terms-conditions">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}