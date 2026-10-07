
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Clock3,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import contactHero from "@/assets/contact.jpeg";
import { BUSINESS } from "@/data/business";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
const [successMessage, setSuccessMessage] = useState("");
  /* -----------------------------
     FORMATTERS
  ----------------------------- */

  const formatName = (value: string) => {
    const cleaned = value
      .replace(/[^A-Za-z ]/g, "")
      .replace(/\s+/g, " ");

    return cleaned
      .split(" ")
      .map((part) =>
        part
          ? part.charAt(0).toUpperCase() +
            part.slice(1).toLowerCase()
          : "",
      )
      .join(" ");
  };

  const formatEmail = (value: string) => {
    let cleaned = value
      .replace(/\s/g, "")
      .replace(/[^A-Za-z0-9@.]/g, "")
      .toLowerCase();

    const at = cleaned.indexOf("@");

    if (at !== -1) {
      cleaned =
        cleaned.slice(0, at + 1) +
        cleaned.slice(at + 1).replace(/@/g, "");
    }

    return cleaned;
  };

  const formatPhone = (value: string) =>
    value.replace(/\D/g, "").slice(0, 10);

  /* -----------------------------
     VALIDATIONS
  ----------------------------- */

  const validateName = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "Name is required";
    }

    if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(trimmed)) {
      return "Name should contain only letters and spaces";
    }

    const words = trimmed.split(" ");

    const isProperName = words.every((word) =>
      /^[A-Z][a-z]*$/.test(word),
    );

    if (!isProperName) {
      return "Each name should start with a capital letter";
    }

    return "";
  };

  const validateEmail = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "Email is required";
    }

    if (!/^[a-z0-9@.]+$/.test(trimmed)) {
      return "Use only lowercase letters, numbers, @ and .";
    }

    if (
      !/^[a-z0-9]+@[a-z0-9]+(?:\.[a-z0-9]+)+$/.test(
        trimmed,
      )
    ) {
      return "Please enter a valid email address";
    }

    return "";
  };

  const validatePhone = (value: string) => {
    if (!value.trim()) {
      return "Phone number is required";
    }

    if (!/^[0-9]+$/.test(value)) {
      return "Phone number should contain only numbers";
    }

    if (value.length !== 10) {
      return "Phone number must contain exactly 10 digits";
    }

    return "";
  };

  const validateMessage = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "Message is required";
    }

    if (trimmed.length < 10) {
      return "Message must contain at least 10 characters";
    }

    return "";
  };

  /* -----------------------------
     SUBMIT
  ----------------------------- */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      phone: validatePhone(phone),
      message: validateMessage(message),
    };

    setErrors(newErrors);

    // Stop if there are validation errors
    if (
      Object.values(newErrors).some(
        (error) => error !== "",
      )
    ) {
      return;
    }

    try {
      await addDoc(
        collection(db, "businessContactMessages"),
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          source: "Business Contact Page",
          createdAt: serverTimestamp(),
        },
      );

      console.log(
        "Business contact enquiry saved successfully",
      );

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      setErrors({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setSuccessMessage(
  "Thank you! Your enquiry has been sent successfully.",
);
    } catch (error) {
      console.error(
        "Error saving business contact enquiry:",
        error,
      );

      alert(
        "Unable to send your enquiry right now. Please try again.",
      );
    }
  };

  return (
    <div className="business-page business-contact-page">

      {/* =========================
          HERO
      ========================== */}

      <section
        className="business-inner-hero business-contact-hero"
        style={{
          backgroundImage: `linear-gradient(
            110deg,
            rgba(3,43,75,.96),
            rgba(0,110,128,.78)
          ), url("${contactHero}")`,
        }}
      >
        <div className="business-container">
          <span className="business-eyebrow">
            CONTACT US
          </span>

          <h1>
            Let's build something great together.
          </h1>

          <p>
            We'd love to hear what you're planning,
            what you're solving and where technology
            can help.
          </p>
        </div>
      </section>

      {/* =========================
          CONTACT SECTION
      ========================== */}

      <section className="business-section">
        <div className="business-container business-contact-layout">

          {/* CONTACT INFORMATION */}

          <div className="business-contact-info">

            <span className="business-kicker">
              GET IN TOUCH
            </span>

            <h2>
              Tell us what you need.
            </h2>

            <p>
              Whether you're exploring a new website,
              mobile application, conference service or
              digital marketing strategy, our team is
              ready to listen.
            </p>

            <div className="business-contact-cards">

              {/* Address */}

              <div>
                <span>
                  <MapPin />
                </span>

                <div>
                  <h3>Visit Us</h3>
                  <p>{BUSINESS.address}</p>
                </div>
              </div>

              {/* Email */}

              <div>
                <span>
                  <Mail />
                </span>

                <div>
                  <h3>Email Us</h3>

                  <a
                    href={`mailto:${BUSINESS.email}`}
                  >
                    {BUSINESS.email}
                  </a>
                </div>
              </div>

              {/* Phone */}

              <div>
                <span>
                  <Phone />
                </span>

                <div>
                  <h3>Call Us</h3>

                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                  >
                    {BUSINESS.phone}
                  </a>
                </div>
              </div>

              {/* Support */}

              <div>
                <span>
                  <Clock3 />
                </span>

                <div>
                  <h3>Support</h3>

                  <p>
                    Responsive technical support built
                    around your business's needs.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* =========================
              CONTACT FORM
          ========================== */}

          <motion.form
            className="business-contact-form"
            onSubmit={handleSubmit}
            noValidate
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >

            {/* FORM HEADING */}

            <div className="business-form-heading">

              <span>
                <Send />
              </span>

              <div>
                <span className="business-kicker">
                  SEND US A MESSAGE
                </span>

                <h2>
                  Start the conversation.
                </h2>
              </div>

            </div>

            {/* =========================
                NAME
            ========================== */}

            <label className="business-required">

              <span className="business-field-label">
                Name{" "}
                <span aria-hidden="true">
                  *
                </span>
              </span>

              <input
                required
                value={name}
                onChange={(e) => {
                  const value = formatName(
                    e.target.value,
                  );

                  setName(value);

                  setErrors((prev) => ({
                    ...prev,
                    name: validateName(value),
                  }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                placeholder="Your name"
                autoComplete="name"
                className={
                  errors.name
                    ? "business-input-error"
                    : ""
                }
              />

              <div className="business-form-error">
                {errors.name && (
                  <span>{errors.name}</span>
                )}
              </div>

            </label>

            {/* =========================
                EMAIL
            ========================== */}

            <label className="business-required">

              <span className="business-field-label">
                Email{" "}
                <span aria-hidden="true">
                  *
                </span>
              </span>

              <input
                required
                type="email"
                value={email}
                onChange={(e) => {
                  const value = formatEmail(
                    e.target.value,
                  );

                  setEmail(value);

                  setErrors((prev) => ({
                    ...prev,
                    email: validateEmail(value),
                  }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                placeholder="you@example.com"
                autoComplete="email"
                className={
                  errors.email
                    ? "business-input-error"
                    : ""
                }
              />

              <div className="business-form-error">
                {errors.email && (
                  <span>{errors.email}</span>
                )}
              </div>

            </label>

            {/* =========================
                PHONE
            ========================== */}

            <label className="business-required">

              <span className="business-field-label">
                Phone{" "}
                <span aria-hidden="true">
                  *
                </span>
              </span>

              <input
                required
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => {
                  const value = formatPhone(
                    e.target.value,
                  );

                  setPhone(value);

                  setErrors((prev) => ({
                    ...prev,
                    phone: validatePhone(value),
                  }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                placeholder="Your phone number"
                autoComplete="tel"
                maxLength={10}
                className={
                  errors.phone
                    ? "business-input-error"
                    : ""
                }
              />

              <div className="business-form-error">
                {errors.phone && (
                  <span>{errors.phone}</span>
                )}
              </div>

            </label>

            {/* =========================
                MESSAGE
            ========================== */}

            <label className="business-required">

              <span className="business-field-label">
                How can we help?{" "}
                <span aria-hidden="true">
                  *
                </span>
              </span>

              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => {
                  const value = e.target.value;

                  setMessage(value);

                  setErrors((prev) => ({
                    ...prev,
                    message:
                      validateMessage(value),
                  }));
                }}
                placeholder="Tell us about your project or requirement"
                className={
                  errors.message
                    ? "business-input-error"
                    : ""
                }
              />

              <div className="business-form-error">
                {errors.message && (
                  <span>{errors.message}</span>
                )}
              </div>

            </label>

            {/* SUBMIT BUTTON */}

            <div className="business-submit-wrapper">
  <button
    className="business-btn business-btn-dark"
    type="submit"
  >
    Send Enquiry
    <ArrowRight />
  </button>
</div>
            {successMessage && (
  <div className="business-form-success">
    {successMessage}
  </div>
)}

          </motion.form>

        </div>
      </section>

      {/* =========================
          CTA
      ========================== */}

      <section className="business-section business-soft-section">

        <div className="business-container business-contact-cta">

          <div>
            <span className="business-kicker">
              WAVEXA TECHNOLOGIES
            </span>

            <h2>
              High-quality, affordable software
              development services.
            </h2>
          </div>

          <Link
            className="business-outline-btn"
            to="/business/about"
          >
            About Wavexa
            <ArrowRight />
          </Link>

        </div>

      </section>

    </div>
  );
}
