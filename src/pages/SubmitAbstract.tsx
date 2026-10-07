import * as React from "react";
import { Helmet } from "@/components/Seo";
import { motion, AnimatePresence } from "framer-motion";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase";
import {
  ArrowRight,
  CheckCircle2,
  FileUp,
  Download,
  FileText,
} from "lucide-react";

import { PageHero } from "@/components/sections/Hero";


import {
  Section,
  Heading,
  Badge,
  Button,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/ui-kit";

import { useConference } from "@/context/ConferenceContext";
import { conferencePath } from "@/data/conferences";

import { cn } from "@/lib/utils";

/* =========================================================
   FORM FIELD STYLE
   Dark + Light mode compatible
========================================================= */

const field =
  "w-full h-[46px] rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/10";

/* =========================================================
   ABSTRACT FORM
========================================================= */

function AbstractForm() {
  const conference = useConference();

  const [sent, setSent] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [countryCode, setCountryCode] = React.useState("+91");
  const [abstractWordCount, setAbstractWordCount] = React.useState(0);

  type FormErrors = Record<string, string>;

  const [errors, setErrors] = React.useState<FormErrors>({});

  /* =========================================================
     FIELD STYLES
  ========================================================= */

  const inputErrorClass =
    "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10";

  const ErrorMessage = ({ name }: { name: string }) => {
  const message = errors[name];

  return (
    <p className="mt-1.5 min-h-[18px] text-xs font-medium text-red-500">
      {message || "\u00A0"}
    </p>
  );
};

  /* =========================================================
     VALIDATION REGEX
  ========================================================= */

  const nameRegex = /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/;

  const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const phoneRegex = /^\d{7,15}$/;

  /* =========================================================
     VALIDATION FUNCTIONS
  ========================================================= */

  const validateName = (
    value: string,
    fieldName: string,
    required = true,
  ) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return required ? `${fieldName} is required.` : "";
    }

    if (!nameRegex.test(trimmedValue)) {
      return `${fieldName} must contain letters and spaces only.`;
    }

    return "";
  };

  const validateEmail = (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return "Email address is required.";
    }

    if (!emailRegex.test(trimmedValue)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const validatePhone = (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return "Phone number is required.";
    }

    if (!phoneRegex.test(trimmedValue)) {
      return "Phone number must contain 7–15 digits.";
    }

    return "";
  };

  const validateAbstract = (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return "Abstract is required.";
    }

    const wordCount = trimmedValue.split(/\s+/).length;

    if (wordCount > 400) {
      return "Abstract must not exceed 400 words.";
    }

    return "";
  };

  const validateFile = (file?: File) => {
    if (!file) {
      return "Please upload your abstract file.";
    }

    const allowedExtensions = [".pdf", ".doc", ".docx"];

    const fileNameLower = file.name.toLowerCase();

    const validExtension = allowedExtensions.some((extension) =>
      fileNameLower.endsWith(extension),
    );

    if (!validExtension) {
      return "Only PDF, DOC or DOCX files are allowed.";
    }

    if (file.size > 5 * 1024 * 1024) {
      return "File size must not exceed 5 MB.";
    }

    return "";
  };

  /* =========================================================
     FORM VALIDATION
  ========================================================= */

  const validateForm = (
    form: HTMLFormElement,
  ): FormErrors => {
    const formData = new FormData(form);

    const newErrors: FormErrors = {};

    const title =
      formData.get("title")?.toString().trim() || "";

    const firstName =
      formData.get("firstName")?.toString().trim() || "";

    const lastName =
      formData.get("lastName")?.toString().trim() || "";

    const country =
      formData.get("country")?.toString().trim() || "";

    const email =
      formData.get("email")?.toString().trim() || "";

    const phone =
      formData.get("phone")?.toString().trim() || "";

    const track =
      formData.get("track")?.toString().trim() || "";

    const abstract =
      formData.get("abstract")?.toString() || "";

    const fileInput =
      form.elements.namedItem("file") as HTMLInputElement | null;

    const file = fileInput?.files?.[0];

    /* TITLE */

    if (!title) {
      newErrors.title = "Please select your title.";
    }

    /* FIRST NAME */

    const firstNameError = validateName(
      firstName,
      "First name",
      true,
    );

    if (firstNameError) {
      newErrors.firstName = firstNameError;
    }

    /* LAST NAME - OPTIONAL */

    const lastNameError = validateName(
      lastName,
      "Last name",
      false,
    );

    if (lastNameError) {
      newErrors.lastName = lastNameError;
    }

    /* COUNTRY */

    if (!country) {
      newErrors.country = "Please select your country.";
    }

    /* EMAIL */

    const emailError = validateEmail(email);

    if (emailError) {
      newErrors.email = emailError;
    }

    /* PHONE */

    const phoneError = validatePhone(phone);

    if (phoneError) {
      newErrors.phone = phoneError;
    }

    /* TRACK */

    if (!track) {
      newErrors.track = "Please select a track.";
    }

    /* ABSTRACT */

    const abstractError = validateAbstract(abstract);

    if (abstractError) {
      newErrors.abstract = abstractError;
    }

    /* FILE */

    const fileError = validateFile(file);

    if (fileError) {
      newErrors.file = fileError;
    }

    /* CONSENT */

    const consent =
      formData.get("consent") === "on";

    if (!consent) {
      newErrors.consent =
        "Please confirm that the submitted work is unpublished and the information provided is accurate.";
    }

    return newErrors;
  };

  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (isSending) {
      return;
    }

    const form = e.currentTarget;

    setErrors({});

    /* ---------------------------------------------------------
       VALIDATE FORM
    --------------------------------------------------------- */

    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      /* -----------------------------------------------
         SCROLL + FOCUS FIRST ERROR
      ----------------------------------------------- */

      const firstErrorField =
        Object.keys(validationErrors)[0];

      setTimeout(() => {
        const element = document.querySelector(
          `[name="${firstErrorField}"]`,
        );

        element?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        if (
          element instanceof HTMLInputElement ||
          element instanceof HTMLSelectElement ||
          element instanceof HTMLTextAreaElement
        ) {
          element.focus();
        }
      }, 50);

      return;
    }

    /* ---------------------------------------------------------
       FORM IS VALID
    --------------------------------------------------------- */

    setIsSending(true);

    console.log("STEP 1: Submission started");

    try {
      const formData = new FormData(form);

      console.log("STEP 2: FormData created");

      const firstName =
        formData.get("firstName")?.toString().trim() || "";

      const lastName =
        formData.get("lastName")?.toString().trim() || "";

      const email =
        formData.get("email")?.toString().trim() || "";

      const phone =
        formData.get("phone")?.toString().trim() || "";

      const abstract =
        formData.get("abstract")?.toString() || "";

      const category =
        formData.get("category")?.toString() || "";

      const track =
        formData.get("track")?.toString() || "";

      const address =
        formData.get("address")?.toString() || "";

      const title =
        formData.get("title")?.toString() || "";

      const country =
        formData.get("country")?.toString() || "";

      const consent =
        formData.get("consent") === "on";

      const fileInput =
        form.elements.namedItem(
          "file",
        ) as HTMLInputElement;

      const file = fileInput.files?.[0];

      /* ---------------------------------------------------------
         FILE UPLOAD TEMPORARILY DISABLED
      --------------------------------------------------------- */

      // Firebase Storage upload is currently disabled
      // because Firebase Storage requires the paid pricing plan.

      // let fileUrl = "";
      // let uploadedFileName = "";

      // if (file) {
      //   uploadedFileName = file.name;

      //   const fileRef = ref(
      //     storage,
      //     `abstract-submissions/${Date.now()}-${file.name}`,
      //   );

      //   await uploadBytes(fileRef, file);
      //   fileUrl = await getDownloadURL(fileRef);
      // }

      const fileUrl = "";
      const uploadedFileName = file?.name || "";

      /* ---------------------------------------------------------
         SAVE SUBMISSION DETAILS TO FIRESTORE
      --------------------------------------------------------- */

      console.log("STEP 7: Starting Firestore save");

      await addDoc(
        collection(db, "abstractSubmissions"),
        {
          title,
          firstName,
          lastName,
          email,
          country,
          countryCode,
          phone,
          category,
          track,
          address,
          abstract,
          abstractWordCount,
          fileName: uploadedFileName,
          fileUrl,
          consent,
          status: "Submitted",
          createdAt: serverTimestamp(),
        },
      );

      console.log(
        "STEP 8: Firestore save completed",
      );

      setIsSending(false);
      setSent(true);

      console.log(
        "STEP 9: Submission successful",
      );

      /* ---------------------------------------------------------
         CLEAR FORM AFTER 6 SECONDS
      --------------------------------------------------------- */

      window.setTimeout(() => {
        setSent(false);

        form.reset();

        setFileName(null);

        setCountryCode("+91");

        setAbstractWordCount(0);

        setErrors({});
      }, 6000);
    } catch (error) {
      console.error(
        "ABSTRACT SUBMISSION ERROR:",
        error,
      );

      setIsSending(false);

      alert(
        `Submission failed:\n${
          error instanceof Error
            ? error.message
            : String(error)
        }`,
      );
    }
  };

  return (
    <form
  noValidate
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

            <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-foreground sm:text-3xl">
              Submit your research
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Complete the form below and upload your
              anonymised abstract for review.
            </p>
          </div>

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
              const link =
                document.createElement("a");

              link.href =
                "/abstract-template.docx";

              link.download =
                "Wavexa_Abstract_Submission_Template.docx";

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
          <span className="text-destructive">*</span>{" "}
          Marked fields are required
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
            Title{" "}
            <span className="text-destructive">*</span>
          </span>

          <select
            required
            name="title"
            defaultValue=""
            className={cn(
              field,
              errors.title && inputErrorClass,
            )}
            onChange={(e) => {
              const value = e.target.value;

              setErrors((prev) => ({
                ...prev,
                title: value
                  ? ""
                  : "Please select your title.",
              }));
            }}
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

          <ErrorMessage name="title" />
        </label>

        {/* =====================================================
            FIRST NAME
        ===================================================== */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            First Name{" "}
            <span className="text-destructive">*</span>
          </span>

          <input
            required
            name="firstName"
            type="text"
            placeholder="John"
            autoComplete="given-name"
            className={cn(
              field,
              errors.firstName && inputErrorClass,
            )}
            onChange={(e) => {
              let value = e.target.value;

              value = value.replace(
                /[^A-Za-zÀ-ÿ\s]/g,
                "",
              );

              value = value.replace(
                /\s{2,}/g,
                " ",
              );

              value = value
                .toLowerCase()
                .replace(
                  /\b[a-z]/g,
                  (letter) =>
                    letter.toUpperCase(),
                );

              e.target.value = value;

              setErrors((prev) => ({
                ...prev,
                firstName: value
                  ? validateName(
                      value,
                      "First name",
                      true,
                    )
                  : "",
              }));
            }}
          />

          <ErrorMessage name="firstName" />
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
              errors.lastName && inputErrorClass,
            )}
            onChange={(e) => {
              let value = e.target.value;

              value = value.replace(
                /[^A-Za-zÀ-ÿ\s]/g,
                "",
              );

              value = value.replace(
                /\s{2,}/g,
                " ",
              );

              value = value
                .toLowerCase()
                .replace(
                  /\b[a-z]/g,
                  (letter) =>
                    letter.toUpperCase(),
                );

              e.target.value = value;

              setErrors((prev) => ({
                ...prev,
                lastName: value
                  ? validateName(
                      value,
                      "Last name",
                      false,
                    )
                  : "",
              }));
            }}
          />

          <ErrorMessage name="lastName" />
        </label>

        {/* =====================================================
            COUNTRY
        ===================================================== */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            Country{" "}
            <span className="text-destructive">*</span>
          </span>

          <select
            required
            name="country"
            defaultValue=""
            className={cn(
              field,
              errors.country && inputErrorClass,
            )}
            onChange={(e) => {
              const value = e.target.value;

              setErrors((prev) => ({
                ...prev,
                country: value
                  ? ""
                  : "Please select your country.",
              }));
            }}
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

          <ErrorMessage name="country" />
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
              errors.email && inputErrorClass,
            )}
            onChange={(e) => {
              let value =
                e.target.value.toLowerCase();

              value = value.replace(
                /[^a-z0-9@.]/g,
                "",
              );

              e.target.value = value;

              setErrors((prev) => ({
                ...prev,
                email: value
                  ? validateEmail(value)
                  : "",
              }));
            }}
          />

          <ErrorMessage name="email" />
        </label>

        {/* =====================================================
            PHONE
        ===================================================== */}

        <label className="grid gap-2">
  <span className="text-xs font-semibold text-foreground">
    Phone Number{" "}
    <span className="text-destructive">*</span>
  </span>

  <div className="flex items-start gap-2">
    {/* COUNTRY CODE */}
    <select
      value={countryCode}
      onChange={(e) =>
        setCountryCode(e.target.value)
      }
      className="
        h-[46px]
        w-[105px]
        shrink-0
        rounded-xl
        border
        border-border
        bg-background
        px-2
        text-sm
        font-medium
        text-foreground
        outline-none
        transition-all
        cursor-pointer
        focus:border-primary
        focus:ring-2
        focus:ring-primary/10
      "
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
    <div className="min-w-0 flex-1">
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
          "h-[46px] w-full",
          errors.phone && inputErrorClass,
        )}
        onChange={(e) => {
          let value = e.target.value;

          value = value.replace(/\D/g, "");
          value = value.slice(0, 15);

          e.target.value = value;

          setErrors((prev) => ({
            ...prev,
            phone: value
              ? validatePhone(value)
              : "",
          }));
        }}
      />

      <ErrorMessage name="phone" />
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
    className={cn(
      field,
      "h-[46px] py-0 cursor-pointer",
    )}
  >
    <option value="Poster">Poster</option>
    <option value="Oral Presentation">
      Oral Presentation
    </option>
    <option value="Rapid-fire (5 min)">
      Rapid-fire (5 min)
    </option>
    <option value="Workshop">
      Workshop
    </option>
  </select>

  <div className="min-h-[20px]" />
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
    className={cn(
      field,
      "h-[46px] py-0 cursor-pointer",
      errors.track && inputErrorClass,
    )}
    onChange={(e) => {
      const value = e.target.value;

      setErrors((prev) => ({
        ...prev,
        track: value ? "" : "Please select a track.",
      }));
    }}
  >
    <option value="" disabled>
      Please Select
    </option>

    {conference.tracks.map((track) => (
      <option
        key={track.title}
        value={track.title}
      >
        {track.title}
      </option>
    ))}
  </select>

  <div className="min-h-[20px]">
    <ErrorMessage name="track" />
  </div>
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
                inputErrorClass,
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
                abstract: value
                  ? validateAbstract(value)
                  : "",
              }));
            }}
          />

          <div className="flex items-center justify-between">
            <div>
              <ErrorMessage name="abstract" />
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
            className={cn(
              `
                group
                flex
                cursor-pointer
                items-center
                gap-4
                rounded-2xl
                border
                border-dashed
                bg-primary/[0.04]
                px-5
                py-5
                transition-all
                hover:border-primary/60
                hover:bg-primary/[0.07]
              `,
              errors.file
                ? "border-red-500 bg-red-500/[0.03]"
                : "border-border",
            )}
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
                  file: file
                    ? validateFile(file)
                    : "",
                }));
              }}
            />
          </label>

          <ErrorMessage name="file" />
        </div>

        {/* =====================================================
            CONSENT
        ===================================================== */}

        <label
          className={cn(
            "flex items-start gap-3 text-sm sm:col-span-2",
            errors.consent
              ? "text-red-500"
              : "text-muted-foreground",
          )}
        >
          <input
            required
            type="checkbox"
            name="consent"
            className={cn(
              `
                mt-1
                h-4
                w-4
                rounded
                accent-primary
              `,
              errors.consent
                ? "border-red-500 ring-1 ring-red-500"
                : "border-border",
            )}
            onChange={(e) => {
              if (e.target.checked) {
                setErrors((prev) => ({
                  ...prev,
                  consent: "",
                }));
              }
            }}
          />

          <span>
            I confirm that the submitted work is
            unpublished, the information provided is
            accurate, and the submission complies with
            the conference guidelines.

            <ErrorMessage name="consent" />
          </span>
        </label>
      </div>

      {/* =====================================================
          SUBMIT
      ===================================================== */}

      <div className="mt-7 flex flex-wrap items-center gap-4">
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

        <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] text-foreground">
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
  const conference = useConference();
  return (
    <>
     <Helmet>
  <title>{`Submit an Abstract — ${conference.name}`}</title>

  <meta
    name="description"
    content={`Submit your research abstract for ${conference.name}, taking place on ${conference.dates}.`}
  />

  <meta
    property="og:title"
    content={`Submit an Abstract — ${conference.name}`}
  />

  <meta
    property="og:description"
    content={`Present your research at ${conference.name}. Submit your abstract and share your work with a global scientific audience.`}
  />

  <meta
    property="og:type"
    content="website"
  />

  <meta
    property="og:url"
    content={`/conferences/${conference.id}/submit-abstract`}
  />

  <meta
    name="twitter:card"
    content="summary_large_image"
  />

  <meta
    name="twitter:title"
    content={`Submit an Abstract — ${conference.name}`}
  />

  <meta
    name="twitter:description"
    content={`Submit your research abstract for ${conference.name}.`}
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
  title="Present your research to"
  accent="a global audience"
  body="Wavexa Technologies 2026 welcomes original research across key areas of diabetes, cardiology and cardiometabolic health. Share your findings with an international audience and contribute to meaningful scientific exchange."
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
        <div className="text-center">
          <p className="mx-auto inline-flex items-center rounded-full border border-primary/20 bg-primary/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Review process
          </p>

          <h2 className="mt-6 text-4xl font-bold tracking-[-0.035em] text-foreground sm:text-5xl">
            How your work{" "}
            <span className="text-accent">is assessed</span>
          </h2>
        </div>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {conference.abstractProcess.map((p) => (
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

                <h3 className="mt-3 font-sans text-lg font-semibold text-foreground">
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