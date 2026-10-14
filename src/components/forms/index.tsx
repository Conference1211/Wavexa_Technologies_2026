
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui-kit";
import { cn } from "@/lib/utils";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

/* =========================================================
   SHARED EMAIL VALIDATION
========================================================= */


const validateEmail = (value: string): string => {
  const email = value.trim();

  if (!email) {
    return "Email is required";
  }

  if (/\s/.test(email)) {
    return "Email must not contain spaces";
  }

  const emailRegex =
    /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  // Declare localPart and domain before using them
  const parts = email.split("@");

  if (parts.length !== 2) {
    return "Please enter a valid email address";
  }

  
const localPart = parts[0] ?? "";
const domain = parts[1] ?? "";


  if (
    email.length > 254 ||
    localPart.length > 64 ||
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    localPart.includes("..") ||
    domain.includes("..")
  ) {
    return "Please enter a valid email address";
  }

  const extension = domain.split(".").pop() ?? "";

  if (extension.length < 2) {
    return "Please enter a valid email address";
  }

  return "";
};



/* =========================================================
   SHARED FIELD STYLE
========================================================= */

const field =
  "w-full h-[46px] rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60";

/* =========================================================
   SHARED ERROR STYLE
========================================================= */

const errorText =
  "block text-xs normal-case tracking-normal text-red-500";

/* =========================================================
   FAQ ACCORDION
========================================================= */

