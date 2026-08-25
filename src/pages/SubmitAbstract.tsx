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
  const [fileName, setFileName] = React.useState<string | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        setSent(true);

        window.setTimeout(() => {
          setSent(false);
        }, 5000);
      }}
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
        {/* TITLE */}

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

        {/* FIRST NAME */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            First Name <span className="text-destructive">*</span>
          </span>

          <input
            required
            name="firstName"
            placeholder="Your First Name"
            className={field}
          />
        </label>

        {/* LAST NAME */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            Last Name
          </span>

          <input
            name="lastName"
            placeholder="Your Last Name"
            className={field}
          />
        </label>

        {/* COUNTRY */}

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

        {/* EMAIL */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            Author's Email <span className="text-destructive">*</span>
          </span>

          <input
            required
            type="email"
            name="email"
            placeholder="your@email.com"
            className={field}
          />
        </label>

        {/* PHONE */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            Phone Number <span className="text-destructive">*</span>
          </span>

          <input
            required
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className={field}
          />
        </label>

        {/* ABSTRACT CATEGORY */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            Abstract Category <span className="text-destructive">*</span>
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

        {/* TRACK */}

        <label className="grid gap-2">
          <span className="text-xs font-semibold text-foreground">
            Track Name <span className="text-destructive">*</span>
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
              <option key={track.title} value={track.title}>
                {track.title}
              </option>
            ))}
          </select>
        </label>

        {/* POSTAL ADDRESS */}

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-xs font-semibold text-foreground">
            Full Postal Address
          </span>

          <textarea
            name="address"
            rows={3}
            placeholder="Enter your complete postal address"
            className={cn(field, "resize-none")}
          />
        </label>

        {/* ABSTRACT */}

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-xs font-semibold text-foreground">
            Structured Abstract{" "}
            <span className="text-muted-foreground">
              (Maximum 400 words)
            </span>{" "}
            <span className="text-destructive">*</span>
          </span>

          <textarea
            required
            name="abstract"
            rows={7}
            placeholder="Background… Methods… Results… Conclusion…"
            className={cn(field, "resize-none")}
          />
        </label>

        {/* =====================================================
            FILE UPLOAD
        ===================================================== */}

        <div className="sm:col-span-2">
          <p className="mb-2 text-xs font-semibold text-foreground">
            Attach your file{" "}
            <span className="text-destructive">*</span>
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
                {fileName ?? "Choose your abstract file"}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                PDF or DOCX • Maximum 5 MB • Anonymised file
              </p>
            </div>

            <input
              required
              type="file"
              name="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) =>
                setFileName(e.target.files?.[0]?.name ?? null)
              }
            />
          </label>
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
            I confirm that the submitted work is unpublished, the information
            provided is accurate, and the submission complies with the
            conference guidelines.
          </span>
        </label>
      </div>

      {/* =====================================================
          SUBMIT
      ===================================================== */}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg">
          Submit Abstract

          <ArrowRight className="h-4 w-4" />
        </Button>

        <AnimatePresence>
          {sent ? (
            <motion.span
              initial={{
                opacity: 0,
                x: -8,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className="flex items-center gap-2 text-sm text-accent"
            >
              <CheckCircle2 className="h-4 w-4" />

              Submission received successfully.
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
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
        <Badge tone="gold">Submission Instructions</Badge>

        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground">
          Before you submit
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-foreground">
          Please review these requirements carefully before completing the
          submission form.
        </p>

        {/* INSTRUCTIONS */}

        <div className="mt-6 space-y-4">
          {instructions.map((item, index) => (
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
          ))}
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
          Submit an Abstract — Wavexa Technologies 2026 Call for Papers
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

        <meta property="og:type" content="website" />

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