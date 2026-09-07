import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { useRef } from "react";
import heroMedical from "../../assets/hero.png";
import * as Icons from "lucide-react";

import {
  ArrowRight,
  CalendarDays,
  Users2,
  Activity,
} from "lucide-react";

import {
  ButtonLink,
  Container,
  Counter,
  Badge,
  Reveal,
} from "@/components/ui-kit";

import {
  FloatingShapes,
  DnaHelix,
  Aurora,
  NetworkLines,
  Particles,
  useCountdown,
} from "@/components/visuals";

import {
  CONFERENCE,
  STATS,
} from "@/constants/conference";

/* =========================================================
   HERO FLOATING CARDS
   ========================================================= */

const GLASS_CARDS = [
  {
    icon: Users2,
    title: "Global Faculty",
    body: "Clinicians, researchers & healthcare experts",
    className: "left-0 top-6 w-64",
    delay: 1.1,
    depth: 26,
  },
  {
    icon: CalendarDays,
    title: "Day 02 · 03 Dec",
    body: "Cardiology & Emerging Therapies",
    className: "right-2 top-1/3 w-60",
    delay: 1.25,
    depth: -34,
  },
  {
    icon: Activity,
    title: "Scientific Programme",
    body: "15 tracks across diabetes & cardiometabolic health",
    className: "left-8 bottom-8 w-64",
    delay: 1.4,
    depth: 18,
  },
];

/* =========================================================
   HERO
   ========================================================= */

/* =========================================================
   HERO
========================================================= */

