import { Helmet } from "@/components/Seo";
import { PageHero } from "@/components/sections/Hero";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Globe2,
  MapPin,
} from "lucide-react";

/* =========================================================
   UPCOMING CONFERENCES
========================================================= */

import { CONFERENCES } from "@/data/conferences";


/* =========================================================
   WEBINAR / CONFERENCE CATEGORIES
========================================================= */

const WEBINAR_GROUPS = [
  {
    eyebrow: "Clinical & Medical",
    title: "Medical & Clinical",
    accent: "Webinars",
    body:
      "Explore focused webinars and conferences covering major medical specialties, clinical research and emerging areas of healthcare.",
    topics: [
      "Cardiology",
      "Neurology & Neuroscience",
      "Infectious Diseases",
      "Oncology & Cancer",
      "Diabetes & Endocrinology",
      "Pediatrics",
    ],
  },
  {
    eyebrow: "Healthcare & Innovation",
    title: "Healthcare & Digital",
    accent: "Innovation",
    body:
      "Discover conversations around healthcare technology, digital transformation, medical devices and the future of connected care.",
    topics: [
      "Digital Health & Technology",
      "Medical Devices",
      "Healthcare Management",
      "Healthcare Innovation",
      "Medical Ethics & Health Policies",
      "Pharmaceutical Sciences",
    ],
  },
  {
    eyebrow: "Science & Research",
    title: "Science & Research",
    accent: "Conferences",
    body:
      "Connect with researchers, academics and professionals exploring scientific discovery, biotechnology and next-generation medicine.",
    topics: [
      "Biotechnology",
      "Genetics & Molecular Biology",
      "Nanoscience & Nanotechnology",
      "Microbiology",
      "Immunology",
      "Materials Science",
    ],
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function UpcomingConferences() {
  return (
    <div className="upcoming-conferences-page">
      <style>{`
        /* Requested typography/color treatment for this page */
        .upcoming-conferences-page .font-heading {
          font-family: inherit !important;
        }

        .upcoming-conferences-page .text-gradient {
          background: none !important;
          -webkit-background-clip: initial !important;
          background-clip: initial !important;
          -webkit-text-fill-color: currentColor !important;
          color: #009689 !important;
          font-weight: 700 !important;
        }
      `}</style>

      <Helmet>
        <title>Upcoming Conferences — Wavexa Technologies</title>

        <meta
          name="description"
          content="Explore upcoming Wavexa Technologies conferences, international healthcare events, webinars and opportunities to connect with healthcare professionals, researchers, clinicians and innovators."
        />
      </Helmet>

      {/* =====================================================
          PAGE HERO
      ===================================================== */}

      <div className="relative overflow-visible">
  <PageHero
    eyebrow="Upcoming Conferences"
    title="Where healthcare."
    accent="Meets what's next."
    body="Explore upcoming Wavexa Technologies conferences and discover opportunities to connect, learn, collaborate and shape the future of healthcare."
  />

 
</div>

      {/* =====================================================
          UPCOMING CONFERENCES
      ===================================================== */}

      <Section>
        <Heading
          eyebrow="Upcoming Events"
          title="The Next Conversations."
          accent="Are Already Taking Shape."
          align="center"
          body="Explore upcoming Wavexa Technologies conferences bringing together healthcare professionals, researchers, clinicians, innovators and institutions from around the world."
        />

        <Stagger className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {CONFERENCES.map((conference) => (
            <StaggerItem
  key={conference.slug}
>
  <Link
    to={`/conferences/${conference.slug}`}
    className="block h-full"
  >
    <Card className="group h-full overflow-hidden p-0 transition-all duration-500 hover:-translate-y-1">
                {/* IMAGE */}
                {/* IMAGE */}
<div className="relative aspect-[16/10] overflow-hidden">
  <img
    src={conference.image}
    alt={`${conference.name} — ${conference.dates}`}
    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    loading="lazy"
  />

  {/* IMAGE OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

  

  {/* ARROW */}
  <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/55 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
    <ArrowUpRight className="h-4 w-4 text-white" />
  </div>

  {/* IMAGE CONTENT */}
  <div className="absolute bottom-0 left-0 right-0 p-6">
    

    <h3 className="mt-2 font-sans text-2xl font-bold leading-tight text-white">
      {conference.name}
    </h3>
  </div>
</div>

                {/* CARD FOOTER */}
                <div className="flex min-h-[100px] items-center justify-between gap-4 px-5 py-4 sm:px-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5 text-primary" />

                      <p className="text-xs font-medium text-muted-foreground">
                        {conference.dates}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <Globe2 className="h-3.5 w-3.5 text-primary" />

                      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                        {conference.venue}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary transition-transform duration-300 group-hover:translate-x-1">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Card>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* =====================================================
          WEBINARS & CONFERENCE CATEGORIES
      ===================================================== */}

      <Section veil>
        <Heading
          eyebrow="Webinars & Conferences"
          title="Explore by"
          accent="Area of Interest."
          align="center"
          body="Discover focused healthcare, clinical and scientific conversations designed to connect professionals across disciplines."
        />

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
          {WEBINAR_GROUPS.map((group) => (
            <StaggerItem key={group.title}>
              <Card className="group h-full overflow-hidden transition-all duration-500 hover:-translate-y-1">
                {/* TOP ACCENT */}
                <div className="mb-7 flex items-center gap-3">
                  <span className="h-1 w-8 rounded-full bg-gold" />

                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                    {group.eyebrow}
                  </p>
                </div>

                {/* TITLE */}
                <h3 className="font-sans text-3xl font-bold">
                  {group.title}
                  <span className="block font-bold text-[#009689]">
                    {group.accent}
                  </span>
                </h3>

                {/* BODY */}
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {group.body}
                </p>

                {/* TOPICS */}
                <div className="mt-7 space-y-2">
                  {group.topics.map((topic) => (
  <div
    key={topic}
    className="group/item flex items-center gap-3 rounded-xl border border-border/50 bg-muted/20 px-3.5 py-3 transition-all duration-200 hover:bg-muted/40"
  >
    <span className="text-primary">›</span>

    <span className="text-sm text-muted-foreground transition-colors group-hover/item:text-foreground">
      {topic}
    </span>
  </div>
))}
                </div>

                {/* CARD ACTION */}
                <div className="mt-8 border-t border-border/60 pt-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary transition-transform duration-300 group-hover:translate-x-1">
                    Explore webinars
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <Section veil>
        <Reveal className="text-center">
          <Heading
            eyebrow="Looking Ahead"
            title="Be Part of"
            accent="What Comes Next."
            align="center"
            body="Explore upcoming conferences, discover new ideas and connect with the people shaping the future of healthcare."
          />

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/registration" size="lg">
              Register Now
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>

            <ButtonLink
              to="/previous-conferences"
              size="lg"
            >
              Previous Conferences
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}