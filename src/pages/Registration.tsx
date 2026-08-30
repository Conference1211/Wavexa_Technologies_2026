
import * as React from "react";
import { Helmet } from "@/components/Seo";
import {
  Check,
  CreditCard,
  FileCheck2,
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
  Card,
  Reveal,
  Badge,
  Button,
} from "@/components/ui-kit";

import { TICKETS } from "@/constants/conference";
import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

type RegistrationOption = {
  name: string;
  price: number;
};

type RegistrationPlan = {
  name: string;
  date: string;
  tag: string;
  featured?: boolean;
  color?: string;
  options: RegistrationOption[];
};

type FormErrors = Record<string, string>;

/* =========================================================
   INPUT STYLES
========================================================= */

const inputCls =
  "w-full rounded-xl border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/70 focus:border-primary/60 focus:ring-2 focus:ring-primary/10";

const labelCls =
  "mb-1.5 block text-sm font-medium text-foreground";

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
   VALIDATION HELPERS
========================================================= */

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const phoneRegex =
  /^[+]?[\d\s()-]{7,20}$/;

const nameRegex =
  /^[A-Za-zÀ-ÿ\s.'-]{2,}$/;

const cleanValue = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value.trim() : "";

const getField = (
  formData: FormData,
  name: string
) => cleanValue(formData.get(name));

/* =========================================================
   COMPONENT
========================================================= */

export default function Registration() {
  const tickets =
    TICKETS as unknown as RegistrationPlan[];

  /* =======================================================
     SELECTED REGISTRATION
  ======================================================= */

  const [selectedPlanIndex, setSelectedPlanIndex] =
    React.useState(0);

  const [selectedOption, setSelectedOption] =
    React.useState<RegistrationOption | null>(
      tickets[0]?.options?.[0] ?? null
    );

  /* =======================================================
     FORM STATE
  ======================================================= */

  const [confirmed, setConfirmed] =
    React.useState(false);

  const [agreed, setAgreed] =
    React.useState(false);

  const [sameBilling, setSameBilling] =
    React.useState(true);

  const [errors, setErrors] =
    React.useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] =
    React.useState(false);

  /* =======================================================
     CURRENT PLAN
  ======================================================= */

  const selectedPlan =
    tickets[selectedPlanIndex] ?? tickets[0];

  /* =======================================================
     SCROLL TO FORM
  ======================================================= */

  const scrollToForm = () => {
    setTimeout(() => {
      document
        .getElementById("registration-form")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  /* =======================================================
     SELECT PLAN
  ======================================================= */

  const handleSelectPlan = (index: number) => {
    const plan = tickets[index];

    if (!plan) return;

    setSelectedPlanIndex(index);
    setSelectedOption(
      plan.options?.[0] ?? null
    );

    setConfirmed(false);
    setErrors({});

    scrollToForm();
  };

  /* =======================================================
     SELECT OPTION
  ======================================================= */

  const handleSelectOption = (
    planIndex: number,
    option: RegistrationOption
  ) => {
    setSelectedPlanIndex(planIndex);
    setSelectedOption(option);
    setConfirmed(false);
    setErrors({});

    scrollToForm();
  };

  /* =======================================================
     VALIDATE FORM
  ======================================================= */

  const validateForm = (
    form: HTMLFormElement
  ): FormErrors => {
    const formData = new FormData(form);

    const newErrors: FormErrors = {};

    /* =====================================================
       PARTICIPANT
    ===================================================== */

    const firstName = getField(
      formData,
      "firstName"
    );

    const lastName = getField(
      formData,
      "lastName"
    );

    const email = getField(
      formData,
      "email"
    );

    const phone = getField(
      formData,
      "phone"
    );

    const institution = getField(
      formData,
      "institution"
    );

    const country = getField(
      formData,
      "country"
    );

    const city = getField(
      formData,
      "city"
    );

    const address = getField(
      formData,
      "address"
    );

    /* First Name */

    if (!firstName) {
      newErrors.firstName =
        "First name is required.";
    } else if (!nameRegex.test(firstName)) {
      newErrors.firstName =
        "Please enter a valid first name.";
    }

    /* Last Name */

    if (!lastName) {
      newErrors.lastName =
        "Last name is required.";
    } else if (!nameRegex.test(lastName)) {
      newErrors.lastName =
        "Please enter a valid last name.";
    }

    /* Email */

    if (!email) {
      newErrors.email =
        "Email address is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    /* Phone */

    if (!phone) {
      newErrors.phone =
        "Phone number is required.";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone =
        "Please enter a valid phone number.";
    }

    /* Institution */

    if (!institution) {
      newErrors.institution =
        "Institution / Organization is required.";
    } else if (institution.length < 2) {
      newErrors.institution =
        "Please enter a valid institution name.";
    }

    /* Country */

    if (!country) {
      newErrors.country =
        "Please select your country.";
    }

    /* City */

    if (!city) {
      newErrors.city =
        "City is required.";
    } else if (city.length < 2) {
      newErrors.city =
        "Please enter a valid city.";
    }

    /* Address */

    if (!address) {
      newErrors.address =
        "Address is required.";
    } else if (address.length < 5) {
      newErrors.address =
        "Please enter a complete address.";
    }

    /* =====================================================
       REGISTRATION
    ===================================================== */

    if (!selectedPlan?.name) {
      newErrors.registrationCategory =
        "Please select a registration category.";
    }

    if (!selectedOption?.name) {
      newErrors.registrationOption =
        "Please select a registration option.";
    }

    /* =====================================================
       BILLING
    ===================================================== */

    if (!sameBilling) {
      const billingName = getField(
        formData,
        "billingName"
      );

      const billingEmail = getField(
        formData,
        "billingEmail"
      );

      const billingPhone = getField(
        formData,
        "billingPhone"
      );

      const billingCountry = getField(
        formData,
        "billingCountry"
      );

      const billingAddress = getField(
        formData,
        "billingAddress"
      );

      if (!billingName) {
        newErrors.billingName =
          "Billing name is required.";
      } else if (billingName.length < 2) {
        newErrors.billingName =
          "Please enter a valid billing name.";
      }

      if (!billingEmail) {
        newErrors.billingEmail =
          "Billing email is required.";
      } else if (
        !emailRegex.test(billingEmail)
      ) {
        newErrors.billingEmail =
          "Please enter a valid billing email.";
      }

      if (!billingPhone) {
        newErrors.billingPhone =
          "Billing phone is required.";
      } else if (
        !phoneRegex.test(billingPhone)
      ) {
        newErrors.billingPhone =
          "Please enter a valid billing phone.";
      }

      if (!billingCountry) {
        newErrors.billingCountry =
          "Please select billing country.";
      }

      if (!billingAddress) {
        newErrors.billingAddress =
          "Billing address is required.";
      } else if (billingAddress.length < 5) {
        newErrors.billingAddress =
          "Please enter a complete billing address.";
      }
    }

    /* =====================================================
       TERMS
    ===================================================== */

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

    const validationErrors =
      validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      const firstErrorField =
        Object.keys(validationErrors)[0];

      setTimeout(() => {
        const element =
          document.querySelector(
            `[name="${firstErrorField}"]`
          );

        element?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        if (
          element instanceof
          HTMLInputElement ||
          element instanceof
          HTMLSelectElement ||
          element instanceof
          HTMLTextAreaElement
        ) {
          element.focus();
        }
      }, 50);

      return;
    }

    setIsSubmitting(true);

    /*
     * Currently this confirms the registration
     * locally. Connect your backend/payment API
     * here when ready.
     */

    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    setIsSubmitting(false);
    setConfirmed(true);

    window.scrollTo({
      top:
        document
          .getElementById("registration-form")
          ?.getBoundingClientRect()
          .top ?? 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     ERROR COMPONENT
  ======================================================= */

  const ErrorMessage = ({
    name,
  }: {
    name: string;
  }) => {
    if (!errors[name]) return null;

    return (
      <p
        className="mt-1.5 text-xs font-medium text-red-600"
        role="alert"
      >
        {errors[name]}
      </p>
    );
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
        <title>
          Registration & Passes — Wavexa Conferences
        </title>

        <meta
          name="description"
          content="Register for Wavexa Conferences. Choose your registration category, select your participation option, and complete your conference registration."
        />

        <meta
          property="og:title"
          content="Registration & Passes — Wavexa Conferences"
        />

        <meta
          property="og:description"
          content="Choose your conference registration category and complete your Wavexa Conferences registration."
        />

        <meta
          property="og:url"
          content="/registration"
        />

        <link
          rel="canonical"
          href="/registration"
        />
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}

      <PageHero
        eyebrow="Conference Registration"
        title="Choose your"
        accent="registration."
        body="Select your preferred registration category and participation option. Complete the registration form to secure your place at the conference."
      />

      {/* =====================================================
          REGISTRATION PRICING
      ===================================================== */}

      <Section className="pt-0">
        <div className="mx-auto max-w-7xl">

          <Heading
            eyebrow="Registration Categories"
            title="Choose your"
            accent="participation"
            align="center"
          />

          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            Choose from Early Bird, Normal, or Final
            Registration and select the participation
            option that best suits you.
          </p>

          {/* PRICING GRID */}

          <div className="mt-12 grid gap-6 lg:grid-cols-3">

            {tickets.map(
              (ticket, planIndex) => {
                const isSelected =
                  selectedPlanIndex ===
                  planIndex;

                return (
                  <Card
                    key={ticket.name}
                    className={cn(
                      "relative overflow-hidden p-0 transition-all duration-300",
                      "hover:-translate-y-1",
                      isSelected &&
                        "ring-2 ring-primary/50 shadow-[var(--shadow-lift)]"
                    )}
                  >

                    {/* CARD TOP */}

                    <div
                      className={cn(
                        "relative overflow-hidden px-6 py-7 text-center",
                        ticket.featured
                          ? "bg-gradient-to-br from-primary via-primary/90 to-accent"
                          : "bg-gradient-to-br from-primary/70 to-accent/60"
                      )}
                    >

                      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                      <div className="relative">

                        <h2 className="font-display text-2xl font-semibold text-white">
                          {ticket.name}
                        </h2>

                        <p className="mt-3 text-sm font-medium text-white/90">
                          {ticket.date}
                        </p>

                      </div>
                    </div>

                    {/* CATEGORY */}

                    <div className="px-6 pt-5">

                      <div className="rounded-md bg-accent/20 px-4 py-2.5 text-center">

                        <span className="font-heading text-base font-bold text-foreground">
                          {ticket.tag ||
                            "Academic"}
                        </span>

                      </div>

                    </div>

                    {/* OPTIONS */}

                    <div className="px-6 pb-2">

                      <div className="mt-4 divide-y divide-border/60">

                        {ticket.options?.map(
                          (option) => {

                            const isOptionSelected =
                              isSelected &&
                              selectedOption?.name ===
                                option.name;

                            return (
                              <button
                                key={
                                  option.name
                                }
                                type="button"
                                onClick={() =>
                                  handleSelectOption(
                                    planIndex,
                                    option
                                  )
                                }
                                className={cn(
                                  "group flex w-full items-center justify-between gap-4 rounded-lg px-2 py-3.5 text-left transition-all duration-200",
                                  "hover:bg-muted/40",
                                  isOptionSelected &&
                                    "bg-primary/5"
                                )}
                              >

                                <span
                                  className={cn(
                                    "text-sm leading-snug",
                                    isOptionSelected
                                      ? "font-semibold text-primary"
                                      : "text-muted-foreground"
                                  )}
                                >
                                  {
                                    option.name
                                  }
                                </span>

                                <span
                                  className={cn(
                                    "shrink-0 rounded-full border px-3 py-1 text-xs font-bold",
                                    isOptionSelected
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-border bg-background text-foreground"
                                  )}
                                >
                                  €
                                  {" "}
                                  {option.price.toLocaleString()}
                                </span>

                              </button>
                            );
                          }
                        )}

                      </div>
                    </div>

                    {/* SELECT */}

                    <div className="px-6 pb-6 pt-4">

                      <Button
                        type="button"
                        variant={
                          ticket.featured
                            ? "primary"
                            : "outline"
                        }
                        className="w-full"
                        onClick={() =>
                          handleSelectPlan(
                            planIndex
                          )
                        }
                      >
                        {isSelected
                          ? "Selected"
                          : `Choose ${ticket.name}`}
                      </Button>

                    </div>

                  </Card>
                );
              }
            )}

          </div>
        </div>
      </Section>

      {/* =====================================================
          SELECTED REGISTRATION SUMMARY
      ===================================================== */}

      {selectedOption && (
        <Section className="pt-0">
          <div className="mx-auto max-w-4xl">

            <Card className="overflow-hidden border-primary/20 bg-primary/[0.03]">

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Your Selection
                  </p>

                  <h2 className="mt-2 font-display text-xl font-semibold">
                    {selectedPlan?.name}
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedOption.name}
                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <div className="text-right">

                    <p className="text-xs text-muted-foreground">
                      Registration Fee
                    </p>

                    <p className="mt-1 font-numeric text-3xl font-bold text-primary">
                      €
                      {" "}
                      {selectedOption.price.toLocaleString()}
                    </p>

                  </div>

                  <Button
                    type="button"
                    onClick={scrollToForm}
                  >
                    Continue
                  </Button>

                </div>

              </div>

            </Card>

          </div>
        </Section>
      )}

      {/* =====================================================
          REGISTRATION FORM
      ===================================================== */}

      <Section
        veil
        id="registration-form"
      >
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">

            {/* =================================================
                LEFT INFORMATION
            ================================================= */}

            <div>

              <Heading
                eyebrow="Secure Your Seat"
                title="Complete your"
                accent="registration"
                body={`You have selected ${
                  selectedPlan?.name ??
                  "Registration"
                } — ${
                  selectedOption?.name ??
                  "Please select an option"
                }. Please complete the form to continue.`}
              />

              {/* SELECTED PLAN */}

              <Card className="mt-8">

                <div className="flex items-start gap-4">

                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <CreditCard className="h-5 w-5" />
                  </span>

                  <div className="min-w-0 flex-1">

                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Selected Registration
                    </p>

                    <h3 className="mt-1 font-display text-xl font-semibold">
                      {selectedPlan?.name}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {selectedOption?.name}
                    </p>

                    <p className="mt-3 font-numeric text-3xl font-bold text-primary">
                      €
                      {(
                        selectedOption?.price ??
                        0
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>

              </Card>

              {/* INCLUDED */}

              <div className="mt-8">

                <h3 className="font-heading text-lg font-semibold">
                  Registration Includes
                </h3>

                <ul className="mt-4 space-y-3">

                  {[
                    "Access to the conference scientific sessions",
                    "Conference participation certificate",
                    "Access to conference materials",
                    "Scientific presentations and discussions",
                    "Networking opportunities",
                    "Digital conference resources",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />

                      <span>{item}</span>
                    </li>
                  ))}

                </ul>

              </div>

              {/* SECURITY */}

              <div className="mt-8 flex gap-3 rounded-2xl border border-border/60 bg-background/60 p-4">

                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />

                <div>

                  <p className="text-sm font-semibold">
                    Secure Registration
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Your registration details
                    are collected securely
                    for conference
                    participation and
                    registration processing.
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
                className="rounded-3xl border border-border/60 bg-background p-5 shadow-[var(--shadow-soft)] sm:p-8"
              >

                {/* =================================================
                    PARTICIPANT + BILLING SIDE BY SIDE
                ================================================= */}

                <div className="grid gap-8 lg:grid-cols-2">

                  {/* ===============================================
                      PARTICIPANT INFORMATION
                  =============================================== */}

                  <div className="rounded-2xl border border-border/60 bg-muted/[0.12] p-5 sm:p-6">

                    <div className="flex items-center gap-3">

                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                        <UserRound className="h-5 w-5" />
                      </span>

                      <div>

                        <h2 className="font-heading text-xl font-semibold">
                          Participant Information
                        </h2>

                        <p className="text-xs text-muted-foreground">
                          Please provide your details.
                        </p>

                      </div>

                    </div>

                    <div className="mt-6 space-y-5">

                      {/* TITLE */}

                      <div>

                        <label className={labelCls}>
                          Title
                        </label>

                        <select
                          name="title"
                          defaultValue=""
                          className={cn(
                            inputCls,
                            errors.title &&
                              "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                          )}
                        >

                          <option
                            value=""
                            disabled
                          >
                            Select title
                          </option>

                          <option value="Dr">
                            Dr.
                          </option>

                          <option value="Prof">
                            Prof.
                          </option>

                          <option value="Mr">
                            Mr.
                          </option>

                          <option value="Ms">
                            Ms.
                          </option>

                          <option value="Mrs">
                            Mrs.
                          </option>

                        </select>

                        <ErrorMessage name="title" />

                      </div>

                      {/* DESIGNATION */}

                      <div>

                        <label className={labelCls}>
                          Designation
                        </label>

                        <input
                          name="designation"
                          placeholder="e.g. Professor"
                          className={cn(
                            inputCls,
                            errors.designation &&
                              "border-red-500"
                          )}
                        />

                        <ErrorMessage name="designation" />

                      </div>

                      {/* FIRST NAME */}

                      <div>

                        <label className={labelCls}>
                          First Name *
                        </label>

                        <input
                          required
                          name="firstName"
                          autoComplete="given-name"
                          placeholder="First name"
                          className={cn(
                            inputCls,
                            errors.firstName &&
                              "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                          )}
                        />

                        <ErrorMessage name="firstName" />

                      </div>

                      {/* LAST NAME */}

                      <div>

                        <label className={labelCls}>
                          Last Name *
                        </label>

                        <input
                          required
                          name="lastName"
                          autoComplete="family-name"
                          placeholder="Last name"
                          className={cn(
                            inputCls,
                            errors.lastName &&
                              "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                          )}
                        />

                        <ErrorMessage name="lastName" />

                      </div>

                      {/* EMAIL */}

                      <div>

                        <label className={labelCls}>
                          Email *
                        </label>

                        <div className="relative">

                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <input
                            required
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Your email address"
                            className={cn(
                              inputCls,
                              "pl-10",
                              errors.email &&
                                "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                            )}
                          />

                        </div>

                        <ErrorMessage name="email" />

                      </div>

                      {/* PHONE */}

                      <div>

                        <label className={labelCls}>
                          Phone *
                        </label>

                        <div className="relative">

                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <input
                            required
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            placeholder="Phone number"
                            className={cn(
                              inputCls,
                              "pl-10",
                              errors.phone &&
                                "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                            )}
                          />

                        </div>

                        <ErrorMessage name="phone" />

                      </div>

                      {/* INSTITUTION */}

                      <div>

                        <label className={labelCls}>
                          Institution / Organization *
                        </label>

                        <div className="relative">

                          <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <input
                            required
                            name="institution"
                            autoComplete="organization"
                            placeholder="University, hospital, company or organization"
                            className={cn(
                              inputCls,
                              "pl-10",
                              errors.institution &&
                                "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                            )}
                          />

                        </div>

                        <ErrorMessage name="institution" />

                      </div>

                      {/* COUNTRY */}

                      <div>

                        <label className={labelCls}>
                          Country *
                        </label>

                        <select
                          required
                          name="country"
                          defaultValue=""
                          autoComplete="country-name"
                          className={cn(
                            inputCls,
                            errors.country &&
                              "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                          )}
                        >

                          <option
                            value=""
                            disabled
                          >
                            Select country
                          </option>

                          {countries.map(
                            (country) => (
                              <option
                                key={country}
                                value={country}
                              >
                                {country}
                              </option>
                            )
                          )}

                        </select>

                        <ErrorMessage name="country" />

                      </div>

                      {/* CITY */}

                      <div>

                        <label className={labelCls}>
                          City *
                        </label>

                        <input
                          required
                          name="city"
                          autoComplete="address-level2"
                          placeholder="City"
                          className={cn(
                            inputCls,
                            errors.city &&
                              "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                          )}
                        />

                        <ErrorMessage name="city" />

                      </div>

                      {/* ADDRESS */}

                      <div>

                        <label className={labelCls}>
                          Address *
                        </label>

                        <div className="relative">

                          <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                          <textarea
                            required
                            name="address"
                            rows={4}
                            autoComplete="street-address"
                            placeholder="Enter your complete address"
                            className={cn(
                              inputCls,
                              "resize-none pl-10",
                              errors.address &&
                                "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                            )}
                          />

                        </div>

                        <ErrorMessage name="address" />

                      </div>

                    </div>

                  </div>

                  {/* ===============================================
                      BILLING INFORMATION
                  =============================================== */}

                  <div className="rounded-2xl border border-border/60 bg-muted/[0.12] p-5 sm:p-6">

                    <div className="flex items-center gap-3">

                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                        <FileCheck2 className="h-5 w-5" />
                      </span>

                      <div>

                        <h2 className="font-heading text-xl font-semibold">
                          Billing Information
                        </h2>

                        <p className="text-xs text-muted-foreground">
                          Provide billing details.
                        </p>

                      </div>

                    </div>

                    {/* SAME BILLING */}

                    <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-border/60 bg-background p-4">

                      <input
                        type="checkbox"
                        checked={sameBilling}
                        onChange={(e) => {
                          setSameBilling(
                            e.target.checked
                          );

                          setErrors((prev) => {
                            const next = {
                              ...prev,
                            };

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

                      <span className="text-sm font-medium leading-relaxed">
                        Billing information is the
                        same as participant
                        information
                      </span>

                    </label>

                    {/* SAME BILLING MESSAGE */}

                    {sameBilling && (
                      <div className="mt-6 rounded-xl border border-primary/10 bg-primary/5 p-4">

                        <div className="flex gap-3">

                          <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                          <p className="text-sm leading-relaxed text-muted-foreground">
                            Your billing details will
                            be taken from the
                            participant information
                            provided.
                          </p>

                        </div>

                      </div>
                    )}

                    {/* BILLING FIELDS */}

                    {!sameBilling && (
                      <div className="mt-5 space-y-5">

                        {/* BILLING NAME */}

                        <div>

                          <label className={labelCls}>
                            Billing Name *
                          </label>

                          <input
                            required
                            name="billingName"
                            autoComplete="billing name"
                            placeholder="Billing name"
                            className={cn(
                              inputCls,
                              errors.billingName &&
                                "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                            )}
                          />

                          <ErrorMessage name="billingName" />

                        </div>

                        {/* BILLING EMAIL */}

                        <div>

                          <label className={labelCls}>
                            Billing Email *
                          </label>

                          <input
                            required
                            type="email"
                            name="billingEmail"
                            autoComplete="billing email"
                            placeholder="Billing email"
                            className={cn(
                              inputCls,
                              errors.billingEmail &&
                                "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                            )}
                          />

                          <ErrorMessage name="billingEmail" />

                        </div>

                        {/* BILLING PHONE */}

                        <div>

                          <label className={labelCls}>
                            Billing Phone *
                          </label>

                          <input
                            required
                            type="tel"
                            name="billingPhone"
                            autoComplete="billing tel"
                            placeholder="Billing phone"
                            className={cn(
                              inputCls,
                              errors.billingPhone &&
                                "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                            )}
                          />

                          <ErrorMessage name="billingPhone" />

                        </div>

                        {/* BILLING COUNTRY */}

                        <div>

                          <label className={labelCls}>
                            Billing Country *
                          </label>

                          <select
                            required
                            name="billingCountry"
                            defaultValue=""
                            autoComplete="billing country-name"
                            className={cn(
                              inputCls,
                              errors.billingCountry &&
                                "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                            )}
                          >

                            <option
                              value=""
                              disabled
                            >
                              Select country
                            </option>

                            {countries.map(
                              (country) => (
                                <option
                                  key={country}
                                  value={country}
                                >
                                  {country}
                                </option>
                              )
                            )}

                          </select>

                          <ErrorMessage name="billingCountry" />

                        </div>

                        {/* BILLING ADDRESS */}

                        <div>

                          <label className={labelCls}>
                            Billing Address *
                          </label>

                          <textarea
                            required
                            name="billingAddress"
                            rows={4}
                            autoComplete="billing street-address"
                            placeholder="Billing address"
                            className={cn(
                              inputCls,
                              "resize-none",
                              errors.billingAddress &&
                                "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                            )}
                          />

                          <ErrorMessage name="billingAddress" />

                        </div>

                      </div>
                    )}

                  </div>

                </div>

                {/* =================================================
                    REGISTRATION SELECTION
                ================================================= */}

                <div className="mt-10 border-t border-border/60 pt-8">

                  <div className="flex items-center gap-3">

                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <CreditCard className="h-5 w-5" />
                    </span>

                    <div>

                      <h2 className="font-heading text-xl font-semibold">
                        Registration Selection
                      </h2>

                      <p className="text-xs text-muted-foreground">
                        Confirm your registration option.
                      </p>

                    </div>

                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">

                    {/* CATEGORY */}

                    <div>

                      <label className={labelCls}>
                        Registration Category *
                      </label>

                      <select
                        required
                        value={
                          selectedPlan?.name ??
                          ""
                        }
                        onChange={(e) => {
  const index = tickets.findIndex(
    (ticket) => ticket.name === e.target.value
  );

  if (index === -1) return;

  const plan = tickets[index];

  if (!plan) return;

  setSelectedPlanIndex(index);
  setSelectedOption(plan.options?.[0] ?? null);
  setConfirmed(false);
}}
                        className={cn(
                          inputCls,
                          errors.registrationCategory &&
                            "border-red-500"
                        )}
                      >

                        {tickets.map(
                          (ticket) => (
                            <option
                              key={ticket.name}
                              value={ticket.name}
                            >
                              {ticket.name}
                            </option>
                          )
                        )}

                      </select>

                      <ErrorMessage name="registrationCategory" />

                    </div>

                    {/* OPTION */}

                    <div>

                      <label className={labelCls}>
                        Registration Option *
                      </label>

                      <select
                        required
                        value={
                          selectedOption?.name ??
                          ""
                        }
                        onChange={(e) => {

                          const option =
                            selectedPlan?.options?.find(
                              (item) =>
                                item.name ===
                                e.target.value
                            );

                          if (option) {

                            setSelectedOption(
                              option
                            );

                            setErrors(
                              (prev) => {
                                const next = {
                                  ...prev,
                                };

                                delete next.registrationOption;

                                return next;
                              }
                            );
                          }
                        }}
                        className={cn(
                          inputCls,
                          errors.registrationOption &&
                            "border-red-500"
                        )}
                      >

                        {selectedPlan?.options?.map(
                          (option) => (
                            <option
                              key={option.name}
                              value={option.name}
                            >
                              {option.name} — €
                              {option.price.toLocaleString()}
                            </option>
                          )
                        )}

                      </select>

                      <ErrorMessage name="registrationOption" />

                    </div>

                  </div>

                </div>

                {/* =================================================
                    PRICE SUMMARY
                ================================================= */}

                <div className="mt-10 border-t border-border/60 pt-8">

                  <h2 className="font-heading text-xl font-semibold">
                    Registration Summary
                  </h2>

                  <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/[0.03] p-5">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                      <div className="min-w-0">

                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          Category
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {selectedPlan?.name}
                        </p>

                        <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
                          Selected Option
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {selectedOption?.name}
                        </p>

                      </div>

                      <div className="shrink-0 text-left sm:text-right">

                        <p className="text-xs text-muted-foreground">
                          Total
                        </p>

                        <p className="mt-1 font-numeric text-2xl font-bold text-primary">
                          €
                          {(
                            selectedOption?.price ??
                            0
                          ).toLocaleString()}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    TERMS
                ================================================= */}

                <div className="mt-7">

                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-xl p-2",
                      errors.terms &&
                        "bg-red-500/5"
                    )}
                  >

                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(
                          e.target.checked
                        );

                        if (
                          e.target.checked
                        ) {
                          setErrors(
                            (prev) => {
                              const next = {
                                ...prev,
                              };

                              delete next.terms;

                              return next;
                            }
                          );
                        }
                      }}
                      className="mt-1 h-4 w-4 accent-primary"
                    />

                    <span className="text-sm leading-relaxed text-muted-foreground">
                      I have read and agree to
                      the conference
                      registration terms,
                      conditions, cancellation
                      policy, and privacy policy.
                    </span>

                  </label>

                  <ErrorMessage name="terms" />

                </div>

                {/* =================================================
                    SUBMIT
                ================================================= */}

                <Button
                  type="submit"
                  size="lg"
                  disabled={
                    confirmed ||
                    isSubmitting
                  }
                  className="mt-7 w-full"
                >
                  {isSubmitting
                    ? "Processing..."
                    : confirmed
                    ? "Registration Received"
                    : `Complete Registration — €${(
                        selectedOption?.price ??
                        0
                      ).toLocaleString()}`}
                </Button>

                {/* =================================================
                    SUCCESS
                ================================================= */}

                {confirmed && (

                  <div className="mt-5 rounded-2xl border border-accent/30 bg-accent/5 p-5 text-center">

                    <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-accent">

                      <Check className="h-5 w-5" />

                    </div>

                    <p className="mt-3 text-sm font-semibold">
                      Registration received
                      successfully.
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Thank you for registering.
                      Our conference team will
                      review your details and
                      contact you with the next
                      steps.
                    </p>

                  </div>
                )}

                {/* SECURITY */}

                <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">

                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-accent" />

                  Your registration information
                  is handled securely.

                </p>

              </form>

            </Reveal>

          </div>
        </div>
      </Section>

      {/* =====================================================
          HOW REGISTRATION WORKS
      ===================================================== */}

      <Section>

        <div className="mx-auto max-w-5xl">

          <Heading
            eyebrow="Registration Process"
            title="Simple steps to"
            accent="join the conference"
            align="center"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {/* STEP 1 */}

            <Card className="p-6">

              <Badge tone="muted">
                01
              </Badge>

              <h3 className="mt-5 font-heading text-lg font-semibold">
                Choose Registration
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Select Early Bird, Normal,
                or Final Registration and
                choose your preferred
                participation option.
              </p>

            </Card>

            {/* STEP 2 */}

            <Card className="p-6">

              <Badge tone="muted">
                02
              </Badge>

              <h3 className="mt-5 font-heading text-lg font-semibold">
                Complete the Form
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Provide your participant,
                organization, contact, and
                billing information.
              </p>

            </Card>

            {/* STEP 3 */}

            <Card className="p-6">

              <Badge tone="muted">
                03
              </Badge>

              <h3 className="mt-5 font-heading text-lg font-semibold">
                Receive Confirmation
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                After submitting your
                details, the conference
                team will review your
                registration and contact
                you with the next steps.
              </p>

            </Card>

          </div>

        </div>

      </Section>
    </>
  );
}
