import { motion, type Variants } from "framer-motion";

import {
  Activity,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Globe2,
  Users2,
} from "lucide-react";

import {
  ButtonLink,
  Container,
  Badge,
} from "@/components/ui-kit";

import { useCountdown } from "@/components/visuals";
import { useConference } from "@/context/ConferenceContext";
import { conferencePath } from "@/data/conferences";

import heroImage from "@/assets/hero.png";

/* =========================================================
   ANIMATION
========================================================= */

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   HERO
========================================================= */

export function Hero() {
  const conference = useConference();
  const {
    ready,
    days,
    hours,
    minutes,
    seconds,
  } = useCountdown(conference.startISO);

  const countdown = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <>
      {/* =====================================================
          MAIN HERO
      ===================================================== */}

      <section
  className="
    relative
    isolate
    overflow-hidden
    bg-gradient-to-br
    from-teal-950
    via-slate-900
    to-blue-950
  "
>

        {/* ===================================================
            FULL HERO BACKGROUND IMAGE
        =================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
          "
        >

          <img
            src={conference.hero.image ?? heroImage}
            alt=""
            className="
              h-full
              w-full
              object-cover
              object-center
              opacity-45
            "
          />

          {/* DARK NAVY OVERLAY */}

          <div
  className="
    absolute
    inset-0
    bg-gradient-to-r
    from-teal-950/85
    via-slate-900/60
    to-blue-950/25
  "
/>

          {/* SOFT BRAND GLOW */}

          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_75%_45%,rgba(0,162,170,0.10),transparent_38%)]
            "
          />

        </div>


        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <Container className="relative z-10">

          <div
            className="
              relative
              flex
              min-h-[620px]
              items-center
              lg:min-h-[650px]
            "
          >

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="
                relative
                z-20
                py-14
                sm:py-16
                lg:max-w-[680px]
                lg:py-20
              "
            >

              {/* BADGE */}

              <div className="mb-5">

                <Badge
                  className="
                    border
                    border-teal-400/30
                    bg-teal-400/10
                    px-3
                    py-1
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-teal-300
                    sm:text-[10px]
                  "
                >
                  {conference.hero.eyebrow}
                </Badge>

              </div>


              {/* CATEGORY */}

              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.17em]
                  text-slate-300
                  sm:text-[10px]
                  lg:text-[11px]
                "
              >

                <Activity
                  className="
                    h-3.5
                    w-3.5
                    text-teal-400
                    sm:h-4
                    sm:w-4
                  "
                />

                {conference.shortName}

              </div>


              {/* =================================================
                  MAIN HEADING
              ================================================= */}

              <h1
  className="
    max-w-[760px]
    text-[2rem]
    font-bold
    leading-[1.08]
    tracking-[-0.035em]
    text-white
    text-balance
    sm:text-[2.5rem]
    md:text-[3rem]
    lg:text-[3.4rem]
    xl:text-[3.7rem]
  "
>
  <span
    className="
      block
      bg-gradient-to-r
      from-cyan-300
      via-teal-300
      to-cyan-400
      bg-clip-text
      text-transparent
    "
  >
    {conference.name}
  </span>
