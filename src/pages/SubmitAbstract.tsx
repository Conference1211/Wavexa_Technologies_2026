import * as React from "react";
import { Helmet } from "@/components/Seo";
import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowRight,
  CheckCircle2,
  FileUp,
  Download,
  FileText,
} from "lucide-react";

import { PageHero } from "@/components/sections/Hero";
import abstractVideo from "@/assets/abstract.webm";

import {
  Section,
  Heading,
  Badge,
  Button,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/ui-kit";

import {
  ABSTRACT_PROCESS,
  TRACKS,
} from "@/constants/conference";

import { cn } from "@/lib/utils";

/* =========================================================
   FORM FIELD STYLE
   Dark + Light mode compatible
========================================================= */

const field =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/10";

/* =========================================================
   ABSTRACT FORM
========================================================= */

function AbstractForm() {
  const [sent, setSent] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);

  const [fileName, setFileName] = React.useState<string | null>(null);

  const [countryCode, setCountryCode] = React.useState("+91");

  const [abstractWordCount, setAbstractWordCount] =
    React.useState(0);

  const [errors, setErrors] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    abstract: "",
    file: "",
  });

  /* =========================================================
     VALIDATION FUNCTIONS
  ========================================================= */

  const validateName = (
    value: string,
    fieldName: string,
    required = true,
  ) => {
    if (!value.trim()) {
      return required ? `${fieldName} is required` : "";
    }

    // Only letters and spaces
    if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(value)) {
      return `${fieldName} should contain only letters and spaces`;
    }

    // Every word should start with capital letter
    const words = value.split(" ");

    const properName = words.every((word) =>
      /^[A-Z][a-z]*$/.test(word),
    );

    if (!properName) {
      return "Each word should start with a capital letter";
    }

    return "";
  };

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

  const validateAbstract = (value: string) => {
    if (!value.trim()) {
      return "Abstract is required";
    }

    const wordCount = value.trim().split(/\s+/).length;

    if (wordCount > 400) {
      return "Abstract must not exceed 400 words";
    }

    return "";
  };

  const validateFile = (file?: File) => {
    if (!file) {
      return "Please upload your abstract file";
    }

    const allowedExtensions = [
      ".pdf",
      ".doc",
      ".docx",
    ];

    const fileNameLower = file.name.toLowerCase();

    const validExtension = allowedExtensions.some((extension) =>
      fileNameLower.endsWith(extension),
    );

    if (!validExtension) {
      return "Only PDF, DOC or DOCX files are allowed";
    }

    if (file.size > 5 * 1024 * 1024) {
      return "File size must not exceed 5 MB";
    }

    return "";
  };

  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const form = e.currentTarget;

    const firstName = (
      form.elements.namedItem(
        "firstName",
      ) as HTMLInputElement
    ).value;

    const lastName = (
      form.elements.namedItem(
        "lastName",
      ) as HTMLInputElement
    ).value;

    const email = (
      form.elements.namedItem(
        "email",
      ) as HTMLInputElement
    ).value;

    const phone = (
      form.elements.namedItem(
        "phone",
      ) as HTMLInputElement
    ).value;

    const abstract = (
      form.elements.namedItem(
        "abstract",
      ) as HTMLTextAreaElement
    ).value;

    const fileInput = (
      form.elements.namedItem(
        "file",
      ) as HTMLInputElement
    );

    const file = fileInput.files?.[0];

    const consent = (
      form.elements.namedItem(
        "consent",
      ) as HTMLInputElement
    ).checked;

    const newErrors = {
      firstName: validateName(
        firstName,
        "First Name",
        true,
      ),

      lastName: validateName(
        lastName,
        "Last Name",
        false,
      ),

      email: validateEmail(email),

      phone: validatePhone(phone),

      abstract: validateAbstract(abstract),

      file: validateFile(file),
    };

    setErrors(newErrors);

    /* ---------------------------------------------------------
       CHECK CONSENT
    --------------------------------------------------------- */

    if (!consent) {
      alert(
        "Please confirm that the submitted work is unpublished and the information provided is accurate.",
      );

      return;
    }

    /* ---------------------------------------------------------
       STOP IF VALIDATION FAILS
    --------------------------------------------------------- */

    if (
      Object.values(newErrors).some(
        (error) => error !== "",
      )
    ) {
      return;
    }

    /* ---------------------------------------------------------
       FORM IS VALID
    --------------------------------------------------------- */

    setIsSending(true);

    /*
      Replace this timeout later with your actual
      backend / Firebase / API submission.
    */

    window.setTimeout(() => {
      setIsSending(false);
      setSent(true);

      /*
        Clear everything after 6 seconds
      */

      window.setTimeout(() => {
        setSent(false);

        form.reset();

        setFileName(null);

        setCountryCode("+91");

        setAbstractWordCount(0);

        setErrors({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          abstract: "",
          file: "",
        });
      }, 6000);
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        relative
        z-10
        rounded-[28px]
        border
        border-border
        bg-card
        p-6
        shadow-[0_20px_60px_-20px_rgba(7,17,31,0.18)]
        ring-1
        ring-black/[0.03]
        sm:p-8
      "
    >
      {/* =====================================================
          FORM HEADER
      ===================================================== */}

      <div className="mb-7 border-b border-border/60 pb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Abstract Submission
            </p>

            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Submit your research
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Complete the form below and upload your anonymised abstract for
              review.
            </p>
          </div>

          {/* ICON */}

          <div
            className="
              grid
              h-12
              w-12
              shrink-0
              place-items-center
              rounded-2xl
              [background-image:var(--gradient-brand)]
              text-primary-foreground
              shadow-sm
            "
          >
            <FileText className="h-5 w-5" />
          </div>
        </div>

        {/* =====================================================
            DOWNLOAD TEMPLATE
        ===================================================== */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            rounded-xl
            border
            border-primary/15
            bg-primary/[0.04]
            px-4
            py-3
          "
        >
          <span className="text-sm font-medium text-foreground">
            Download Abstract template here
          </span>

          <button
  type="button"
  onClick={() => {
    const link = document.createElement("a");
    link.href = "/abstract-template.docx";
    link.download = "Wavexa_Abstract_Submission_Template.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }}
  className="
    inline-flex
    items-center
    gap-2
    rounded-lg
    bg-primary
    px-3
    py-2
    text-xs
    font-semibold
    text-primary-foreground
    transition-transform
    hover:-translate-y-0.5
  "
>
  Download
  <Download className="h-3.5 w-3.5" />
</button>
        </div>

        <p className="mt-4 text-right text-xs text-muted-foreground">
          <span className="text-destructive">*</span> Marked fields are
          required
        </p>
      </div>

      {/* =====================================================
          FORM FIELDS
      ===================================================== */}

      <div className="grid gap-5 sm:grid-cols-2">

        {/* =====================================================
            TITLE
        ===================================================== */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            Title <span className="text-destructive">*</span>
          </span>

          <select
            required
            name="title"
            defaultValue=""
            className={field}
          >
            <option value="" disabled>
              Select Title
            </option>

            <option>Dr.</option>
            <option>Prof.</option>
            <option>Mr.</option>
            <option>Ms.</option>
            <option>Mrs.</option>
          </select>
        </label>

        {/* =====================================================
            FIRST NAME
        ===================================================== */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            First Name <span className="text-destructive">*</span>
          </span>

          <input
            required
            name="firstName"
            type="text"
            placeholder="John"
            autoComplete="given-name"
            className={cn(
              field,
              errors.firstName &&
                "border-destructive focus:border-destructive",
            )}
            onChange={(e) => {
              let value = e.target.value;

              // Remove numbers and special characters
              value = value.replace(/[^A-Za-z\s]/g, "");

              // Remove multiple spaces
              value = value.replace(/\s+/g, " ");

              // Capitalize first letter of every word
              value = value
                .toLowerCase()
                .replace(/\b[a-z]/g, (letter) =>
                  letter.toUpperCase(),
                );

              e.target.value = value;

              setErrors((prev) => ({
                ...prev,
                firstName: validateName(
                  value,
                  "First Name",
                  true,
                ),
              }));
            }}
          />

          {errors.firstName && (
            <span className="text-xs text-destructive">
              {errors.firstName}
            </span>
          )}
        </label>

        {/* =====================================================
            LAST NAME
        ===================================================== */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            Last Name
          </span>

          <input
            name="lastName"
            type="text"
            placeholder="Smith"
            autoComplete="family-name"
            className={cn(
              field,
              errors.lastName &&
                "border-destructive focus:border-destructive",
            )}
            onChange={(e) => {
              let value = e.target.value;

              // Remove numbers and special characters
              value = value.replace(/[^A-Za-z\s]/g, "");

              // Remove multiple spaces
              value = value.replace(/\s+/g, " ");

              // Capitalize first letter of every word
              value = value
                .toLowerCase()
                .replace(/\b[a-z]/g, (letter) =>
                  letter.toUpperCase(),
                );

              e.target.value = value;

              setErrors((prev) => ({
                ...prev,
                lastName: validateName(
                  value,
                  "Last Name",
                  false,
                ),
              }));
            }}
          />

          {errors.lastName && (
            <span className="text-xs text-destructive">
              {errors.lastName}
            </span>
          )}
        </label>

        {/* =====================================================
            COUNTRY
        ===================================================== */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            Country <span className="text-destructive">*</span>
          </span>

          <select
            required
            name="country"
            defaultValue=""
            className={field}
          >
            <option value="" disabled>
              Select country
            </option>

            <option>India</option>
            <option>Switzerland</option>
            <option>United Kingdom</option>
            <option>United States</option>
            <option>Germany</option>
            <option>France</option>
            <option>Singapore</option>
            <option>Australia</option>
            <option>Other</option>
          </select>
        </label>

        {/* =====================================================
            EMAIL
        ===================================================== */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            Author's Email{" "}
            <span className="text-destructive">*</span>
          </span>

          <input
            required
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            className={cn(
              field,
              errors.email &&
                "border-destructive focus:border-destructive",
            )}
            onChange={(e) => {
              let value =
                e.target.value.toLowerCase();

              // Remove invalid characters
              value = value.replace(
                /[^a-z0-9@.]/g,
                "",
              );

              e.target.value = value;

              setErrors((prev) => ({
                ...prev,
                email: validateEmail(value),
              }));
            }}
          />

          {errors.email && (
            <span className="text-xs text-destructive">
              {errors.email}
            </span>
          )}
        </label>

        {/* =====================================================
            PHONE
        ===================================================== */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            Phone Number{" "}
            <span className="text-destructive">*</span>
          </span>

          <div className="flex gap-2">

            {/* COUNTRY CODE */}

            <select
              value={countryCode}
              onChange={(e) =>
                setCountryCode(e.target.value)
              }
              className={cn(
                field,
                "w-[115px] shrink-0 cursor-pointer",
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

            {/* PHONE INPUT */}

            <div className="flex-1">
              <input
                required
                type="tel"
                name="phone"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="Phone Number"
                maxLength={15}
                className={cn(
                  field,
                  "w-full",
                  errors.phone &&
                    "border-destructive focus:border-destructive",
                )}
                onChange={(e) => {
                  let value =
                    e.target.value;

                  // Numbers only
                  value = value.replace(
                    /\D/g,
                    "",
                  );

                  // Maximum 15 digits
                  value = value.slice(0, 15);

                  e.target.value = value;

                  setErrors((prev) => ({
                    ...prev,
                    phone:
                      validatePhone(value),
                  }));
                }}
              />

              {errors.phone && (
                <span className="mt-1 block text-xs text-destructive">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>
        </label>

        {/* =====================================================
            ABSTRACT CATEGORY
        ===================================================== */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            Abstract Category{" "}
            <span className="text-destructive">*</span>
          </span>

          <select
            required
            name="category"
            defaultValue="Poster"
            className={field}
          >
            <option>Poster</option>
            <option>Oral Presentation</option>
            <option>Rapid-fire (5 min)</option>
            <option>Workshop</option>
          </select>
        </label>

        {/* =====================================================
            TRACK
        ===================================================== */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            Track Name{" "}
            <span className="text-destructive">*</span>
          </span>

          <select
            required
            name="track"
            defaultValue=""
            className={field}
          >
            <option value="" disabled>
              Please Select
            </option>

            {TRACKS.map((track) => (
              <option
                key={track.title}
                value={track.title}
              >
                {track.title}
              </option>
            ))}
          </select>
        </label>

        {/* =====================================================
            POSTAL ADDRESS
        ===================================================== */}

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-xs font-semibold text-foreground">
            Full Postal Address
          </span>

          <textarea
            name="address"
            rows={3}
            placeholder="Enter your complete postal address"
            className={cn(
              field,
              "resize-none",
            )}
          />
        </label>

        {/* =====================================================
            ABSTRACT
        ===================================================== */}

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-xs font-semibold text-foreground">
            Structured Abstract{" "}
            <span className="text-muted-foreground">
              (Maximum 400 words)
            </span>{" "}
            <span className="text-destructive">
              *
            </span>
          </span>

          <textarea
            required
            name="abstract"
            rows={7}
            placeholder="Background… Methods… Results… Conclusion…"
            className={cn(
              field,
              "resize-none",
              errors.abstract &&
                "border-destructive focus:border-destructive",
            )}
            onChange={(e) => {
              const value =
                e.target.value;

              const count = value.trim()
                ? value
                    .trim()
                    .split(/\s+/)
                    .length
                : 0;

              setAbstractWordCount(count);

              setErrors((prev) => ({
                ...prev,
                abstract:
                  validateAbstract(value),
              }));
            }}
          />

          <div className="flex items-center justify-between">
            <div>
              {errors.abstract && (
                <span className="text-xs text-destructive">
                  {errors.abstract}
                </span>
              )}
            </div>

            <span
              className={cn(
                "text-xs font-medium",
                abstractWordCount > 400
                  ? "text-destructive"
                  : "text-muted-foreground",
              )}
            >
              {abstractWordCount}/400 words
            </span>
          </div>
        </label>

        {/* =====================================================
            FILE UPLOAD
        ===================================================== */}

        <div className="sm:col-span-2">
          <p className="mb-2 text-xs font-semibold text-foreground">
            Attach your file{" "}
            <span className="text-destructive">
              *
            </span>
          </p>

          <label
            className="
              group
              flex
              cursor-pointer
              items-center
              gap-4
              rounded-2xl
              border
              border-dashed
              border-border
              bg-primary/[0.04]
              px-5
              py-5
              transition-all
              hover:border-primary/60
              hover:bg-primary/[0.07]
            "
          >
            <motion.span
              whileHover={{ y: -3 }}
              className="
                grid
                h-12
                w-12
                shrink-0
                place-items-center
                rounded-xl
                [background-image:var(--gradient-brand)]
                text-primary-foreground
              "
            >
              <FileUp className="h-5 w-5" />
            </motion.span>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {fileName ??
                  "Choose your abstract file"}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                PDF, DOC or DOCX • Maximum 5 MB •
                Anonymised file
              </p>
            </div>

            <input
              required
              type="file"
              name="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file =
                  e.target.files?.[0];

                setFileName(
                  file?.name ?? null,
                );

                setErrors((prev) => ({
                  ...prev,
                  file:
                    validateFile(file),
                }));
              }}
            />
          </label>

          {errors.file && (
            <p className="mt-2 text-xs text-destructive">
              {errors.file}
            </p>
          )}
        </div>

        {/* =====================================================
            CONSENT
        ===================================================== */}

        <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2">
          <input
            required
            type="checkbox"
            name="consent"
            className="
              mt-1
              h-4
              w-4
              rounded
              border-border
              accent-primary
            "
          />

          <span>
            I confirm that the submitted work is
            unpublished, the information provided is
            accurate, and the submission complies with
            the conference guidelines.
          </span>
        </label>
      </div>

      {/* =====================================================
          SUBMIT
      ===================================================== */}

      <div className="mt-7 flex flex-wrap items-center gap-4">

        {/* SUBMIT BUTTON */}

        <Button
          type="submit"
          size="lg"
          disabled={isSending}
          className="relative min-w-[190px] overflow-hidden"
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
                className="flex items-center gap-2"
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
                  className="
                    h-4
                    w-4
                    rounded-full
                    border-2
                    border-current
                    border-t-transparent
                  "
                />

                Submitting...
              </motion.span>
            ) : (
              <motion.span
                key="submit"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                className="flex items-center gap-2"
              >
                Submit Abstract

                <ArrowRight className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>

        {/* =====================================================
            SUCCESS MESSAGE
        ===================================================== */}

        <AnimatePresence>
          {sent && (
            <motion.div
              initial={{
                opacity: 0,
                x: -15,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.95,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-2 text-sm text-accent"
            >
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
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                }}
              >
                <CheckCircle2 className="h-5 w-5" />
              </motion.div>

              <span>
                Submission received successfully.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =====================================================
          SUCCESS PROGRESS BAR
      ===================================================== */}

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{
              opacity: 0,
              scaleX: 1,
            }}
            animate={{
              opacity: 1,
              scaleX: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 6,
              ease: "linear",
            }}
            className="
              mt-4
              h-[2px]
              w-full
              origin-left
              rounded-full
              bg-accent
            "
          />
        )}
      </AnimatePresence>
    </form>
  );
}

/* =========================================================
   SUBMISSION INSTRUCTIONS
========================================================= */

function SubmissionInstructions() {
  const instructions = [
    "Use the official abstract template before preparing your submission.",
    "Structured abstracts should not exceed 400 words.",
    "Upload an anonymised PDF or DOCX file up to 5 MB.",
    "Select the research track that best matches your work.",
    "The submitted work should be original and unpublished.",
    "Every abstract is reviewed double-blind by three independent reviewers.",
  ];

  return (
    <div className="lg:sticky lg:top-28">

      {/* =====================================================
          INSTRUCTIONS CARD
      ===================================================== */}

      <div
        className="
          rounded-[28px]
          border
          border-border
          bg-card
          p-6
          shadow-[0_20px_60px_-25px_rgba(7,17,31,0.14)]
          ring-1
          ring-black/[0.03]
          sm:p-7
        "
      >
        <Badge tone="gold">
          Submission Instructions
        </Badge>

        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground">
          Before you submit
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-foreground">
          Please review these requirements carefully
          before completing the submission form.
        </p>

        {/* INSTRUCTIONS */}

        <div className="mt-6 space-y-4">
          {instructions.map(
            (item, index) => (
              <motion.div
                key={item}
                initial={{
                  opacity: 0,
                  x: 10,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="flex items-start gap-3"
              >
                <span
                  className="
                    mt-0.5
                    grid
                    h-6
                    w-6
                    shrink-0
                    place-items-center
                    rounded-full
                    bg-accent/10
                    text-accent
                  "
                >
                  <CheckCircle2 className="h-4 w-4" />
                </span>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item}
                </p>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function SubmitAbstract() {
  return (
    <>
      <Helmet>
        <title>
          Submit an Abstract — Wavexa Technologies 2026
          Call for Papers
        </title>

        <meta
          name="description"
          content="Call for papers for Wavexa Technologies 2026 in Geneva: six research categories, double-blind review, CHF 45,000 in awards. Abstracts close 31 March 2026."
        />

        <meta
          property="og:title"
          content="Submit an Abstract — Wavexa Technologies 2026"
        />

        <meta
          property="og:description"
          content="Present your research in Geneva. Structured abstracts of up to 400 words, reviewed double-blind."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="/submit-abstract"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Submit an Abstract — Wavexa Technologies 2026"
        />

        <link
          rel="canonical"
          href="/submit-abstract"
        />
      </Helmet>

      {/* =====================================================
          HERO + VIDEO
      ===================================================== */}

      <div className="relative overflow-visible">

        <PageHero
          eyebrow="Call for papers"
          title="Present your research in"
          accent="Geneva"
          body="Wavexa Technologies 2026 accepts original work across six research categories. Every abstract is reviewed double-blind by three independent reviewers, and accepted work is published with a citable DOI."
        />

        {/* HERO VIDEO */}

        <video
          src={abstractVideo}
          autoPlay
          loop
          muted
          playsInline
          aria-label="Medical research and abstract submission"
          className="
            pointer-events-none
            absolute
            z-10
            object-contain

            right-0
            bottom-[-130px]
            w-[200px]

            sm:right-[-20px]
            sm:bottom-[-110px]
            sm:w-[300px]

            md:right-[-10px]
            md:bottom-auto
            md:top-[68%]
            md:w-[390px]

            lg:right-[4%]
            lg:top-[55%]
            lg:w-[500px]

            xl:right-[5%]
            xl:top-[55%]
            xl:w-[570px]

            -translate-y-1/2
          "
        />
      </div>

      {/* =====================================================
          SUBMISSION SECTION
      ===================================================== */}

      <Section className="pt-16 lg:pt-20">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">

          {/* LEFT — FORM */}

          <Reveal>
            <AbstractForm />
          </Reveal>

          {/* RIGHT — INSTRUCTIONS */}

          <Reveal delay={0.12}>
            <SubmissionInstructions />
          </Reveal>

        </div>
      </Section>

      {/* =====================================================
          REVIEW PROCESS
      ===================================================== */}

      <Section veil>
        <Heading
          eyebrow="Review process"
          title="How your work"
          accent="is assessed"
          align="center"
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {ABSTRACT_PROCESS.map((p) => (
            <StaggerItem key={p.step}>
              <motion.div
                whileHover={{
                  y: -8,
                }}
                className="glass gradient-border h-full rounded-3xl p-6"
              >
                <p className="numeric text-3xl font-bold text-gradient">
                  {p.step}
                </p>

                <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
                  {p.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}