import * as React from "react";
import { Helmet } from "@/components/Seo";
import { motion } from "framer-motion";
import { PageHero } from "@/components/sections/Hero";
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
        <title>Schedule — Wavexa Technologies 2026, 12–15 October</title>
        <meta
          name="description"
          content="The full four-day Wavexa Technologies 2026 agenda: keynotes, deep dives, labs, the investor floor and evening programme in Geneva."
        />
        <meta property="og:title" content="Schedule — Wavexa Technologies 2026" />
        <meta
          property="og:description"
          content="Four days, six stages, one hundred sessions. See the full agenda."
        />
        <meta property="og:url" content="/schedule" />
        <link rel="canonical" href="/schedule" />
      </Helmet>

      <PageHero
        eyebrow="Schedule"
        title="Four days,"
        accent="built for decisions"
        body="Main-stage keynotes in the morning, parallel tracks and labs through the afternoon, and an evening programme designed for the conversations that actually close deals."
      />

      <Section className="pt-0">
        <Reveal className="flex flex-wrap gap-3">
          {SCHEDULE.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setDay(i)}
              className={cn(
                "relative rounded-2xl border px-5 py-3.5 text-left transition-colors",
                day === i ? "border-transparent" : "border-border/70 hover:border-primary/40",
              )}
            >
              {day === i ? (
                <motion.span
                  layoutId="day-pill"
                  className="absolute inset-0 -z-10 rounded-2xl [background-image:var(--gradient-brand)]"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              ) : null}
              <span
                className={cn(
                  "numeric block text-xs tracking-[0.2em]",
                  day === i ? "text-primary-foreground/80" : "text-muted-foreground",
                )}
              >
                {d.day}
              </span>
              <span
                className={cn(
                  "font-heading text-xl font-semibold",
                  day === i ? "text-primary-foreground" : "text-foreground",
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
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <p className="mb-8 font-display text-3xl font-semibold tracking-tight">
            Theme — <span className="text-gradient italic">{active.theme}</span>
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
