import { Helmet } from "@/components/Seo";
import { PageHero } from "@/components/sections/Hero";
import {
  Section,
  Heading,
  Card,
  Reveal,
  Stagger,
  StaggerItem,
  ButtonLink,
} from "@/components/ui-kit";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Globe2,
  Microscope,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

/* =========================================================
   CONFERENCE DATA
========================================================= */

const CONFERENCE = {
  slug: "international-congress-on-infectious-diseases",
  title: "International Congress on Infectious Diseases",
  year: "2026",
  date: "Aug 13–14, 2026",
  edition: "Infectious Diseases",
  image:
    "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1400&q=85",
};

/* =========================================================
   CONFERENCE THEMES
========================================================= */

const CONFERENCE_THEMES = [
  "Emerging Infectious Diseases",
  "Antimicrobial Resistance",
  "Infection Prevention & Control",
  "Vaccines & Immunization",
  "Clinical Diagnosis & Treatment",
  "Public Health & Epidemiology",
];

/* =========================================================
   CONFERENCE HIGHLIGHTS
========================================================= */



/* =========================================================
   CONFERENCE FOCUS
========================================================= */


/* =========================================================
   PAGE
========================================================= */

export default function InfectiousDiseases() {
  return (
    <>
      <Helmet>
        <title>
          International Congress on Infectious Diseases — Wavexa Technologies
        </title>

        <meta
          name="description"
          content="Explore the International Congress on Infectious Diseases 2026, a Technologies healthcare conference focused on infectious disease research, clinical care, prevention and innovation."
        />
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}

      <div className="relative">
        <PageHero
          eyebrow={`Previous Conference · ${CONFERENCE.year}`}
          title="International Congress"
          accent="on Infectious Diseases."
          body="A Technologies platform bringing together healthcare professionals, researchers, clinicians and scientific experts to exchange knowledge, explore emerging developments and advance the future of infectious disease care."
        />

        {/* HERO IMAGE */}
        <div
          className="
            pointer-events-none
            absolute
            right-5
            bottom-[-115px]
            w-[190px]

            sm:right-8
            sm:bottom-[-90px]
            sm:w-[240px]

            md:right-8
            md:top-[68%]
            md:w-[310px]

            lg:right-[7%]
            lg:top-[58%]
            lg:w-[500px]

            xl:right-[6%]
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

              <p className="mt-1 text-sm font-medium text-foreground dark:text-white">
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

          <Reveal delay={0.1}>
            <Card className="h-full">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10">
                  <Microscope className="h-5 w-5 text-primary" />
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
                    Healthcare & Science
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
            accent="Advancing infectious disease care."
            body="The International Congress on Infectious Diseases brought together a diverse community of healthcare professionals, clinicians, researchers and scientific experts to exchange knowledge and explore the evolving landscape of infectious diseases."
          />

          <Reveal delay={0.1}>
            <Card className="relative overflow-hidden p-7 sm:p-9">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                  A Technologies Scientific Platform
                </p>

                <h3 className="mt-3 font-heading text-3xl font-semibold">
                  Knowledge that
                  <span className="block text-gradient">
                    moves healthcare forward.
                  </span>
                </h3>

                <p className="mt-5 text-sm leading-relaxed text-foreground">
                  The conference provided a platform for meaningful scientific
                  discussion around emerging infectious diseases, prevention,
                  diagnostics, treatment, antimicrobial resistance and public
                  health. Through expert perspectives and collaborative
                  conversations, participants explored opportunities to
                  strengthen healthcare outcomes and Technologies preparedness.
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-6">
                  <CheckCircle2 className="h-5 w-5 text-primary" />

                  <span className="text-sm font-medium">
                    Advancing knowledge through Technologies collaboration
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
          accent="Across infectious diseases."
          align="center"
          body="The scientific programme explored key areas that continue to influence infectious disease research, prevention, diagnosis and treatment."
        />

        <Reveal delay={0.1}>
          <Card className="mx-auto mt-14 max-w-5xl overflow-hidden p-0">
            <div className="border-b border-border/70 bg-muted/20 px-6 py-6 sm:px-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                Key Areas
              </p>

              <h3 className="mt-2 font-heading text-2xl font-semibold">
                Infectious Diseases
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

                  <span className="text-sm leading-relaxed text-foreground transition-colors duration-200">
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
          CONFERENCE HIGHLIGHTS
      ===================================================== */}

   

      {/* =====================================================
          CONFERENCE IMPACT
      ===================================================== */}

      <Section veil>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border/70">
              <img
                src={CONFERENCE.image}
                alt="International Congress on Infectious Diseases"
                className="aspect-[16/11] w-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                  Wavexa Technologies · {CONFERENCE.year}
                </p>

                <p className="mt-2 font-heading text-xl font-semibold text-white sm:text-2xl">
                  International Congress on Infectious Diseases
                </p>
              </div>
            </div>
          </Reveal>

          <Heading
            eyebrow="Conference Impact"
            title="From discussion"
            accent="to meaningful action."
            body="By connecting scientific expertise with clinical perspectives and Technologies health priorities, the conference encouraged participants to exchange ideas, strengthen professional networks and contribute to a more informed approach to infectious disease challenges."
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

                <p className="mt-4 max-w-lg text-sm leading-relaxed text-foreground">
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