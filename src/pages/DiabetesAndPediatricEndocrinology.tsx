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
  Activity,
} from "lucide-react";

import Diabetes1 from "@/assets/Diabetes1.jpg";

/* =========================================================
   CONFERENCE DATA
========================================================= */

const CONFERENCE = {
  slug: "world-congress-on-diabetes-and-pediatric-endocrinology",
  title: "World Congress on Diabetes and Pediatric Endocrinology",
  year: "2027",
  date: "March 30–31, 2027",
  edition: "Diabetes & Pediatric Endocrinology",
  location: "International",
  image: Diabetes1,
};

/* =========================================================
   CONFERENCE THEMES
========================================================= */

const CONFERENCE_THEMES = [
  "Diabetes Mellitus & Clinical Management",
  "Type 1 & Type 2 Diabetes in Children and Adults",
  "Pediatric Endocrinology & Hormonal Disorders",
  "Diabetes Technology & Digital Health",
  "Insulin Therapy & Emerging Treatments",
  "Childhood Obesity & Metabolic Disorders",
  "Growth, Puberty & Endocrine Disorders",
  "Diabetes Prevention & Long-Term Complications",
];

/* =========================================================
   PAGE
========================================================= */

export default function DiabetesAndPediatricEndocrinology() {
  return (
    <>
      <Helmet>
        <title>
          World Congress on Diabetes and Pediatric Endocrinology — Wavexa
          Technologies
        </title>

        <meta
          name="description"
          content="Explore the World Congress on Diabetes and Pediatric Endocrinology 2027, bringing together endocrinologists, diabetologists, pediatricians, physicians, researchers and healthcare professionals to exchange knowledge and advance diabetes and endocrine care."
        />
      </Helmet>

      {/* =====================================================
          HERO
      ===================================================== */}

      <div className="relative">
        <PageHero
          eyebrow={`Upcoming Conference · ${CONFERENCE.year}`}
          title="World Congress"
          accent="on Diabetes & Pediatric Endocrinology."
          body="A Technologies platform bringing together endocrinologists, diabetologists, pediatricians, physicians, researchers and healthcare professionals to exchange knowledge, explore emerging innovations and advance the future of diabetes and endocrine care."
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
          <div className="relative overflow-hidden rounded-2xl bg-primary/5 p-2 shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.35)] backdrop-blur-sm">
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
          <Reveal>
            <Card className="h-full">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Congress Date
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
                  <Activity className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Congress Edition
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
                    Diabetes & Pediatric Endocrinology
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* =====================================================
          ABOUT THE CONGRESS
      ===================================================== */}

      <Section veil>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Heading
            eyebrow="About The Congress"
            title="Connecting expertise."
            accent="Advancing diabetes & endocrine care."
            body="The World Congress on Diabetes and Pediatric Endocrinology brings together endocrinologists, diabetologists, pediatricians, physicians, researchers and healthcare professionals to exchange knowledge, discuss emerging developments and explore innovative approaches in diabetes and pediatric endocrine care."
          />

          <Reveal delay={0.1}>
            <Card className="relative overflow-hidden p-7 sm:p-9">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                  A Technologies Diabetes & Endocrinology Platform
                </p>

                <h3 className="mt-3 font-heading text-3xl font-semibold">
                  Knowledge that
                  <span className="block text-gradient">
                    shapes better endocrine care.
                  </span>
                </h3>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  The congress provides a platform for meaningful scientific
                  discussion across diabetes management, pediatric
                  endocrinology, insulin therapy, diabetes technology,
                  childhood obesity, metabolic disorders, growth and
                  development, hormonal disorders and diabetes prevention.
                  Through expert perspectives and collaborative conversations,
                  participants can explore emerging approaches to diagnosis,
                  treatment and long-term patient care.
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-6">
                  <CheckCircle2 className="h-5 w-5 text-primary" />

                  <span className="text-sm font-medium">
                    Advancing diabetes and endocrine healthcare through Technologies
                    collaboration
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
          accent="Across diabetes & pediatric endocrinology."
          align="center"
          body="The scientific programme explores key areas shaping modern diabetes care, pediatric endocrinology, metabolic health and the future of endocrine medicine."
        />

        <Reveal delay={0.1}>
          <Card className="mx-auto mt-14 max-w-5xl overflow-hidden p-0">
            <div className="border-b border-border/70 bg-muted/20 px-6 py-6 sm:px-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                Key Areas
              </p>

              <h3 className="mt-2 font-heading text-2xl font-semibold">
                Diabetes & Pediatric Endocrinology
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
          CONGRESS IMPACT
      ===================================================== */}

      <Section veil>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border/70">
              <img
                src={CONFERENCE.image}
                alt={CONFERENCE.title}
                className="aspect-[16/11] w-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                  Wavexa Technologies · {CONFERENCE.year}
                </p>

                <p className="mt-2 font-heading text-xl font-semibold text-white sm:text-2xl">
                  {CONFERENCE.title}
                </p>
              </div>
            </div>
          </Reveal>

          <Heading
            eyebrow="Congress Impact"
            title="From knowledge"
            accent="to better endocrine health."
            body="By connecting scientific expertise with clinical perspectives and emerging innovations, the congress creates opportunities to exchange ideas, strengthen professional networks and contribute to the continued advancement of diabetes care, pediatric endocrinology and patient wellbeing."
          />
        </div>
      </Section>

      {/* =====================================================
          BACK TO UPCOMING CONFERENCES
      ===================================================== */}

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Heading
            eyebrow="The Journey Continues"
            title="Explore more"
            accent="Wavexa Technologies events."
            body="Discover other upcoming Wavexa Technologies conferences and explore the conversations, ideas and connections shaping the future of healthcare."
          />

          <Reveal delay={0.1}>
            <Card className="relative overflow-hidden p-7 sm:p-9">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                  Upcoming Conferences
                </p>

                <h3 className="mt-3 font-heading text-3xl font-semibold">
                  Discover more
                  <span className="block text-gradient">
                    Technologies events.
                  </span>
                </h3>

                <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  Explore upcoming Wavexa Technologies editions and discover new
                  opportunities to learn, connect and shape the future of
                  healthcare.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink to="/conferences/upcoming" size="lg">
                    <ArrowLeft className="h-4 w-4" />
                    Upcoming Conferences
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