
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
              {isOpen ? (
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
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   COMMON FIELD STYLE
========================================================= */

const field =
  "w-full h-[46px] rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60";

/* =========================================================
   CONTACT FORM
========================================================= */

export function ContactForm() {
  const [sent, setSent] = React.useState(false);

  const [isSending, setIsSending] = React.useState(false);

  const [countryCode, setCountryCode] =
    React.useState("+91");

  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  /* =======================================================
     NAME VALIDATION
  ======================================================= */

  const validateName = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Full name is required";
  }

  if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(trimmed)) {
    return "Name should contain only letters and spaces";
  }

  const words = trimmed.split(" ");

  const isProperName = words.every(
    (word) => /^[A-Z][a-z]*$/.test(word),
  );

  if (!isProperName) {
    return "Each name should start with a capital letter";
  }

  return "";
};

  /* =======================================================
     EMAIL VALIDATION
  ======================================================= */

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

  /* =======================================================
     PHONE VALIDATION
  ======================================================= */

  const validatePhone = (value: string) => {
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

  /* =======================================================
     MESSAGE VALIDATION
  ======================================================= */

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

  /* =======================================================
     NAME CHANGE
  ======================================================= */

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value;

    // Remove numbers and special characters
    value = value.replace(/[^A-Za-z\s]/g, "");

    // Remove multiple spaces
    value = value.replace(/\s+/g, " ");

    // Automatically capitalize first letter of every word
    value = value
      .toLowerCase()
      .replace(/\b[a-z]/g, (letter) =>
        letter.toUpperCase(),
      );

    e.target.value = value;

    setErrors((prev) => ({
      ...prev,
      name: validateName(value),
    }));
  };

  /* =======================================================
     EMAIL CHANGE
  ======================================================= */

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value;

    // Convert uppercase to lowercase
    value = value.toLowerCase();

    // Remove invalid characters
    value = value.replace(/[^a-z0-9@.]/g, "");

    e.target.value = value;

    setErrors((prev) => ({
      ...prev,
      email: validateEmail(value),
    }));
  };

  /* =======================================================
     PHONE CHANGE
  ======================================================= */

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value;

    // Numbers only
    value = value.replace(/\D/g, "");

    // Maximum 15 digits
    value = value.slice(0, 15);

    e.target.value = value;

    setErrors((prev) => ({
      ...prev,
      phone: validatePhone(value),
    }));
  };

  /* =======================================================
     FORM SUBMIT
  ======================================================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value;

    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value;

    const phone = (
      form.elements.namedItem("phone") as HTMLInputElement
    ).value;

    const message = (
      form.elements.namedItem(
        "message",
      ) as HTMLTextAreaElement
    ).value;

    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      phone: validatePhone(phone),
      message: validateMessage(message),
    };

    setErrors(newErrors);

    /* Stop submission if validation fails */
    if (
      Object.values(newErrors).some(
        (error) => error !== "",
      )
    ) {
      return;
    }

    setIsSending(true);

    try {
      await addDoc(collection(db, "contactMessages"), {
        name: name.trim(),
        email: email.trim(),
        countryCode,
        phone: phone.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });

      /* Success */
      setSent(true);

      /* Reset form */
      form.reset();

      setErrors({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setCountryCode("+91");

      /* Hide success message after 6 seconds */
      window.setTimeout(() => {
        setSent(false);
      }, 6000);
    } catch (error) {
      console.error(
        "Error saving contact message:",
        error,
      );

      alert(
        "Unable to send your message right now. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="glass gradient-border rounded-3xl p-7 shadow-[var(--shadow-soft)]"
    >
      <div className="grid gap-4 sm:grid-cols-2">

        {/* =================================================
            FULL NAME
        ================================================= */}

        <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
  <label className="grid gap-2">
  <span className="text-xs font-semibold text-foreground">
    Full name <span className="text-red-500">*</span>
  </span>
</label>

  <input
    required
    name="name"
    type="text"
    placeholder="John Smith"
    autoComplete="name"
    className={cn(
      field,
      errors.name &&
        "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10",
    )}
    onChange={handleNameChange}
  />

  <div className="min-h-5">
  {errors.name && (
    <span className="block text-xs normal-case tracking-normal text-red-500">
      {errors.name}
    </span>
  )}
</div>
</label>

        {/* =================================================
            EMAIL
        ================================================= */}

        <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
  <label className="grid gap-2">
  <span className="text-xs font-semibold text-foreground">
    EMAIL <span className="text-red-500">*</span>
  </span>
</label>

  <input
    required
    type="email"
    name="email"
    placeholder="john@hospital.org"
    autoComplete="email"
    className={cn(
      field,
      errors.email &&
        "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10",
    )}
    onChange={handleEmailChange}
  />

  <div className="min-h-5">
    {errors.email && (
      <span className="block text-xs normal-case tracking-normal text-red-500">
        {errors.email}
      </span>
    )}
  </div>
</label>

        {/* =================================================
            PHONE NUMBER
        ================================================= */}

        <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground sm:col-span-2">
  <label className="grid gap-2">
  <span className="text-xs font-semibold text-foreground">
    PHONE NUMBER <span className="text-red-500">*</span>
  </span>
</label>

  <div className="flex items-start gap-2">

    {/* COUNTRY CODE */}
    <div className="w-[105px] shrink-0">
      <select
        value={countryCode}
        onChange={(e) =>
          setCountryCode(e.target.value)
        }
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

      {/* RESERVED SPACE */}
      <div className="min-h-5" />
    </div>

    {/* PHONE INPUT */}
    <div className="min-w-0 flex-1">
      <input
        required
        type="tel"
        name="phone"
        inputMode="numeric"
        autoComplete="tel"
        placeholder="Enter phone number"
        maxLength={15}
        className={cn(
          field,
          "w-full",
          errors.phone &&
            "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10",
        )}
        onChange={handlePhoneChange}
      />

      <div className="min-h-5">
        {errors.phone && (
          <span className="block text-xs normal-case tracking-normal text-red-500">
            {errors.phone}
          </span>
        )}
      </div>
    </div>

  </div>
</label>

        {/* =================================================
            MESSAGE
        ================================================= */}

        <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground sm:col-span-2">
  <label className="grid gap-2">
  <span className="text-xs font-semibold text-foreground">
    MESSAGE <span className="text-red-500">*</span>
  </span>
</label>

  <textarea
    required
    name="message"
    rows={5}
    placeholder="How can we help?"
    className={cn(
      field,
      "h-auto resize-none",
      errors.message &&
        "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10",
    )}
    onChange={(e) => {
      setErrors((prev) => ({
        ...prev,
        message: validateMessage(e.target.value),
      }));
    }}
  />

  <div className="min-h-5">
    {errors.message && (
      <span className="block text-xs normal-case tracking-normal text-red-500">
        {errors.message}
      </span>
    )}
  </div>
</label>

      </div>

      {/* =================================================
          SUBMIT BUTTON
      ================================================= */}

      <div className="mt-7 text-center">

        <Button
          type="submit"
          size="lg"
          disabled={isSending}
          className="relative min-w-[180px] overflow-hidden"
        >
          <AnimatePresence mode="wait">

            {isSending ? (
              <motion.span
                key="sending"
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                }}
                className="flex items-center justify-center gap-2"
              >
                <motion.span
                  animate={{
                    rotate: 360,
                  }}
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

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        <AnimatePresence>
          {sent && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -15,
                scale: 0.95,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5"
            >
              <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-accent/20 bg-accent/5 px-5 py-4 text-left">

                {/* SUCCESS ICON */}

                <motion.div
                  initial={{
                    scale: 0,
                    rotate: -45,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                  }}
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
                    initial={{
                      opacity: 0,
                      x: -8,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.25,
                    }}
                    className="font-medium"
                  >
                    Message sent successfully!
                  </motion.p>

                  <motion.p
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.35,
                    }}
                    className="mt-1 text-xs text-muted-foreground"
                  >
                    Thank you — our team will get back to you shortly.
                  </motion.p>

                </div>
              </div>

              {/* 6 SECOND PROGRESS BAR */}

              <motion.div
                initial={{
                  scaleX: 1,
                }}
                animate={{
                  scaleX: 0,
                }}
                transition={{
                  duration: 6,
                  ease: "linear",
                }}
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

  const validateEmail = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "Email is required";
    }

    if (!/^[a-z0-9@.]+$/.test(trimmed)) {
      return "Use only lowercase letters, numbers, @ and .";
    }

    if (!/^[a-z0-9]+@[a-z0-9]+(?:\.[a-z0-9]+)+$/.test(trimmed)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let value = e.target.value.toLowerCase();

    value = value.replace(/[^a-z0-9@.]/g, "");

    setEmail(value);
    setError(validateEmail(value));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    setError(emailError);

    if (emailError) {
      return;
    }

    setIsSending(true);

    try {
      await addDoc(collection(db, "newsletterSubscriptions"), {
        email: email.trim(),
        createdAt: serverTimestamp(),
      });

      setDone(true);
      setEmail("");
      setError("");

      window.setTimeout(() => {
        setDone(false);
      }, 6000);
    } catch (error) {
      console.error(
        "Error saving newsletter subscription:",
        error,
      );

      setError(
        "Unable to subscribe right now. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="glass-strong gradient-border relative overflow-hidden rounded-[2rem] px-7 py-12 text-center sm:px-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 veil opacity-70"
      />

      <div className="relative">
        <h3 className="text-3xl font-bold leading-[1.08] tracking-[-0.035em] sm:text-4xl">
          Programme drops,{" "}
          <span className="text-gold">
            first
          </span>
        </h3>

        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          Speaker announcements, abstract deadlines and scholarship windows. One considered email a month.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-7 flex max-w-md flex-col items-center gap-2 sm:flex-row sm:items-start"
        >
          <div className="w-full flex-1">
            <input
              required
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@institution.org"
              className={cn(
                field,
                "w-full rounded-full bg-background/70",
                error &&
                  "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10",
              )}
            />

            <div className="min-h-5 mt-1 text-left">
              {error && (
                <span className="block px-2 text-xs text-red-500">
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

        {done && (
          <div className="mt-3 text-sm font-medium text-accent">
            Successfully subscribed to our newsletter!
          </div>
        )}
      </div>
    </div>
  );
}