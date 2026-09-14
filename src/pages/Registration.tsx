import * as React from "react";

import { Helmet } from "@/components/Seo";
import { motion } from "framer-motion";
import registerImage from "@/assets/register1.png";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import {

  ArrowRight,
  Check,
  ChevronDown,
  CreditCard,
  FileCheck2,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Building2,
} from "lucide-react";

import { PageHero } from "@/components/sections/Hero";

import {
  Section,
  Heading,
  Reveal,
  Button,
} from "@/components/ui-kit";

import { cn } from "@/lib/utils";

import {
  TICKETS,
  REGISTRATION_DEADLINES,
} from "@/constants/conference";

/* =========================================================
   TYPES
========================================================= */

type Currency = "EUR" | "USD" | "GBP";

type RegistrationPeriod =
  | "earlyBird"
  | "standard"
  | "final";

type FormErrors = Record<string, string>;

/* =========================================================
   COUNTRIES
========================================================= */

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Australia",
  "Canada",
  "Germany",
  "France",
  "Switzerland",
  "Singapore",
  "Malaysia",
  "Saudi Arabia",
  "South Africa",
  "Japan",
  "China",
  "Other",
];

/* =========================================================
   SHARED STYLE TOKENS
========================================================= */

const inputCls =
  "w-full rounded-xl border border-border/70 bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors duration-150 placeholder:text-muted-foreground/70 focus:border-primary/60 focus:ring-2 focus:ring-primary/10";

const labelCls =
  "mb-1.5 block text-sm font-medium text-foreground";

const errorCls =
  "border-red-500 focus:border-red-500 focus:ring-red-500/10";

const brandGradientCls =
  "[background-image:var(--gradient-brand)]";

const sectionEyebrowCls =
  "text-xs font-semibold text-primary";

/* =========================================================
   VALIDATION
========================================================= */

