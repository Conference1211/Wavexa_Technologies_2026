import * as React from "react";
import { Helmet } from "@/components/Seo";
import { PageHero } from "@/components/sections/Hero";
import speakersVideo from "@/assets/speakers.webm";
import { Section, Stagger, StaggerItem, Reveal } from "@/components/ui-kit";
import { SpeakerCard } from "@/components/cards";
import { SPEAKERS } from "@/constants/conference";
import { cn } from "@/lib/utils";

export default function Speakers() {
  const tracks = React.useMemo(
    () => ["All", ...Array.from(new Set(SPEAKERS.map((s) => s.track)))],
    [],
  );

  const [active, setActive] = React.useState("All");

  const list =
    active === "All"
      ? SPEAKERS
      : SPEAKERS.filter((s) => s.track === active);

  return (
    <>
      <Helmet>
        <title>Speakers — Wavexa Technologies 2026</title>

        <meta
          name="description"
          content="Meet the clinicians, researchers, founders and regulators speaking at Wavexa Technologies 2026 across clinical AI, genomics, medtech, policy and longevity science."
        />

        <meta
          property="og:title"
          content="Speakers — Wavexa Technologies 2026"
        />

        <meta
          property="og:description"
          content="200 speakers from 50 countries setting the agenda for future medicine."
        />

        <meta property="og:url" content="/speakers" />

        <link rel="canonical" href="/speakers" />
      </Helmet>

      {/* PAGE HERO */}
      <div className="relative">
        <PageHero
          eyebrow="Speakers"
          title="Two hundred voices,"
          accent="fifty countries"
          body="Every speaker is selected by the programme committee on the strength of their evidence, not their marketing budget. Here is a first look at the 2026 faculty."
        />

        {/* SPEAKERS VIDEO */}
        <video
          src={speakersVideo}
          autoPlay
          muted
          loop
          playsInline
          className="
            pointer-events-none
            absolute
            object-contain

            right-0
            bottom-[-140px]
            w-[170px]

            sm:right-8
            sm:bottom-[-100px]
            sm:w-[210px]

            md:right-8
            md:bottom-auto
            md:top-[68%]
            md:w-[280px]

            lg:right-[8%]
            lg:top-[56%]
            lg:w-[540px]

            xl:right-[6%]
            xl:top-[57%]
            xl:w-[620px]

            -translate-y-1/2
          "
        />
      </div>

      {/* SPEAKERS SECTION */}
      <Section className="pt-0">
        {/* TRACK FILTERS */}
        <Reveal className="flex flex-wrap gap-2">
          {tracks.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActive(t)}
              className={cn(
                "rounded-full border px-4 py-2 font-button text-[13px] transition-all duration-300",
                active === t
                  ? "border-transparent text-primary-foreground [background-image:var(--gradient-brand)] shadow-[var(--shadow-soft)]"
                  : "border-border/70 text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </Reveal>

        {/* SPEAKER CARDS */}
        <Stagger
          key={active}
          className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {list.map((s, i) => (
            <StaggerItem key={s.name}>
              <SpeakerCard speaker={s} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}