export function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <div className="divide-y divide-border/60 overflow-hidden rounded-3xl glass gradient-border">
      {items.map((item, i) => {
        const isOpen = open === i;

        return (
          <div key={item.q}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-5 px-6 py-6 text-left transition-colors hover:bg-muted/40"
            >
              <span className="numeric text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="flex-1 font-heading text-xl font-semibold">
                {item.q}
              </span>

              <Plus
                className={cn(
                  "h-5 w-5 shrink-0 text-accent transition-transform duration-300",
                  isOpen && "rotate-45",
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 pl-[4.4rem] text-[15px] leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   CONTACT FORM
========================================================= */

export function ContactForm() {
  const [sent, setSent] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState("+91");

  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  /* ---------------------------------------------------------
     NAME VALIDATION
  --------------------------------------------------------- */

  const validateName = (value: string): string => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "Full name is required";
    }

    if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(trimmed)) {
      return "Name should contain only letters and spaces";
    }

    const words = trimmed.split(/\s+/);

    const isProperName = words.every((word) =>
      /^[A-Z][a-z]*$/.test(word),
    );

    if (!isProperName) {
      return "Each name should start with a capital letter";
    }

    return "";
  };

  /* ---------------------------------------------------------
     PHONE VALIDATION
  --------------------------------------------------------- */

  const validatePhone = (value: string): string => {
    if (!value.trim()) {
      return "Phone number is required";
    }

    if (!/^[0-9]+$/.test(value)) {
      return "Phone number should contain only numbers";
    }

    if (value.length < 7 || value.length > 15) {
      return "Phone number must contain 7–15 digits";
    }

    return "";
  };

  /* ---------------------------------------------------------
     MESSAGE VALIDATION
  --------------------------------------------------------- */

  const validateMessage = (value: string): string => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "Message is required";
    }

    if (trimmed.length < 10) {
      return "Message must contain at least 10 characters";
    }

    return "";
  };

  /* ---------------------------------------------------------
     NAME CHANGE
  --------------------------------------------------------- */

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value;

    value = value.replace(/[^A-Za-z\s]/g, "");
    value = value.replace(/\s+/g, " ");

    value = value
      .toLowerCase()
      .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

    e.target.value = value;

    setErrors((prev) => ({
      ...prev,
      name: validateName(value),
    }));
  };

  /* ---------------------------------------------------------
     EMAIL CHANGE
  --------------------------------------------------------- */

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.toLowerCase();

    e.target.value = value;

    setErrors((prev) => ({
      ...prev,
      email: validateEmail(value),
    }));
  };

  /* ---------------------------------------------------------
     PHONE CHANGE
  --------------------------------------------------------- */

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");
    value = value.slice(0, 15);

    e.target.value = value;

    setErrors((prev) => ({
      ...prev,
      phone: validatePhone(value),
    }));
  };

  /* ---------------------------------------------------------
     MESSAGE CHANGE
  --------------------------------------------------------- */

  const handleMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;

    setErrors((prev) => ({
      ...prev,
      message: validateMessage(value),
    }));
  };

  /* ---------------------------------------------------------
     FORM SUBMIT
  --------------------------------------------------------- */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (isSending) {
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      phone: validatePhone(phone),
      message: validateMessage(message),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    setIsSending(true);

    try {
      await addDoc(collection(db, "contactMessages"), {
        name,
        email,
        countryCode,
        phone,
        message,
        createdAt: serverTimestamp(),
      });

      setSent(true);
      form.reset();

      setErrors({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setCountryCode("+91");

      window.setTimeout(() => {
        setSent(false);
      }, 6000);
    } catch (error) {
      console.error("Error saving contact message:", error);

      alert(
        "Unable to send your message right now. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  };

  /* ---------------------------------------------------------
     CONTACT FORM UI
  --------------------------------------------------------- */

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="glass gradient-border rounded-3xl p-7 shadow-[var(--shadow-soft)]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {/* FULL NAME */}

        <div className="grid gap-2">
          <label
            htmlFor="contact-name"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            Full name <span className="text-red-500">*</span>
          </label>

          <input
            required
            id="contact-name"
            name="name"
            type="text"
            placeholder="John Smith"
            autoComplete="name"
            maxLength={100}
            className={cn(
              field,
              errors.name &&
                "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10",
            )}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={
              errors.name ? "contact-name-error" : undefined
            }
            onChange={handleNameChange}
          />

          <div className="min-h-5">
            {errors.name && (
              <span id="contact-name-error" className={errorText}>
                {errors.name}
              </span>
            )}
          </div>
        </div>

        {/* EMAIL */}

        <div className="grid gap-2">
          <label
            htmlFor="contact-email"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            Email <span className="text-red-500">*</span>
          </label>

          <input
            required
            id="contact-email"
            type="email"
            name="email"
            placeholder="john@hospital.org"
            autoComplete="email"
            maxLength={254}
            className={cn(
              field,
              errors.email &&
                "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10",
            )}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? "contact-email-error" : undefined
            }
            onChange={handleEmailChange}
          />

          <div className="min-h-5">
            {errors.email && (
              <span id="contact-email-error" className={errorText}>
                {errors.email}
              </span>
            )}
          </div>
        </div>

        {/* PHONE NUMBER */}

        <div className="grid gap-2 sm:col-span-2">
          <label
            htmlFor="contact-phone"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            Phone number <span className="text-red-500">*</span>
          </label>

          <div className="flex items-start gap-2">
            <div className="w-[105px] shrink-0">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className={cn(
                  field,
                  "h-[46px] w-full cursor-pointer px-2 py-0",
                )}
                aria-label="Country code"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+65">🇸🇬 +65</option>
                <option value="+60">🇲🇾 +60</option>
                <option value="+64">🇳🇿 +64</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+39">🇮🇹 +39</option>
                <option value="+34">🇪🇸 +34</option>
                <option value="+81">🇯🇵 +81</option>
                <option value="+82">🇰🇷 +82</option>
                <option value="+86">🇨🇳 +86</option>
                <option value="+7">🇷🇺 +7</option>
                <option value="+55">🇧🇷 +55</option>
                <option value="+27">🇿🇦 +27</option>
              </select>
              <div className="min-h-5" />
            </div>

            <div className="min-w-0 flex-1">
              <input
                required
                id="contact-phone"
                type="tel"
                name="phone"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="Enter phone number"
                maxLength={15}
                className={cn(
                  field,
                  "w-full",
                  errors.phone &&
                    "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10",
                )}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={
                  errors.phone ? "contact-phone-error" : undefined
                }
                onChange={handlePhoneChange}
              />

              <div className="min-h-5">
                {errors.phone && (
                  <span id="contact-phone-error" className={errorText}>
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MESSAGE */}

        <div className="grid gap-2 sm:col-span-2">
          <label
            htmlFor="contact-message"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
          >
            Message <span className="text-red-500">*</span>
          </label>

          <textarea
            required
            id="contact-message"
            name="message"
            rows={5}
            maxLength={5000}
            placeholder="How can we help?"
            className={cn(
              field,
              "h-auto resize-none",
              errors.message &&
                "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10",
            )}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            onChange={handleMessageChange}
          />

          <div className="min-h-5">
            {errors.message && (
              <span id="contact-message-error" className={errorText}>
                {errors.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}

      <div className="mt-7 text-center">
        <Button
          type="submit"
          size="lg"
          disabled={isSending}
          className="relative min-w-[180px] overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isSending ? (
              <motion.span
                key="sending"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center justify-center gap-2"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                />
                Sending...
              </motion.span>
            ) : (
              <motion.span
                key="send"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2"
              >
                Send message
                <Send className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>

        {/* SUCCESS MESSAGE */}

        <AnimatePresence>
          {sent && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              role="status"
              className="mt-5"
            >
              <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-accent/20 bg-accent/5 px-5 py-4 text-left">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 12,
                  }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10"
                >
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                </motion.div>

                <div>
                  <motion.p
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="font-medium"
                  >
                    Message sent successfully!
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="mt-1 text-xs text-muted-foreground"
                  >
                    Thank you — our team will get back to you shortly.
                  </motion.p>
                </div>
              </div>

              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 6, ease: "linear" }}
                className="mx-auto mt-3 h-[2px] max-w-md origin-left rounded-full bg-accent"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

/* =========================================================
   NEWSLETTER
========================================================= */

export function Newsletter() {
  const [done, setDone] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  /* ---------------------------------------------------------
     EMAIL CHANGE
  --------------------------------------------------------- */

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.toLowerCase();

    setEmail(value);
    setError(validateEmail(value));
  };

  /* ---------------------------------------------------------
     NEWSLETTER SUBMIT
  --------------------------------------------------------- */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (isSending) {
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailError = validateEmail(normalizedEmail);

    setError(emailError);

    if (emailError) {
      return;
    }

    setIsSending(true);

    try {
      await addDoc(collection(db, "newsletterSubscriptions"), {
        email: normalizedEmail,
        createdAt: serverTimestamp(),
      });

      setDone(true);
      setEmail("");
      setError("");

      window.setTimeout(() => {
        setDone(false);
      }, 6000);
    } catch (error) {
      console.error("Error saving newsletter subscription:", error);

      setError(
        "Unable to subscribe right now. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  };

  /* ---------------------------------------------------------
     NEWSLETTER UI
  --------------------------------------------------------- */

  return (
    <div className="glass-strong gradient-border relative overflow-hidden rounded-[2rem] px-7 py-12 text-center sm:px-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 veil opacity-70"
      />

      <div className="relative">
        <h3 className="text-3xl font-bold leading-[1.08] tracking-[-0.035em] sm:text-4xl">
          Programme drops,{" "}
          <span className="text-gold">first</span>
        </h3>

        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          Speaker announcements, abstract deadlines and scholarship
          windows. One considered email a month.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-7 flex max-w-md flex-col items-center gap-2 sm:flex-row sm:items-start"
        >
          <div className="w-full flex-1">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>

            <input
              required
              id="newsletter-email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@institution.org"
              autoComplete="email"
              maxLength={254}
              aria-invalid={Boolean(error)}
              aria-describedby={
                error ? "newsletter-email-error" : undefined
              }
              className={cn(
                field,
                "w-full rounded-full bg-background/70",
                error &&
                  "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10",
              )}
            />

            <div className="mt-1 min-h-5 text-left">
              {error && (
                <span
                  id="newsletter-email-error"
                  className="block px-2 text-xs text-red-500"
                >
                  {error}
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            disabled={isSending}
            className="shrink-0"
          >
            {isSending
              ? "Subscribing..."
              : done
                ? "Subscribed"
                : "Subscribe"}
          </Button>
        </form>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              role="status"
              className="mt-3 text-sm font-medium text-accent"
            >
              Successfully subscribed to our newsletter!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
