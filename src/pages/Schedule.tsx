import * as React from "react";
import { Helmet } from "@/components/Seo";
import { motion } from "framer-motion";
import { PageHero } from "@/components/sections/Hero";
import programmeImage from "@/assets/programme.png";
import { Section, Reveal, ButtonLink } from "@/components/ui-kit";
import { Timeline } from "@/components/Timeline";
import { SCHEDULE } from "@/constants/conference";
import { cn } from "@/lib/utils";

export default function Schedule() {
  const [day, setDay] = React.useState(0);
  const active = SCHEDULE[day]!;

  return (
    <>
      <Helmet>
        <title>
          Schedule — Global Summit on Diabetes, Cardiology & Cardiometabolic Health 2026
        </title>

        <meta
          name="description"
          content="Explore the full two-day scientific programme for the Global Summit on Diabetes, Cardiology & Cardiometabolic Health 2026, taking place on 02–03 December 2026."
        />

        <meta
          property="og:title"
          content="Schedule — Global Summit on Diabetes, Cardiology & Cardiometabolic Health 2026"
        />

        <meta
          property="og:description"
          content="Explore the two-day scientific programme featuring expert sessions on diabetes, cardiology, cardiometabolic health, emerging therapies, digital health and integrated care."
        />

        <meta property="og:url" content="/schedule" />
        <link rel="canonical" href="/schedule" />
      </Helmet>

      <div className="relative overflow-visible">
  <PageHero
    eyebrow="Schedule"
    title="Two days,"
    accent="of scientific exchange"
    body="A focused two-day scientific programme bringing together experts to explore diabetes, cardiology, cardiometabolic health, emerging therapies, digital innovation and integrated care."
  />

  {/* HERO IMAGE */}
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
      src={programmeImage}
      alt="Scientific conference programme"
      className="h-auto w-full object-contain"
    />
  </motion.div>
</div>

      <Section className="pt-0">
        <Reveal className="flex flex-wrap gap-3">
          {SCHEDULE.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setDay(i)}
              className={cn(
                "relative rounded-2xl border px-5 py-3.5 text-left transition-colors",
                day === i
                  ? "border-transparent"
                  : "border-border/70 hover:border-primary/40",
              )}
            >
              {day === i ? (
                <motion.span
                  layoutId="day-pill"
                  className="absolute inset-0 -z-10 rounded-2xl [background-image:var(--gradient-brand)]"
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 30,
                  }}
                />
              ) : null}

              <span
                className={cn(
                  "numeric block text-xs tracking-[0.2em]",
                  day === i
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground",
                )}
              >
                {d.day}
              </span>

              <span
                className={cn(
                  "font-heading text-xl font-semibold",
                  day === i
                    ? "text-primary-foreground"
                    : "text-foreground",
                )}
              >
                {d.date}
              </span>
            </button>
          ))}
        </Reveal>

        <motion.div
          key={active.day}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12"
        >
          <p className="mb-8 font-display text-3xl font-semibold tracking-tight">
            Theme —{" "}
            <span className="text-gradient italic">
              {active.theme}
            </span>
          </p>

          <Timeline items={active.items} />
        </motion.div>

        <Reveal className="mt-14 text-center">
          <ButtonLink to="/registration" size="lg">
            Reserve your pass
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}