const nameRegex = /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/;
const phoneRegex = /^\d{7,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const institutionRegex = /^[A-Za-zÀ-ÿ0-9\s&.,'()/-]{2,100}$/;
const addressRegex = /^[A-Za-zÀ-ÿ0-9\s.,#'()/-]{5,250}$/;

/* =========================================================
   HELPERS
========================================================= */

const cleanValue = (value: FormDataEntryValue | null): string =>
  typeof value === "string" ? value.trim() : "";

const getField = (formData: FormData, name: string): string =>
  cleanValue(formData.get(name));

const currencySymbols: Record<Currency, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

const periodLabels: Record<RegistrationPeriod, string> = {
  earlyBird: "Early Bird Registration",
  standard: "Standard Registration",
  final: "Final Registration",
};
const registrationEndDates: Record<RegistrationPeriod, Date> = {
  earlyBird: new Date("2026-09-30T23:59:59"),
  standard: new Date("2026-11-05T23:59:59"),
  final: new Date("2026-11-18T23:59:59"),
};
const isPeriodAvailable = (period: RegistrationPeriod): boolean => {
  const now = new Date();
  return now <= registrationEndDates[period];
};

/* =========================================================
   STATIC CONTENT — SIDEBAR
========================================================= */

const eligibilityItems = [
  {
    title: "Presenting Author Registration",
    description:
      "Required for accepted oral, panel, and poster presenters. Registration confirms program inclusion.",
  },
  {
    title: "Professional Delegate Registration",
    description:
      "For clinicians, researchers, faculty, public health professionals, and policy leaders seeking full congress access.",
  },
  {
    title: "Emerging Scholar Registration",
    description:
      "For doctoral candidates and early-career professionals (≤5 years post-degree). Verification may be requested.",
  },
  {
    title: "Institutional Group Registration",
    description:
      "For institutions registering five (5) or more participants under a consolidated participation structure.",
  },
];

const registrationIncludes = [
  "Access to the conference scientific sessions",
  "Conference participation certificate",
  "Access to conference materials",
  "Scientific presentations and discussions",
  "Networking opportunities",
  "Digital conference resources",
];

const registrationPolicies = [
  "All registrations are non-transferable unless formally approved by the Secretariat.",
  "Program inclusion for presenters requires completed registration.",
  "Access credentials will be issued electronically prior to the congress.",
  "Institutional packages are subject to confirmation.",
];

/* =========================================================
   COMPONENT
========================================================= */


export default function Registration() {
  /* =======================================================
     CURRENCY
  ======================================================= */

  const [currency, setCurrency] = React.useState<Currency>("EUR");
  const currencySymbol = currencySymbols[currency];

  /* =======================================================
     REGISTRATION SELECTION
     Starts empty — the participant must actively choose.
  ======================================================= */

  const getDefaultPeriod = (): RegistrationPeriod => {
  if (isPeriodAvailable("earlyBird")) return "earlyBird";
  if (isPeriodAvailable("standard")) return "standard";
  return "final";
};

const [selectedPeriod, setSelectedPeriod] =
  React.useState<RegistrationPeriod>(getDefaultPeriod);

  const [selectedCategory, setSelectedCategory] =
    React.useState("");

  const [selectedOptionName, setSelectedOptionName] =
    React.useState("");

  /* =======================================================
     FORM STATE
  ======================================================= */

  const [confirmed, setConfirmed] = React.useState(false);
  const [agreed, setAgreed] = React.useState(false);
  const [sameBilling, setSameBilling] = React.useState(true);
  const [errors, setErrors] = React.useState<FormErrors>({});
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const ErrorMessage = ({ name }: { name: string }) => {
  const message = errors[name];

  if (!message) {
    return null;
  }

  return (
    <p className="mt-1.5 text-xs font-medium text-red-500">
      {message}
    </p>
  );
};

  /* =======================================================
     DERIVED SELECTION
  ======================================================= */

  const currentCategory = TICKETS.find(
    (category) => category.category === selectedCategory
  );

  const currentOption = currentCategory?.options.find(
    (option) => option.name === selectedOptionName
  );

  const hasSelection = Boolean(currentOption);

  const currentPrice = currentOption
    ? currentOption.prices[selectedPeriod][currency]
    : undefined;

  const formattedPrice =
    currentPrice !== undefined
      ? `${currencySymbol}${currentPrice.toFixed(2)}`
      : null;

  const selectedPeriodLabel = periodLabels[selectedPeriod];

  /* =======================================================
     SCROLL TO FORM
  ======================================================= */

  const scrollToForm = () => {
    setTimeout(() => {
      document
        .getElementById("registration-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  /* =======================================================
     CLEAR REGISTRATION ERRORS
  ======================================================= */

  const clearRegistrationErrors = () => {
    setErrors((previous) => {
      const next = { ...previous };
      delete next.registrationCategory;
      delete next.registrationOption;
      return next;
    });
  };

  /* =======================================================
     CATEGORY CHANGE
     Resets the option — never auto-selects the first one.
  ======================================================= */

  const handleCategoryChange = (categoryName: string) => {
    const category = TICKETS.find(
      (item) => item.category === categoryName
    );

    if (!category) {
      setSelectedCategory("");
      setSelectedOptionName("");
      return;
    }

    setSelectedCategory(category.category);
    setSelectedOptionName("");
    setConfirmed(false);
    clearRegistrationErrors();
  };

  /* =======================================================
     OPTION CHANGE
  ======================================================= */

  const handleOptionChange = (optionName: string) => {
    const option = currentCategory?.options.find(
      (item) => item.name === optionName
    );

    if (!option) {
      return;
    }

    setSelectedOptionName(option.name);
    setConfirmed(false);

    setErrors((previous) => {
      const next = { ...previous };
      delete next.registrationOption;
      return next;
    });
  };

  /* =======================================================
     PERIOD CHANGE
  ======================================================= */

  const handlePeriodChange = (period: RegistrationPeriod) => {
    setSelectedPeriod(period);
    setConfirmed(false);
  };

  /* =======================================================
     PRICING TABLE SELECTION
  ======================================================= */

  const handlePricingOptionSelect = (
    category: string,
    optionName: string,
    period: RegistrationPeriod
  ) => {
    setSelectedCategory(category);
    setSelectedOptionName(optionName);
    setSelectedPeriod(period);
    setConfirmed(false);
    clearRegistrationErrors();
    scrollToForm();
  };

  /* =======================================================
     VALIDATE FORM
  ======================================================= */

  const validateForm = (form: HTMLFormElement): FormErrors => {
    const formData = new FormData(form);
    const newErrors: FormErrors = {};

    const title = getField(formData, "title");
    const designation = getField(formData, "designation");
    const firstName = getField(formData, "firstName");
    const lastName = getField(formData, "lastName");
    const email = getField(formData, "email");
    const phone = getField(formData, "phone");
    const institution = getField(formData, "institution");
    const country = getField(formData, "country");
    const city = getField(formData, "city");
    const address = getField(formData, "address");

    if (!title) {
      newErrors.title = "Please select your title.";
    }

    if (!designation) {
      newErrors.designation = "Designation is required.";
    } else if (!nameRegex.test(designation)) {
      newErrors.designation =
        "Designation must contain letters and spaces only.";
    }

    if (!firstName) {
      newErrors.firstName = "First name is required.";
    } else if (!nameRegex.test(firstName)) {
      newErrors.firstName =
        "First name must contain letters and spaces only.";
    } else if (firstName.length < 2) {
      newErrors.firstName =
        "First name must contain at least 2 characters.";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required.";
    } else if (!nameRegex.test(lastName)) {
      newErrors.lastName =
        "Last name must contain letters and spaces only.";
    } else if (lastName.length < 2) {
      newErrors.lastName =
        "Last name must contain at least 2 characters.";
    }

    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Phone number must contain numbers only.";
    }

    if (!institution) {
      newErrors.institution =
        "Institution / Organization is required.";
    } else if (!institutionRegex.test(institution)) {
      newErrors.institution =
        "Please enter a valid institution or organization name.";
    }

    if (!country) {
      newErrors.country = "Please select your country.";
    }

    if (!city) {
      newErrors.city = "City is required.";
    } else if (!nameRegex.test(city)) {
      newErrors.city = "City must contain letters and spaces only.";
    }

    if (!address) {
      newErrors.address = "Address is required.";
    } else if (!addressRegex.test(address)) {
      newErrors.address = "Please enter a valid address.";
    }

    if (!selectedCategory) {
      newErrors.registrationCategory =
        "Please select a registration category.";
    }

    if (!selectedOptionName) {
      newErrors.registrationOption =
        "Please select a registration option.";
    }

    if (!sameBilling) {
      const billingName = getField(formData, "billingName");
      const billingEmail = getField(formData, "billingEmail");
      const billingPhone = getField(formData, "billingPhone");
      const billingCountry = getField(formData, "billingCountry");
      const billingAddress = getField(formData, "billingAddress");

      if (!billingName) {
        newErrors.billingName = "Billing name is required.";
      } else if (!nameRegex.test(billingName)) {
        newErrors.billingName =
          "Billing name must contain letters and spaces only.";
      }

      if (!billingEmail) {
        newErrors.billingEmail = "Billing email is required.";
      } else if (!emailRegex.test(billingEmail)) {
        newErrors.billingEmail =
          "Please enter a valid billing email.";
      }

      if (!billingPhone) {
        newErrors.billingPhone = "Billing phone is required.";
      } else if (!phoneRegex.test(billingPhone)) {
        newErrors.billingPhone =
          "Billing phone must contain numbers only.";
      }

      if (!billingCountry) {
        newErrors.billingCountry = "Please select billing country.";
      }

      if (!billingAddress) {
        newErrors.billingAddress = "Billing address is required.";
      } else if (!addressRegex.test(billingAddress)) {
        newErrors.billingAddress =
          "Please enter a valid billing address.";
      }
    }

    if (!agreed) {
      newErrors.terms =
        "Please accept the Terms & Conditions before continuing.";
    }

    return newErrors;
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (confirmed || isSubmitting) {
    return;
  }

  const form = e.currentTarget;
  setErrors({});

  const validationErrors = validateForm(form);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);

    const firstErrorField = Object.keys(validationErrors)[0];

    setTimeout(() => {
      const element = document.querySelector(
        `[name="${firstErrorField}"]`
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

  setIsSubmitting(true);

  try {
    const formData = new FormData(form);

    const registrationData = {
      // Participant Information
      title: getField(formData, "title"),
      designation: getField(formData, "designation"),
      firstName: getField(formData, "firstName"),
      lastName: getField(formData, "lastName"),
      email: getField(formData, "email"),
      phone: getField(formData, "phone"),
      institution: getField(formData, "institution"),
      country: getField(formData, "country"),
      city: getField(formData, "city"),
      address: getField(formData, "address"),

      // Billing Information
      sameBilling,

      billingName: sameBilling
        ? `${getField(formData, "firstName")} ${getField(formData, "lastName")}`.trim()
        : getField(formData, "billingName"),

      billingEmail: sameBilling
        ? getField(formData, "email")
        : getField(formData, "billingEmail"),

      billingPhone: sameBilling
        ? getField(formData, "phone")
        : getField(formData, "billingPhone"),

      billingCountry: sameBilling
        ? getField(formData, "country")
        : getField(formData, "billingCountry"),

      billingAddress: sameBilling
        ? getField(formData, "address")
        : getField(formData, "billingAddress"),

      // Registration Selection
      registrationPeriod: selectedPeriod,
      registrationPeriodLabel: selectedPeriodLabel,
      registrationCategory: selectedCategory,
      participationOption: selectedOptionName,

      // Payment / Pricing Information
      currency,
      amount: currentPrice ?? null,

      // Terms
      termsAccepted: agreed,

      // Timestamp
      createdAt: serverTimestamp(),
    };

    await addDoc(
      collection(db, "registrations"),
      registrationData
    );

    setConfirmed(true);

    document
      .getElementById("registration-form")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

  } catch (error) {
    console.error("Error saving registration:", error);

    alert(
      "Unable to submit your registration right now. Please try again."
    );

  } finally {
    setIsSubmitting(false);
  }
};
  /* =======================================================
     INPUT HANDLERS
  ======================================================= */

  const handleNumbersOnly = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const input = e.currentTarget;
    input.value = input.value.replace(/\D/g, "");
  };

  const handleLettersOnly = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const input = e.currentTarget;
    input.value = input.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
    input.value = input.value.replace(/\s{2,}/g, " ");
  };

  const handleInstitutionInput = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const input = e.currentTarget;
    input.value = input.value.replace(/[^A-Za-zÀ-ÿ0-9\s&.,'()/-]/g, "");
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {/* =====================================================
          SEO
      ===================================================== */}

      <Helmet>
        <title>Registration & Passes — Wavexa Conferences</title>

        <meta
          name="description"
          content="Register for the Global Summit on Diabetes, Cardiology & Cardiometabolic Health 2026. Choose your participation category and complete your conference registration."
        />

        <meta
          property="og:title"
          content="Registration & Passes — Wavexa Conferences"
        />

        <meta
          property="og:description"
          content="Choose your conference registration category and complete your Wavexa Conferences registration."
        />

        <meta property="og:url" content="/registration" />
        <link rel="canonical" href="/registration" />
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}
        <div className="relative overflow-visible">
<PageHero
  eyebrow="09–10 December 2026 • Global Webinar"
  title="Global Summit on"
  accent="Diabetes, Cardiology & Cardiometabolic Health"
  body="Secure your participation for the 2026 Wavexa Global Summit and connect with healthcare professionals, researchers, and experts from around the world."
/>

  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      duration: 0.8,
      delay: 0.25,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      pointer-events-none
      absolute
      right-2
      bottom-[-35px]
      z-10
      w-[130px]
      sm:right-6
      sm:bottom-[-30px]
      sm:w-[190px]
      md:right-8
      md:top-[68%]
      md:bottom-auto
      md:w-[280px]
      lg:right-[7%]
      lg:top-[55%]
      lg:bottom-auto
      lg:w-[500px]
      xl:right-[6%]
      xl:top-[55%]
      xl:w-[580px]
      -translate-y-1/2
    "
  >
    <img
      src={registerImage}
      alt="Scientific conference tracks"
      className="h-auto w-full object-contain"
    />
  </motion.div>
</div>

      {/* =====================================================
          REGISTRATION INTRO + CURRENCY + PRICING
      ===================================================== */}

      <Section className="pt-12 sm:pt-16">
        <div className="mx-auto max-w-6xl">

          {/* =================================================
              REGISTRATION INTRO
          ================================================= */}

          <div className="mx-auto max-w-2xl text-center">
            <p className={sectionEyebrowCls}>Registration</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Secure your participation in the summit
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              Choose your registration category and period below, then
              complete your participant details to confirm your place at
              the summit.
            </p>
          </div>

          {/* =================================================
              CURRENCY SELECTOR
          ================================================= */}

          <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 text-center">
            <p className="text-sm font-semibold text-foreground">
              Choose Your Currency
            </p>

            <p className="text-xs text-muted-foreground">
              Prices are displayed in your selected currency.
            </p>

            <div className="inline-flex items-center rounded-lg border border-border/60 bg-muted/30 p-1">
              {(["EUR", "USD", "GBP"] as Currency[]).map((code) => {
                const active = currency === code;

                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code)}
                    className={cn(
                      "flex min-w-[76px] items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-150",
                      active
                        ? cn(brandGradientCls, "text-primary-foreground shadow-sm")
                        : "text-muted-foreground hover:bg-background hover:text-foreground"
                    )}
                  >
                    <span className="font-numeric text-sm font-bold">
                      {currencySymbols[code]}
                    </span>
                    <span>{code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* =================================================
              PRICING TABLE
          ================================================= */}

          <div className="mt-10">
            <div className="mb-5 text-center">
              <h3 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Registration Pricing
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Choose your participation category and registration period.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] border-collapse">
                  <thead>
                    <tr className={cn(brandGradientCls, "text-primary-foreground")}>
                      <th className="w-[25%] px-4 py-4 text-left font-heading text-base font-bold">
                        Participation Category
                      </th>

                      {(
                        [
                          ["earlyBird", "Early Bird Registration"],
                          ["standard", "Standard Registration"],
                          ["final", "Final Registration"],
                        ] as [RegistrationPeriod, string][]
                      ).map(([key, label]) => (
                        <th
                          key={key}
                          className="w-[25%] px-4 py-4 text-center font-heading text-base font-bold"
                        >
                          <div>{label}</div>
                          <div className="mt-1 text-xs font-medium opacity-85">
                            {REGISTRATION_DEADLINES[key]}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {TICKETS.map((ticket) => (
                      <React.Fragment key={ticket.category}>
                        <tr className="border-b border-border/60 bg-muted/30">
  <td
    colSpan={4}
    className="px-4 py-3 text-center"
  >
    <div className="flex items-center justify-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />

      <span className="font-heading text-xs font-bold uppercase tracking-wide text-foreground">
        {ticket.category}
      </span>

      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
    </div>
  </td>
</tr>

                        {ticket.options.map((option) => {
                          const isSelected =
                            selectedCategory === ticket.category &&
                            selectedOptionName === option.name;

                          return (
                            <tr
                              key={`${ticket.category}-${option.name}`}
                              className={cn(
                                "border-b border-border/40 transition-colors duration-150",
                                isSelected ? "bg-primary/[0.035]" : "hover:bg-muted/20"
                              )}
                            >
                              <td className="px-4 py-3">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handlePricingOptionSelect(
                                      ticket.category,
                                      option.name,
                                      selectedPeriod
                                    )
                                  }
                                  className="group flex items-center gap-2.5 text-left"
                                >
                                  <span
                                    className={cn(
                                      "grid h-7 w-7 shrink-0 place-items-center rounded-md transition-colors",
                                      isSelected
                                        ? cn(brandGradientCls, "text-primary-foreground")
                                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                    )}
                                  >
                                    {isSelected ? (
                                      <Check className="h-3.5 w-3.5" />
                                    ) : (
                                      <ArrowRight className="h-3 w-3" />
                                    )}
                                  </span>

                                  <span
                                    className={cn(
                                      "text-xs transition-colors",
                                      isSelected
                                        ? "font-bold text-primary"
                                        : "font-semibold text-foreground group-hover:text-primary"
                                    )}
                                  >
                                    {option.name}
                                  </span>
                                </button>
                              </td>

                              {(
                                ["earlyBird", "standard", "final"] as RegistrationPeriod[]
                              ).map((period) => {
                                const periodActive =
                                  isSelected && selectedPeriod === period;

                                return (
                                  <td key={period} className="px-3 py-3 text-center">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handlePricingOptionSelect(
                                          ticket.category,
                                          option.name,
                                          period
                                        )
                                      }
                                      className={cn(
                                        "inline-flex min-w-[105px] flex-col items-center rounded-lg border px-3 py-2 transition-colors duration-150",
                                        periodActive
                                          ? cn(
                                              brandGradientCls,
                                              "border-transparent text-primary-foreground shadow-sm"
                                            )
                                          : "border-border/60 bg-background hover:border-primary/40 hover:bg-primary/[0.035]"
                                      )}
                                    >
                                      <span
                                        className={cn(
                                          "font-numeric text-sm font-bold",
                                          periodActive
                                            ? "text-primary-foreground"
                                            : "text-primary"
                                        )}
                                      >
                                        {currencySymbol}
                                        {option.prices[period][currency].toFixed(2)}
                                      </span>
                                    </button>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-2 border-t border-border/60 bg-muted/15 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                  <span className="text-[10px] text-muted-foreground">
                    Secure conference registration
                  </span>
                </div>

                <div className="text-[10px] text-muted-foreground">
                  All prices shown in{" "}
                  <span className="font-numeric font-bold text-primary">
                    {currency}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              SELECTED PRICE STRIP
          ================================================= */}

          <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-border/60 bg-card px-5 py-4 sm:px-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {hasSelection ? (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                    Your Selection
                  </p>
                  <h3 className="mt-0.5 font-heading text-lg font-bold text-foreground">
                    {selectedCategory} · {selectedOptionName}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {selectedPeriodLabel}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                    No Selection Yet
                  </p>
                  <h3 className="mt-0.5 font-heading text-lg font-bold text-foreground">
                    Choose a category and option above
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Your registration fee will appear here once selected.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-4">
                {formattedPrice && (
                  <p className="font-numeric text-2xl font-bold text-primary">
                    {formattedPrice}
                  </p>
                )}

                <Button
                  type="button"
                  onClick={scrollToForm}
                  disabled={!hasSelection}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* =====================================================
          REGISTRATION FORM
      ===================================================== */}

      <Section veil id="registration-form">
        <div className="mx-auto max-w-6xl">

          {/* FORM HEADER */}

          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className={sectionEyebrowCls}>Secure Registration</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Complete your registration
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              Provide your participant and billing information below. Your
              selected registration is carried forward automatically.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">

            {/* =================================================
                LEFT SIDE — registration information panel
            ================================================= */}

            <div className="space-y-8">

              {/* SELECTED REGISTRATION */}

              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <p className="text-center text-[11px] font-semibold uppercase tracking-wide text-primary">
  Selected Registration
</p>

                {hasSelection ? (
  <div className="text-center">
    <h3 className="mt-2 font-display text-xl font-bold text-foreground">
      {selectedCategory}
    </h3>

    <p className="mt-1 text-sm text-muted-foreground">
      {selectedOptionName}
    </p>

    <p className="mt-2 text-xs font-semibold text-primary">
      {selectedPeriodLabel}
    </p>

    <div className="mt-5 border-t border-border/60 pt-5 text-center">
      <p className="text-xs text-muted-foreground">
        Total Registration Fee
      </p>

      <p className="mt-1 font-numeric text-3xl font-bold text-primary">
        {formattedPrice}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        Currency: {currency}
      </p>
    </div>
  </div>
) : (
                  <>
                    <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                      Select a registration option
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Choose a category and participation option to continue.
                    </p>
                  </>
                )}
              </div>

              {/* REGISTRATION INFORMATION & ELIGIBILITY */}

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                  Eligibility
                </p>
                <h3 className="mt-1 font-heading text-lg font-bold text-foreground">
                  Registration Information & Eligibility
                </h3>

                <div className="mt-4 space-y-4">
                  {eligibilityItems.map((item) => (
                    <div key={item.title} className="flex gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* REGISTRATION INCLUDES */}

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                  Included
                </p>
                <h3 className="mt-1 font-heading text-lg font-bold text-foreground">
                  Registration Includes
                </h3>

                <ul className="mt-4 space-y-2.5">
                  {registrationIncludes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* IMPORTANT REGISTRATION POLICIES */}

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                  Terms
                </p>
                <h3 className="mt-1 font-heading text-lg font-bold text-foreground">
                  Important Registration Policies
                </h3>

                <ul className="mt-4 space-y-2.5">
                  {registrationPolicies.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SECURE REGISTRATION */}

              <div className="flex gap-3 rounded-2xl border border-border/60 bg-card p-5">
                <ShieldCheck className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Secure Registration
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Your registration details are collected securely for
                    conference participation and registration processing.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <Reveal delay={0.1}>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm sm:p-8"
              >

                {/* =================================================
                    PARTICIPANT INFORMATION
                ================================================= */}

                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <UserRound className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-foreground">
                      Participant Information
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Enter your professional and contact details.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {/* TITLE */}
                  <div>
                    <label className={labelCls}>Title *</label>
                    <select
                      required
                      name="title"
                      defaultValue=""
                      className={cn(inputCls, errors.title && errorCls)}
                    >
                      <option value="" disabled>
                        Select title
                      </option>
                      <option value="Dr">Dr.</option>
                      <option value="Prof">Prof.</option>
                      <option value="Mr">Mr.</option>
                      <option value="Ms">Ms.</option>
                      <option value="Mrs">Mrs.</option>
                    </select>
                    <ErrorMessage name="title" />
                  </div>

                  {/* DESIGNATION */}
                  <div>
                    <label className={labelCls}>Designation *</label>
                    <input
                      required
                      name="designation"
                      maxLength={50}
                      placeholder="e.g. Professor"
                      onInput={handleLettersOnly}
                      className={cn(inputCls, errors.designation && errorCls)}
                    />
                    <ErrorMessage name="designation" />
                  </div>

                  {/* FIRST NAME */}
                  <div>
                    <label className={labelCls}>First Name *</label>
                    <input
                      required
                      name="firstName"
                      autoComplete="given-name"
                      maxLength={50}
                      placeholder="First name"
                      onInput={handleLettersOnly}
                      className={cn(inputCls, errors.firstName && errorCls)}
                    />
                    <ErrorMessage name="firstName" />
                  </div>

                  {/* LAST NAME */}
                  <div>
                    <label className={labelCls}>Last Name *</label>
                    <input
                      required
                      name="lastName"
                      autoComplete="family-name"
                      maxLength={50}
                      placeholder="Last name"
                      onInput={handleLettersOnly}
                      className={cn(inputCls, errors.lastName && errorCls)}
                    />
                    <ErrorMessage name="lastName" />
                  </div>

                  {/* EMAIL */}
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        required
                        type="email"
                        name="email"
                        autoComplete="email"
                        maxLength={120}
                        placeholder="Your email address"
                        className={cn(inputCls, "pl-10", errors.email && errorCls)}
                      />
                    </div>
                    <ErrorMessage name="email" />
                  </div>

                  {/* PHONE */}
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        required
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        inputMode="numeric"
                        maxLength={15}
                        pattern="[0-9]*"
                        placeholder="Phone number"
                        onInput={handleNumbersOnly}
                        className={cn(inputCls, "pl-10", errors.phone && errorCls)}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Numbers only. Do not include +, spaces or special characters.
                    </p>
                    <ErrorMessage name="phone" />
                  </div>

                  {/* INSTITUTION */}
                  <div className="sm:col-span-2">
                    <label className={labelCls}>
                      Institution / Organization *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        required
                        name="institution"
                        autoComplete="organization"
                        maxLength={100}
                        placeholder="University, hospital, company or organization"
                        onInput={handleInstitutionInput}
                        className={cn(inputCls, "pl-10", errors.institution && errorCls)}
                      />
                    </div>
                    <ErrorMessage name="institution" />
                  </div>

                  {/* COUNTRY */}
                  <div>
                    <label className={labelCls}>Country *</label>
                    <div className="relative">
                      <select
                        required
                        name="country"
                        defaultValue=""
                        autoComplete="country-name"
                        className={cn(
                          inputCls,
                          "appearance-none pr-10",
                          errors.country && errorCls
                        )}
                      >
                        <option value="" disabled>
                          Select country
                        </option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                    <ErrorMessage name="country" />
                  </div>

                  {/* CITY */}
                  <div>
                    <label className={labelCls}>City *</label>
                    <input
                      required
                      name="city"
                      autoComplete="address-level2"
                      maxLength={50}
                      placeholder="City"
                      onInput={handleLettersOnly}
                      className={cn(inputCls, errors.city && errorCls)}
                    />
                    <ErrorMessage name="city" />
                  </div>

                  {/* ADDRESS */}
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Address *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <textarea
                        required
                        name="address"
                        rows={4}
                        maxLength={250}
                        autoComplete="street-address"
                        placeholder="Enter your complete address"
                        className={cn(
                          inputCls,
                          "resize-none pl-10",
                          errors.address && errorCls
                        )}
                      />
                    </div>
                    <ErrorMessage name="address" />
                  </div>
                </div>

                {/* =================================================
                    BILLING INFORMATION
                ================================================= */}

                <div className="mt-9 border-t border-border/60 pt-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <FileCheck2 className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <h2 className="font-heading text-lg font-bold text-foreground">
                        Billing Information
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Provide billing details for your registration.
                      </p>
                    </div>
                  </div>

                  <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-border/60 bg-muted/10 p-4">
                    <input
                      type="checkbox"
                      checked={sameBilling}
                      onChange={(e) => {
                        setSameBilling(e.target.checked);
                        setErrors((previous) => {
                          const next = { ...previous };
                          delete next.billingName;
                          delete next.billingEmail;
                          delete next.billingPhone;
                          delete next.billingCountry;
                          delete next.billingAddress;
                          return next;
                        });
                      }}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <span className="text-sm font-medium leading-relaxed text-foreground">
                      Billing information is the same as participant information
                    </span>
                  </label>

                  {sameBilling ? (
                    <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      Your billing details will be taken from the participant
                      information provided above.
                    </p>
                  ) : (
                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelCls}>Billing Name *</label>
                        <input
                          required
                          name="billingName"
                          autoComplete="name"
                          maxLength={100}
                          placeholder="Billing name"
                          onInput={handleLettersOnly}
                          className={cn(inputCls, errors.billingName && errorCls)}
                        />
                        <ErrorMessage name="billingName" />
                      </div>

                      <div>
                        <label className={labelCls}>Billing Email *</label>
                        <input
                          required
                          type="email"
                          name="billingEmail"
                          autoComplete="email"
                          maxLength={120}
                          placeholder="Billing email"
                          className={cn(inputCls, errors.billingEmail && errorCls)}
                        />
                        <ErrorMessage name="billingEmail" />
                      </div>

                      <div>
                        <label className={labelCls}>Billing Phone *</label>
                        <input
                          required
                          type="tel"
                          name="billingPhone"
                          autoComplete="tel"
                          inputMode="numeric"
                          maxLength={15}
                          pattern="[0-9]*"
                          placeholder="Billing phone"
                          onInput={handleNumbersOnly}
                          className={cn(inputCls, errors.billingPhone && errorCls)}
                        />
                        <p className="mt-1.5 text-xs text-muted-foreground">
                          Numbers only.
                        </p>
                        <ErrorMessage name="billingPhone" />
                      </div>

                      <div>
                        <label className={labelCls}>Billing Country *</label>
                        <div className="relative">
                          <select
                            required
                            name="billingCountry"
                            defaultValue=""
                            autoComplete="country-name"
                            className={cn(
                              inputCls,
                              "appearance-none pr-10",
                              errors.billingCountry && errorCls
                            )}
                          >
                            <option value="" disabled>
                              Select country
                            </option>
                            {countries.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        </div>
                        <ErrorMessage name="billingCountry" />
                      </div>

                      <div className="sm:col-span-2">
                        <label className={labelCls}>Billing Address *</label>
                        <textarea
                          required
                          name="billingAddress"
                          rows={4}
                          maxLength={250}
                          autoComplete="street-address"
                          placeholder="Billing address"
                          className={cn(
                            inputCls,
                            "resize-none",
                            errors.billingAddress && errorCls
                          )}
                        />
                        <ErrorMessage name="billingAddress" />
                      </div>
                    </div>
                  )}
                </div>

                {/* =================================================
                    REGISTRATION SELECTION
                ================================================= */}

                <div className="mt-9 border-t border-border/60 pt-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <CreditCard className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <h2 className="font-heading text-lg font-bold text-foreground">
                        Registration Selection
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Confirm your conference registration.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className={labelCls}>Registration Period *</label>
                    <div className="relative">
                      <select
                        value={selectedPeriod}
                        onChange={(e) =>
                          handlePeriodChange(e.target.value as RegistrationPeriod)
                        }
                        className={cn(inputCls, "appearance-none pr-10")}
                      >
                        <option value="earlyBird">
                          Early Bird Registration — {REGISTRATION_DEADLINES.earlyBird}
                        </option>
                        <option value="standard">
                          Standard Registration — {REGISTRATION_DEADLINES.standard}
                        </option>
                        <option value="final">
                          Final Registration — {REGISTRATION_DEADLINES.final}
                        </option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>Registration Category *</label>
                      <div className="relative">
                        <select
                          required
                          value={selectedCategory}
                          onChange={(e) => handleCategoryChange(e.target.value)}
                          className={cn(
                            inputCls,
                            "appearance-none pr-10",
                            errors.registrationCategory && errorCls
                          )}
                        >
                          <option value="" disabled>
                            Select registration category
                          </option>
                          {TICKETS.map((category) => (
                            <option key={category.category} value={category.category}>
                              {category.category}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                      <ErrorMessage name="registrationCategory" />
                    </div>

                    <div>
                      <label className={labelCls}>Participation Option *</label>
                      <div className="relative">
                        <select
                          required
                          value={selectedOptionName}
                          disabled={!currentCategory}
                          onChange={(e) => handleOptionChange(e.target.value)}
                          className={cn(
                            inputCls,
                            "appearance-none pr-10 disabled:cursor-not-allowed disabled:opacity-60",
                            errors.registrationOption && errorCls
                          )}
                        >
                          <option value="" disabled>
                            {currentCategory
                              ? "Select participation option"
                              : "Select a category first"}
                          </option>
                          {currentCategory?.options.map((option) => (
                            <option key={option.name} value={option.name}>
                              {option.name} — {currencySymbol}
                              {option.prices[selectedPeriod][currency].toFixed(2)}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                      <ErrorMessage name="registrationOption" />
                    </div>
                  </div>
                </div>

                {/* =================================================
                    REGISTRATION SUMMARY
                ================================================= */}

                <div className="mt-9 border-t border-border/60 pt-8">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                        Final Review
                      </p>
                      <h2 className="mt-1 font-heading text-lg font-bold text-foreground">
                        Registration Summary
                      </h2>
                    </div>
                    <span className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary sm:inline-flex">
                      {currency}
                    </span>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-xl border border-border/60">
                    {hasSelection ? (
                      <div className="grid divide-y divide-border/60 sm:grid-cols-[1fr_auto] sm:divide-x sm:divide-y-0">
                        <div className="p-5">
                          <div className="grid gap-5 sm:grid-cols-3">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                Period
                              </p>
                              <p className="mt-1 text-sm font-semibold text-foreground">
                                {selectedPeriodLabel}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                Category
                              </p>
                              <p className="mt-1 text-sm font-semibold text-foreground">
                                {selectedCategory}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                Option
                              </p>
                              <p className="mt-1 text-sm font-semibold text-foreground">
                                {selectedOptionName}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-primary/[0.035] p-5 sm:min-w-[190px] sm:text-right">
                          <p className="text-xs text-muted-foreground">Total Amount</p>
                          <p className="mt-1 font-numeric text-3xl font-bold text-primary">
                            {formattedPrice}
                          </p>
                          <p className="mt-1 text-[11px] text-muted-foreground">
                            {currency} registration fee
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 text-sm text-muted-foreground">
                        Select a participation category and option above to see
                        your registration summary.
                      </div>
                    )}
                  </div>
                </div>

                {/* =================================================
                    TERMS
                ================================================= */}

                <div className="mt-7">
                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-xl p-3",
                      errors.terms && "bg-red-500/5"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        if (e.target.checked) {
                          setErrors((previous) => {
                            const next = { ...previous };
                            delete next.terms;
                            return next;
                          });
                        }
                      }}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      I have read and agree to the conference registration
                      terms, conditions, cancellation policy, and privacy
                      policy.{" "}
                      <a
                        href="https://www.webiconx.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary underline underline-offset-2"
                      >
                        Terms and Conditions
                      </a>
                    </span>
                  </label>
                  <ErrorMessage name="terms" />
                </div>

                {/* =================================================
                    SUBMIT
                ================================================= */}

                <div className="mt-7 flex justify-center">
  <Button
    type="submit"
    size="lg"
    disabled={confirmed || isSubmitting}
  >
    {isSubmitting
      ? "Processing..."
      : confirmed
      ? "Registration Received"
      : formattedPrice
      ? `Complete Registration — ${formattedPrice}`
      : "Complete Registration"}
  </Button>
</div>

                {/* =================================================
                    SUCCESS
                ================================================= */}

                {confirmed && (
                  <div className="mt-5 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center">
                    <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-foreground">
                      Registration received successfully.
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Thank you for registering. Our conference team will
                      review your details and contact you with the next steps.
                    </p>
                  </div>
                )}

                {/* SECURE FOOTER */}
                <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                  <LockKeyhole className="h-3.5 w-3.5 shrink-0 text-accent" />
                  <span>Your registration information is handled securely.</span>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* =====================================================
          TRUST / INFORMATION STRIP
      ===================================================== */}

      <Section>
        <div className="mx-auto max-w-5xl rounded-2xl border border-border/60 bg-card px-6 py-8 sm:px-10">
          <div className="text-center">
            <p className={sectionEyebrowCls}>Registration Information</p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
              Secure Your Seat
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Please ensure that all information provided during registration
              is accurate. Your registration details will be used for
              conference participation and registration processing.
            </p>
          </div>

          <div className="mx-auto mt-7 grid max-w-2xl grid-cols-1 divide-y divide-border/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              ["09–10", "December 2026"],
              ["Global", "Online Webinar"],
              [currency, "Selected Currency"],
            ].map(([primary, secondary]) => (
              <div key={secondary} className="px-4 py-3 text-center">
                <p className="text-sm font-bold text-primary">{primary}</p>
                <p className="mt-1 text-xs text-muted-foreground">{secondary}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* =====================================================
          REGISTRATION PROCESS
      ===================================================== */}

      <Section>
        <div className="mx-auto max-w-5xl">
          <Heading
            eyebrow="Registration Process"
            title="Simple steps to"
            accent="join the conference"
            align="center"
          />

          <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-0">
            {[
              {
                step: "01",
                title: "Choose Registration",
                copy: "Select your registration period, participation category, and preferred participation option.",
              },
              {
                step: "02",
                title: "Complete the Form",
                copy: "Provide your participant, organization, contact, address, and billing information.",
              },
              {
                step: "03",
                title: "Receive Confirmation",
                copy: "Submit your registration details and receive confirmation from the conference team.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className={cn(
                  "relative px-0 sm:px-6",
                  index > 0 &&
                    "sm:border-l sm:border-border/60 pt-6 sm:pt-0"
                )}
              >
                <span className="font-numeric text-sm font-bold text-primary">
                  {item.step}
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