</h1>

              {/* TAGLINE */}

              <p
                className="
                  mt-5
                  max-w-[590px]
                  text-[13px]
                  leading-6
                  text-slate-300
                  sm:text-sm
                  sm:leading-7
                "
              >
                {conference.tagline}
              </p>


              {/* EVENT DETAILS */}

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  items-center
                  gap-x-5
                  gap-y-2.5
                  text-[11px]
                  text-slate-200
                  sm:text-xs
                  lg:text-sm
                "
              >

                <div className="flex items-center gap-1.5">

                  <CalendarDays
                    className="
                      h-3.5
                      w-3.5
                      text-cyan-300
                    "
                  />

                  <span>
                    {conference.dates}
                  </span>

                </div>


                <div className="flex items-center gap-1.5">

                  <Globe2
                    className="
                      h-3.5
                      w-3.5
                      text-teal-300
                    "
                  />

                  <span>
                    {conference.venue}
                  </span>

                </div>


                <div className="flex items-center gap-1.5">

                  <Users2
                    className="
                      h-3.5
                      w-3.5
                      text-cyan-300
                    "
                  />

                  <span>
                    International Audience
                  </span>

                </div>

              </div>


              {/* BUTTONS */}

              <div
                className="
                  mt-7
                  flex
                  flex-col
                  gap-2.5
                  sm:flex-row
                "
              >

                <ButtonLink
                  to={conferencePath(conference.id, "/registration")}
                  size="lg"
                  className="
                    group
                    border-0
                    bg-teal-500
                    px-5
                    text-sm
                    text-white
                    shadow-xl
                    shadow-teal-500/20
                    hover:bg-teal-400
                  "
                >

                  Register Now

                  <ArrowRight
                    className="
                      ml-2
                      h-4
                      w-4
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />

                </ButtonLink>


                <ButtonLink
                  to={conferencePath(conference.id, "/submit-abstract")}
                  variant="outline"
                  size="lg"
                  className="
                    border-white/25
                    bg-white/5
                    px-5
                    text-sm
                    text-white
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  Submit Abstract
                </ButtonLink>

              </div>


              {/* TRUST LINE */}

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  items-center
                  gap-x-5
                  gap-y-2
                  text-[10px]
                  text-slate-300
                  sm:text-xs
                "
              >

                <div className="flex items-center gap-1.5">

                  <CheckCircle2
                    className="
                      h-3.5
                      w-3.5
                      text-teal-400
                    "
                  />

                  Double-blind scientific review

                </div>


                <div className="flex items-center gap-1.5">

                  <CheckCircle2
                    className="
                      h-3.5
                      w-3.5
                      text-teal-400
                    "
                  />

                  {conference.tracks.length} Scientific Tracks

                </div>

              </div>

            </motion.div>

          </div>

        </Container>

      </section>


      {/* =====================================================
          COUNTDOWN SECTION
      ===================================================== */}

      <section
        className="
          relative
          bg-white
          px-4
          py-9
          sm:py-11
        "
      >

        <Container>

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              relative
              mx-auto
              max-w-4xl
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              shadow-[0_18px_55px_rgba(7,17,31,0.09)]
            "
          >

            {/* TOP ACCENT */}

            <div
              className="
                h-1.5
                w-full
                bg-gradient-to-r
                from-[#0B5ED7]
                via-[#14B8A6]
                to-[#20C997]
              "
            />

            <div
              className="
                px-4
                py-6
                sm:px-8
                sm:py-8
              "
            >

              {/* TITLE */}

              <div className="text-center">

                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-teal-600
                  "
                >
                  Save the Date
                </p>

                <h2
                  className="
                    mt-1.5
                    text-lg
                    font-bold
                    tracking-tight
                    text-slate-900
                    sm:text-2xl
                  "
                >
                  Conference Begins In
                </h2>

                <p
                  className="
                    mt-1.5
                    text-xs
                    text-slate-500
                    sm:text-sm
                  "
                >
                  Join the global scientific community in December 2026.
                </p>

              </div>


              {/* COUNTDOWN */}

              <div
                className="
                  mx-auto
                  mt-6
                  grid
                  max-w-3xl
                  grid-cols-4
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                "
              >

                {countdown.map((item, index) => (

                  <div
                    key={item.label}
                    className={`
                      relative
                      px-1
                      py-4
                      text-center
                      sm:px-6
                      sm:py-6

                      ${
                        index !== countdown.length - 1
                          ? "border-r border-slate-200"
                          : ""
                      }
                    `}
                  >

                    <div
                      className="
                        text-xl
                        font-bold
                        tracking-tight
                        text-slate-900
                        sm:text-4xl
                      "
                    >
                      {ready
                        ? String(item.value).padStart(2, "0")
                        : "--"}
                    </div>

                    <div
                      className="
                        mt-1
                        text-[7px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-slate-500
                        sm:text-[10px]
                      "
                    >
                      {item.label}
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </motion.div>

        </Container>

      </section>
    </>
  );
}

/* =========================================================
   COUNTDOWN
   KEPT FOR COMPATIBILITY
========================================================= */

export function Countdown() {
  const conference = useConference();
  const {
    ready,
    days,
    hours,
    minutes,
    seconds,
  } = useCountdown(conference.startISO);

  const items = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <div
      className="
        mx-auto
        grid
        max-w-3xl
        grid-cols-4
        overflow-hidden
        rounded-2xl
        border
        border-border/70
        bg-card
        shadow-sm
      "
    >

      {items.map((item, index) => (

        <div
          key={item.label}
          className={`
            px-3
            py-5
            text-center
            sm:px-6

            ${
              index !== items.length - 1
                ? "border-r border-border/60"
                : ""
            }
          `}
        >

          <div className="text-2xl font-bold sm:text-4xl">
            {ready
              ? String(item.value).padStart(2, "0")
              : "--"}
          </div>

          <div
            className="
              mt-1
              text-[10px]
              uppercase
              tracking-wider
              text-muted-foreground
            "
          >
            {item.label}
          </div>

        </div>

      ))}

    </div>
  );
}


/* =========================================================
   PAGE HERO
========================================================= */

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  body?: string;
};

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  body,
}: PageHeroProps) {
  return (
    <section
  className="
    relative
    flex
    min-h-[500px]
    items-center
    overflow-hidden
    bg-gradient-to-br
    from-teal-950
    via-slate-900
    to-blue-950
    text-white
    shadow-xl
    lg:min-h-[560px]
  "
>

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-96
          w-96
          rounded-full
          bg-teal-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-20%]
          left-[-10%]
          h-80
          w-80
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />


      {/* CONTENT */}

      <Container>
        <div
          className="
            relative
            z-10
            mx-auto
            max-w-5xl
            px-4
            text-center
            sm:px-6
          "
        >

          {/* EYEBROW */}

          {eyebrow && (
            <div className="mb-5">
              <Badge
                className="
                  border
                  border-teal-400/30
                  bg-teal-900/50
                  px-4
                  py-1.5
                  text-xs
                  font-bold
                  uppercase
                  tracking-widest
                  text-teal-300
                "
              >
                {eyebrow}
              </Badge>
            </div>
          )}


          {/* TITLE */}

          <h1
            className="
              mt-8
              text-4xl
              font-bold
              leading-[1.08]
              tracking-[-0.035em]
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            {title}

            {accent && (
              <>
                {" "}

                <span className="text-white">
                  {accent}
                </span>
              </>
            )}
          </h1>


          {/* DESCRIPTION */}

          {(description || body) && (
            <p
              className="
                mx-auto
                mt-6
                max-w-3xl
                text-lg
                font-medium
                leading-relaxed
                text-white
                sm:text-xl
              "
            >
              {description || body}
            </p>
          )}

        </div>
      </Container>

    </section>
  );
}