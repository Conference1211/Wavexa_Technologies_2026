import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <div className="divide-y divide-border/60 overflow-hidden rounded-3xl glass gradient-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-5 px-6 py-6 text-left transition-colors hover:bg-muted/40"
            >
              <span className="numeric text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-heading text-xl font-semibold">{item.q}</span>
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
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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

const field =
  "w-full rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60";

export function ContactForm() {
  const [sent, setSent] = React.useState(false);

  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    phone: "",
  });

  const [countryCode, setCountryCode] = React.useState("+91");

  // -----------------------------
  // NAME VALIDATION
  // -----------------------------
  const validateName = (value: string) => {
    if (!value.trim()) {
      return "Full name is required";
    }

    // Only letters and single spaces
    if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(value)) {
      return "Name should contain only letters and spaces";
    }

    // Every word must start with uppercase
    const words = value.split(" ");

    const isProperName = words.every(
      (word) =>
        /^[A-Z][a-z]*$/.test(word)
    );

    if (!isProperName) {
      return "Each name should start with a capital letter";
    }

    return "";
  };

  // -----------------------------
  // EMAIL VALIDATION
  // -----------------------------
  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return "Email is required";
    }

    // Only lowercase letters, numbers, @ and .
    if (!/^[a-z0-9@.]+$/.test(value)) {
      return "Use only lowercase letters, numbers, @ and .";
    }

    // Proper email format
    if (!/^[a-z0-9]+@[a-z0-9]+(?:\.[a-z0-9]+)+$/.test(value)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  // -----------------------------
  // PHONE VALIDATION
  // -----------------------------
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

  // -----------------------------
  // NAME CHANGE
  // -----------------------------
  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value;

    // Remove numbers and special characters
    value = value.replace(/[^A-Za-z\s]/g, "");

    // Remove multiple spaces
    value = value.replace(/\s+/g, " ");

    // Automatically capitalize first letter of every word
    value = value
      .toLowerCase()
      .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

    e.target.value = value;

    setErrors((prev) => ({
      ...prev,
      name: validateName(value),
    }));
  };

  // -----------------------------
  // EMAIL CHANGE
  // -----------------------------
  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
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

  // -----------------------------
  // PHONE CHANGE
  // -----------------------------
  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
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

  // -----------------------------
  // FORM SUBMIT
  // -----------------------------
  const [isSending, setIsSending] = React.useState(false);

const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>
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

  const newErrors = {
    name: validateName(name),
    email: validateEmail(email),
    phone: validatePhone(phone),
  };

  setErrors(newErrors);

  // Stop if validation fails
  if (Object.values(newErrors).some((error) => error !== "")) {
    return;
  }

  setIsSending(true);

  // Simulate sending
  window.setTimeout(() => {
    setIsSending(false);
    setSent(true);

    // Hide success message and clear form after 6 seconds
    window.setTimeout(() => {
      setSent(false);
      form.reset();

      setErrors({
        name: "",
        email: "",
        phone: "",
      });

      setCountryCode("+91");
    }, 6000);
  }, 1000);
};
  return (
    <form
      onSubmit={handleSubmit}
      className="glass gradient-border rounded-3xl p-7 shadow-[var(--shadow-soft)]"
    >
      <div className="grid gap-4 sm:grid-cols-2">

        {/* FULL NAME */}
        <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Full name

          <input
            required
            name="name"
            type="text"
            placeholder="John Smith"
            autoComplete="name"
            className={cn(
              field,
              errors.name &&
                "border-red-500 focus:border-red-500"
            )}
            onChange={handleNameChange}
          />

          {errors.name && (
            <span className="text-xs normal-case tracking-normal text-red-500">
              {errors.name}
            </span>
          )}
        </label>

        {/* EMAIL */}
        <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Email

          <input
            required
            type="email"
            name="email"
            placeholder="john@hospital.org"
            autoComplete="email"
            className={cn(
              field,
              errors.email &&
                "border-red-500 focus:border-red-500"
            )}
            onChange={handleEmailChange}
          />

          {errors.email && (
            <span className="text-xs normal-case tracking-normal text-red-500">
              {errors.email}
            </span>
          )}
        </label>

        {/* PHONE NUMBER */}
        {/* PHONE NUMBER */}
<label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground sm:col-span-2">
  Phone number

  <div className="flex gap-2">
    {/* COUNTRY CODE */}
    <select
      value={countryCode}
      onChange={(e) => setCountryCode(e.target.value)}
      className={cn(
        field,
        "w-[120px] shrink-0 cursor-pointer"
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

    {/* PHONE INPUT + ERROR */}
    <div className="flex-1">
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
          errors.phone && "border-red-500 focus:border-red-500"
        )}
        onChange={handlePhoneChange}
      />

      {/* PHONE ERROR */}
      {errors.phone && (
        <span className="mt-1 block text-xs normal-case tracking-normal text-red-500">
          {errors.phone}
        </span>
      )}
    </div>
  </div>
</label>

        {/* MESSAGE */}
        <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground sm:col-span-2">
          Message

          <textarea
            required
            name="message"
            rows={5}
            placeholder="How can we help?"
            className={cn(field, "resize-none")}
          />
        </label>
      </div>

      {/* SUBMIT BUTTON */}
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
          
          {/* Animated Success Icon */}
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

        {/* 6-second progress animation */}
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
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

export function Newsletter() {
  const [done, setDone] = React.useState(false);
  return (
    <div className="glass-strong gradient-border relative overflow-hidden rounded-[2rem] px-7 py-12 text-center sm:px-14">
      <div aria-hidden className="pointer-events-none absolute inset-0 veil opacity-70" />
      <div className="relative">
        <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Programme drops, <span className="text-gold italic">first</span>
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          Speaker announcements, abstract deadlines and scholarship windows. One considered email a
          month.
        </p>
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
            className={cn(field, "flex-1 rounded-full bg-background/70")}
          />
          <Button type="submit" variant="gold">
            {done ? "Subscribed" : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  );
}
