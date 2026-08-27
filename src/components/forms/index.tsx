import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

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
   FORM FIELD STYLE
========================================================= */

const field =
  "w-full rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60";

/* =========================================================
   CONTACT FORM
========================================================= */

export function ContactForm() {
  const [sent, setSent] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = (form: HTMLFormElement) => {
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const newErrors: Record<string, string> = {};

    /* -------------------------------------------------------
       FULL NAME
    ------------------------------------------------------- */

    if (!name) {
      newErrors.name = "Please enter your full name.";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (!/^[a-zA-ZÀ-ÿ\s.'-]+$/.test(name)) {
      newErrors.name = "Please enter a valid name.";
    }

    /* -------------------------------------------------------
       EMAIL
    ------------------------------------------------------- */

    if (!email) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    /* -------------------------------------------------------
       PHONE
       Supports international numbers without country dropdown
    ------------------------------------------------------- */

    if (!phone) {
      newErrors.phone = "Please enter your phone number.";
    } else {
      /*
        Allowed:
        +91 9491512215
        +44 7915 642089
        +1 202 555 0123
        9491512215
        (202) 555-0123
      */

      const cleanPhone = phone.replace(/[\s().-]/g, "");

      if (!/^\+?\d+$/.test(cleanPhone)) {
        newErrors.phone = "Please enter a valid phone number.";
      } else if (cleanPhone.replace("+", "").length < 7) {
        newErrors.phone = "Phone number is too short.";
      } else if (cleanPhone.replace("+", "").length > 15) {
        newErrors.phone = "Phone number is too long.";
      }
    }

    /* -------------------------------------------------------
       MESSAGE
    ------------------------------------------------------- */

    if (!message) {
      newErrors.message = "Please enter your message.";
    } else if (message.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    return newErrors;
  };

  /* =======================================================
     CLEAR INDIVIDUAL ERROR
  ======================================================= */

  const clearError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors((previous) => ({
        ...previous,
        [fieldName]: "",
      }));
    }
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const validationErrors = validateForm(form);

    setErrors(validationErrors);

    /* Stop if validation fails */
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    /* Successful submission */
    setSent(true);

    /* Reset form */
    form.reset();

    /* Hide success message */
    window.setTimeout(() => {
      setSent(false);
    }, 4000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass gradient-border rounded-3xl p-7 shadow-[var(--shadow-soft)]"
    >
      {/* =====================================================
          FORM FIELDS
      ===================================================== */}

      <div className="grid gap-5 sm:grid-cols-2">

        {/* ===================================================
            FULL NAME
        =================================================== */}

        <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Full name

          <input
            required
            name="name"
            placeholder="Dr. Jane Ellery"
            autoComplete="name"
            className={cn(
              field,
              errors.name &&
                "border-destructive focus:border-destructive",
            )}
            onChange={() => clearError("name")}
          />

          {errors.name && (
            <span className="text-xs normal-case tracking-normal text-destructive">
              {errors.name}
            </span>
          )}
        </label>

        {/* ===================================================
            EMAIL
        =================================================== */}

        <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Email

          <input
            required
            type="email"
            name="email"
            placeholder="jane@hospital.org"
            autoComplete="email"
            className={cn(
              field,
              errors.email &&
                "border-destructive focus:border-destructive",
            )}
            onChange={() => clearError("email")}
          />

          {errors.email && (
            <span className="text-xs normal-case tracking-normal text-destructive">
              {errors.email}
            </span>
          )}
        </label>

        {/* ===================================================
            PHONE NUMBER
        =================================================== */}

        <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground sm:col-span-2">
          Phone number

          <input
            required
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Enter your phone number"
            className={cn(
              field,
              errors.phone &&
                "border-destructive focus:border-destructive",
            )}
            onChange={() => clearError("phone")}
          />

          {errors.phone && (
            <span className="text-xs normal-case tracking-normal text-destructive">
              {errors.phone}
            </span>
          )}
        </label>

        {/* ===================================================
            MESSAGE
        =================================================== */}

        <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground sm:col-span-2">
          Message

          <textarea
            required
            name="message"
            rows={5}
            placeholder="How can we help?"
            className={cn(
              field,
              "resize-none",
              errors.message &&
                "border-destructive focus:border-destructive",
            )}
            onChange={() => clearError("message")}
          />

          {errors.message && (
            <span className="text-xs normal-case tracking-normal text-destructive">
              {errors.message}
            </span>
          )}
        </label>
      </div>

      {/* =====================================================
          SUBMIT BUTTON
      ===================================================== */}

      <div className="mt-8 text-center">
        <Button
          type="submit"
          size="lg"
          className="min-w-[220px] px-8 py-3.5 text-base font-semibold"
        >
          Send message
          <Send className="h-5 w-5" />
        </Button>

        {/* ===================================================
            SUCCESS MESSAGE
        =================================================== */}

        <AnimatePresence>
          {sent ? (
            <motion.p
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
                y: -5,
              }}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-accent"
            >
              <CheckCircle2 className="h-4 w-4" />

              Thank you — our team replies within one working day.
            </motion.p>
          ) : null}
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

  return (
    <div className="glass-strong gradient-border relative overflow-hidden rounded-[2rem] px-7 py-12 text-center sm:px-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 veil opacity-70"
      />

      <div className="relative">

        {/* NEWSLETTER TITLE */}

        <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Programme drops,{" "}
          <span className="text-gold italic">first</span>
        </h3>

        {/* DESCRIPTION */}

        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          Speaker announcements, abstract deadlines and scholarship windows.
          One considered email a month.
        </p>

        {/* NEWSLETTER FORM */}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
          className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            required
            type="email"
            placeholder="you@institution.org"
            className={cn(
              field,
              "flex-1 rounded-full bg-background/70",
            )}
          />

          <Button type="submit" variant="gold">
            {done ? "Subscribed" : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  );
}