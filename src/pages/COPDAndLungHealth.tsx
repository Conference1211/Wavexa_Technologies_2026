import { Helmet } from "@/components/Seo";
import { PageHero } from "@/components/sections/Hero";
import {
  Section,
  Heading,
  Card,
  Reveal,
  ButtonLink,
} from "@/components/ui-kit";

import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Globe2,
  Wind,
} from "lucide-react";

/* =========================================================
   CONFERENCE DATA
========================================================= */

const CONFERENCE = {
  slug: "international-conference-on-copd-and-lung-health",
  title: "International Conference on COPD and Lung Health",
  year: "2026",
  date: "April 6–7, 2026",
  edition: "COPD & Lung Health",
  image:
    "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=1400&q=85",
};

/* =========================================================
   CONFERENCE THEMES
========================================================= */

const CONFERENCE_THEMES = [
  "Chronic Obstructive Pulmonary Disease",
  "Respiratory Medicine & Pulmonology",
  "Lung Health & Prevention",
  "Asthma & Chronic Respiratory Diseases",
  "Pulmonary Diagnostics & Imaging",
  "Respiratory Care & Patient Management",
];

/* =========================================================
   PAGE
========================================================= */

export default function COPDAndLungHealth() {
  return (
    <>
      <Helmet>
        <title>
          International Conference on COPD and Lung Health — Wavexa Technologies
        </title>

        <meta
          name="description"
          content="Explore the International Conference on COPD and Lung Health 2026, bringing together pulmonologists, respiratory specialists, researchers and healthcare professionals to advance lung health and respiratory care."
        />
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}

      <div className="relative">
        <PageHero
          eyebrow={`Previous Conference · ${CONFERENCE.year}`}
          title="International Conference on"
          accent="COPD & Lung Health."
          body="A Technologies scientific platform connecting pulmonologists, respiratory specialists, researchers and healthcare professionals to explore advances in COPD, respiratory medicine, lung health and patient care."
        />

        {/* HERO IMAGE */}

        <div
          className="
            pointer-events-none
            absolute
            right-6
            bottom-[-115px]
            w-[190px]

            sm:right-8
            sm:bottom-[-90px]
            sm:w-[240px]

            md:right-8
            md:top-[68%]
            md:w-[310px]

            lg:right-[2%]
            lg:top-[58%]
            lg:w-[500px]

            xl:right-[2%]
            xl:top-[58%]
            xl:w-[570px]

            -translate-y-1/2
          "
        >
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/5 p-2 shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.35)] backdrop-blur-sm">
            
            <img
              src={CONFERENCE.image}
              alt={`${CONFERENCE.title} ${CONFERENCE.year}`}
              className="aspect-[16/10] w-full rounded-xl object-cover"
            />

            <div className="absolute inset-x-2 bottom-2 rounded-b-xl bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                {CONFERENCE.edition}
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                Wavexa Technologies · {CONFERENCE.year}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONFERENCE INFORMATION
      ===================================================== */}

      <Section>
        <div className="grid gap-6 md:grid-cols-3">

          {/* DATE */}

          <Reveal>
            <Card className="h-full">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Conference Date
                  </p>

                  <p className="mt-2 font-heading text-lg font-semibold">
                    {CONFERENCE.date}
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* EDITION */}

          <Reveal delay={0.1}>
            <Card className="h-full">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10">
                  <Wind className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Conference Edition
                  </p>

                  <p className="mt-2 font-heading text-lg font-semibold">
                    {CONFERENCE.edition}
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* COMMUNITY */}

          <Reveal delay={0.2}>
            <Card className="h-full">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10">
                  <Globe2 className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Technologies Community
                  </p>

                  <p className="mt-2 font-heading text-lg font-semibold">
                    Respiratory Health
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>

        </div>
      </Section>

      {/* =====================================================
          ABOUT THE CONFERENCE
      ===================================================== */}

      <Section veil>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          <Heading
            eyebrow="About The Conference"
            title="Connecting expertise."
            accent="Advancing lung health."
            body="The International Conference on COPD and Lung Health brought together pulmonologists, respiratory specialists, clinicians and researchers to explore developments in respiratory medicine, COPD management and innovative approaches to improving lung health."
          />

          <Reveal delay={0.1}>
            <Card className="relative overflow-hidden p-7 sm:p-9">

              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative">

                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                  A Technologies Scientific Platform
                </p>

                <h3 className="mt-3 font-heading text-3xl font-semibold">
                  Advancing respiratory
                  <span className="block text-gradient">
                    health & care.
                  </span>
                </h3>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  The conference encouraged scientific exchange across
                  pulmonology and respiratory medicine, with discussions
                  focused on COPD, lung health, respiratory diseases,
                  diagnostics, treatment and the future of patient care.
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-6">
                  <CheckCircle2 className="h-5 w-5 text-primary" />

                  <span className="text-sm font-medium">
                    Connecting research with clinical innovation
                  </span>
                </div>

              </div>
            </Card>
          </Reveal>

        </div>
      </Section>

      {/* =====================================================
          KEY THEMES
      ===================================================== */}

      <Section veil>

        <Heading
          eyebrow="Scientific Themes"
          title="Focused conversations."
          accent="Across COPD & lung health."
          align="center"
          body="The scientific programme explored key areas shaping respiratory research, diagnosis, treatment, prevention and patient care."
        />

        <Reveal delay={0.1}>
          <Card className="mx-auto mt-14 max-w-5xl overflow-hidden p-0">

            <div className="border-b border-border/70 bg-muted/20 px-6 py-6 sm:px-8">

              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                Key Areas
              </p>

              <h3 className="mt-2 font-heading text-2xl font-semibold">
                COPD & Lung Health
                <span className="block text-gradient">
                  Scientific Focus
                </span>
              </h3>

            </div>

            <div className="grid gap-1 p-5 sm:grid-cols-2 sm:p-7">

              {CONFERENCE_THEMES.map((theme, index) => (
                <div
                  key={theme}
                  className="group flex items-start gap-3 rounded-lg px-3 py-3 transition-all duration-200 hover:bg-muted/40"
                >

                  <span className="mt-0.5 font-numeric text-[10px] tracking-[0.15em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm leading-relaxed text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                    {theme}
                  </span>

                  <ArrowUpRight className="ml-auto mt-0.5 h-3.5 w-3.5 shrink-0 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />

                </div>
              ))}

            </div>

          </Card>
        </Reveal>

      </Section>

      {/* =====================================================
          CONFERENCE IMPACT
      ===================================================== */}

      <Section veil>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          <Reveal>

            <div className="relative overflow-hidden rounded-2xl border border-border30">

              <img
                src={CONFERENCE.image}
                alt="International Conference on COPD and Lung Health"
                className="aspect-[16/11] w-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                  Wavexa Technologies · {CONFERENCE.year}
                </p>

                <p className="mt-2 font-heading text-xl font-semibold text-white sm:text-2xl">
                  International Conference on COPD and Lung Health
                </p>

              </div>

            </div>

          </Reveal>

          <Heading
            eyebrow="Conference Impact"
            title="From research"
            accent="to healthier lungs."
            body="By bringing together scientific expertise, clinical perspectives and emerging approaches in respiratory medicine, the conference encouraged collaboration and knowledge exchange to improve COPD management and lung health."
          />

        </div>

      </Section>

      {/* =====================================================
          BACK TO PREVIOUS CONFERENCES
      ===================================================== */}

      <Section>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          <Heading
            eyebrow="The Journey Continues"
            title="Explore more"
            accent="Wavexa memories."
            body="Discover other previous Wavexa Technologies conferences and revisit the conversations, ideas and connections that continue to shape our Technologies healthcare community."
          />

          <Reveal delay={0.1}>

            <Card className="relative overflow-hidden p-7 sm:p-9">

              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative">

                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                  Previous Conferences
                </p>

                <h3 className="mt-3 font-heading text-3xl font-semibold">
                  Discover more
                  <span className="block text-gradient">
                    Technologies editions.
                  </span>
                </h3>

                <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  Explore previous Wavexa Technologies editions and discover the
                  knowledge, connections and experiences that shaped our
                  journey.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">

                  <ButtonLink to="/conferences/previous" size="lg">
                    <ArrowLeft className="h-4 w-4" />
                    Previous Conferences
                  </ButtonLink>

                </div>

              </div>

            </Card>

          </Reveal>

        </div>

      </Section>
    </>
  );
}