export function Hero() {
  

  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#06111f] text-white">
      {/* =====================================================
          BACKGROUND EFFECTS
      ===================================================== */}

      {/* Blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]"
      />

      {/* Teal glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[550px] w-[550px] rounded-full bg-teal-400/10 blur-[130px]"
      />

      {/* Bottom glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-250px] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="relative z-10">

            {/* Top Badge */}
            

            {/* Subject */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-blue-400 sm:text-sm"
            >
              Diabetes · Cardiology · Cardiometabolic Health
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 max-w-[760px] font-display text-[clamp(2.9rem,4.7vw,5rem)] font-semibold leading-[0.96] tracking-[-0.035em]"
            >
              Global Summit on
              <br />

              <span className="text-gradient italic">
                Diabetes,
              </span>

              <br />

              <span className="text-gradient italic">
                Cardiology &
              </span>

              <br />

              <span className="text-white">
                Cardiometabolic Health
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-7 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
            >
              {CONFERENCE.tagline}
            </motion.p>

            {/* =================================================
                EVENT DETAILS
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {/* Date */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 backdrop-blur-xl">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Date
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  December 2–3, 2026
                </p>
              </div>

              {/* Format */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 backdrop-blur-xl">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Format
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  International Webinar
                </p>
              </div>

              {/* Duration */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 backdrop-blur-xl">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Duration
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  2 Days
                </p>
              </div>
            </motion.div>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <ButtonLink
                to="/registration"
                size="lg"
                className="group"
              >
                Register Now

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>

              <ButtonLink
                to="/submit-abstract"
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/[0.03] text-white hover:bg-white/10"
              >
                Submit Abstract
              </ButtonLink>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-7 flex items-center gap-3"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-400" />
              </span>

              <span className="text-xs text-slate-400">
                Connecting global experts in diabetes, cardiology and
                cardiometabolic medicine
              </span>
            </motion.div>
          </div>

          {/* =================================================
              RIGHT VISUAL
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: 35, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto w-full max-w-[560px] -translate-y-3 lg:-translate-y-8"
          >

            {/* Outer glow */}
            <div
              aria-hidden
              className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-blue-500/20 via-teal-400/10 to-transparent blur-3xl"
            />

            {/* Image frame */}
            <div className="relative rounded-[2.6rem] border border-white/15 bg-white/[0.045] p-2 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">

              <div className="relative aspect-[0.92] overflow-hidden rounded-[2.25rem]">

                {/* Main Image */}
                <img
                  src={heroMedical}
                  alt="Medical professionals using digital healthcare technology"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] hover:scale-[1.04]"
                />

                {/* Image colour treatment */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-[#07111f]/15 via-transparent to-[#06111f]/80"
                />

                {/* Bottom dark gradient */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#06111f] via-[#06111f]/60 to-transparent"
                />

                {/* =========================================
                    TOP IMAGE LABEL
                ========================================= */}

                <div className="absolute left-5 top-5">
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#06111f]/45 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                    Global Medical Forum
                  </div>
                </div>

                {/* =========================================
                    HEART PULSE ICON
                ========================================= */}

                

                {/* =========================================
                    BOTTOM CONTENT
                ========================================= */}

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">

                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-teal-300">
                    Scientific Focus
                  </p>

                  <h2 className="mt-2 max-w-md font-display text-3xl font-semibold leading-[1.05] text-white sm:text-4xl">
                    Integrated care for a{" "}
                    <span className="text-teal-300 italic">
                      healthier future
                    </span>
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
                    Exploring innovation in diabetes, cardiovascular medicine
                    and cardiometabolic health.
                  </p>

                  {/* mini pulse line */}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-px w-12 bg-gradient-to-r from-teal-400 to-transparent" />

                    <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400">
                      Evidence · Innovation · Collaboration
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                FLOATING CARD — SCIENTIFIC TRACKS
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.8,
              }}
              className="absolute -right-3 top-[18%] hidden rounded-2xl border border-white/15 bg-[#102033]/80 px-4 py-3 shadow-2xl backdrop-blur-2xl sm:block lg:-right-10"
            >
              <div className="flex items-center gap-3">

                <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/15">
                  <Activity className="h-5 w-5 text-blue-400" />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-slate-400">
                    Scientific Tracks
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-white">
                    Diabetes & Cardiology
                  </p>
                </div>
              </div>
            </motion.div>

                        {/* =================================================
                FLOATING CARD — GLOBAL ACCESS
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 1,
              }}
              className="absolute -bottom-5 -left-3 rounded-2xl border border-white/15 bg-[#102033]/85 px-4 py-3 shadow-2xl backdrop-blur-2xl sm:-left-7"
            >
              <div className="flex items-center gap-3">

                <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-400/10">
                  <span className="text-lg">🌍</span>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-slate-400">
                    Access
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-white">
                    Global · Online
                  </p>
                </div>

              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#06111f] to-transparent"
      />
    </section>
  );
}
/* =========================================================
   FLOATING CARD
========================================================= */

function FloatCard({
  card,
  mx,
  my,
}: {
  card: (typeof GLASS_CARDS)[number];
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const x = useTransform(
    mx,
    (v) => v * card.depth
  );

  const y = useTransform(
    my,
    (v) => v * card.depth
  );

  const Icon = card.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 26,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: card.delay,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        x,
        y,
      }}
      className={`absolute ${card.className}`}
    >
      <motion.div
        whileHover={{
          y: -6,
        }}
        className="
          glass-strong
          gradient-border
          float-slow
          rounded-2xl
          p-4
          shadow-[var(--shadow-soft)]
        "
      >
        <span
          className="
            flex
            items-center
            gap-2
            text-[10px]
            uppercase
            tracking-[0.22em]
            text-muted-foreground
          "
        >
          <Icon className="h-3.5 w-3.5 text-accent" />

          {card.title}
        </span>

        <p
          className="
            mt-2
            font-heading
            text-[15px]
            leading-snug
            font-semibold
          "
        >
          {card.body}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   COUNTDOWN
========================================================= */

export function Countdown() {
  const {
    ready,
    days,
    hours,
    minutes,
    seconds,
  } = useCountdown(CONFERENCE.startISO);

  const parts = [
    {
      v: days,
      l: "Days",
    },
    {
      v: hours,
      l: "Hours",
    },
    {
      v: minutes,
      l: "Minutes",
    },
    {
      v: seconds,
      l: "Seconds",
    },
  ];

  return (
    <div
      className="
        glass-strong
        gradient-border
        grid
        grid-cols-2
        gap-4
        rounded-[2rem]
        p-7
        sm:grid-cols-4
        sm:p-9
      "
    >
      {parts.map((p) => (
        <div
          key={p.l}
          className="text-center"
        >
          <p
            className="
              numeric
              text-4xl
              font-bold
              tracking-tight
              text-gradient
              sm:text-6xl
            "
          >
            {ready
              ? String(p.v).padStart(2, "0")
              : "--"}
          </p>

          <p
            className="
              mt-2
              text-[10px]
              uppercase
              tracking-[0.32em]
              text-muted-foreground
            "
          >
            {p.l}
          </p>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   PAGE HERO
========================================================= */

export function PageHero({
  eyebrow,
  title,
  accent,
  body,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  body: string;
}) {
  return (
    <section
      className="
        relative
        flex
        h-[360px]
        items-center
        overflow-hidden
        veil
        sm:h-[400px]
        lg:h-[600px]
      "
    >
      <Aurora />

      <FloatingShapes />

      <Particles className="opacity-60" />

      <div
        aria-hidden
        className="
          noise
          pointer-events-none
          absolute
          inset-0
        "
      />

      <Container className="relative">
        <motion.div
          initial={{
            opacity: 0,
            y: 26,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-3xl"
        >
          <Badge>
            {eyebrow}
          </Badge>

          <h1
            className="
              mt-6
              font-display
              text-[clamp(2.4rem,5.4vw,4.2rem)]
              font-semibold
              leading-[1.02]
              tracking-tight
              text-balance
            "
          >
            {title}{" "}

            {accent ? (
              <span className="text-gradient italic">
                {accent}
              </span>
            ) : null}
          </h1>

          <p
            className="
              mt-5
              max-w-2xl
              text-[17px]
              leading-relaxed
              text-muted-foreground
            "
          >
            {body}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}