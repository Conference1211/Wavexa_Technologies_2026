import { Helmet } from "@/components/Seo";
import { PageHero } from "@/components/sections/Hero";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import upcomingImage from "@/assets/upcoming1.png";
import Diabetes1 from "@/assets/Diabetes1.jpg";
import cardilogy from "@/assets/cardiology.jpg";
import gyenicology from "@/assets/gyenicology.jpeg";
import lungs from "@/assets/lungs.jpg";
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

const UPCOMING_CONFERENCES = [
  {
    slug: "international-conference-on-dental-and-oral-health",
    title: "International Conference on Dental and Oral Health",
    year: "2026",
    date: "December 20-21, 2026",
    edition: "Dental & Oral Health",
    location: "International",
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "international-conference-on-psychiatry-and-mental-health",
    title: "International Conference on Psychiatry and Mental Health",
    year: "2026",
    date: "November 12–13, 2026",
    edition: "Psychiatry & Mental Health",
    location: "International",
    image:
      "https://images.unsplash.com/photo-1474418397713-7ede21d49118?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "international-conference-on-copd-and-lung-health",
    title: "International Conference on COPD and Lung Health",
    year: "2027",
    date: "February 15–16, 2027",
    edition: "COPD & Lung Health",
    location: "International",
    image:lungs,
  },
  {
    slug: "international-conference-on-cardiology",
    title: "International Conference on Cardiology",
    year: "2027",
    date: "March 11–12, 2027",
    edition: "Cardiology",
    location: "International",
    image:cardilogy,
  },
  {
    slug: "world-congress-on-diabetes-and-pediatric-endocrinology",
    title: "World Congress on Diabetes and Pediatric Endocrinology",
    year: "2027",
    date: "March 30–31, 2027",
    edition: "Diabetes & Pediatric Endocrinology",
    location: "International",
    image: Diabetes1,
  },
  {
    slug: "world-health-congress-on-women-health-and-gynecology",
    title: "World Health Congress on Women Health and Gynecology",
    year: "2027",
    date: "April 22–23, 2027",
    edition: "Women’s Health & Gynecology",
    location: "International",
    image:gyenicology,
  },
];

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
    <>
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
      src={upcomingImage}
      alt="Upcoming Wavexa Technologies conferences"
      className="h-auto w-full object-contain"
    />
  </motion.div>
</div>

      {/* =====================================================
          UPCOMING CONFERENCES
      ===================================================== */}

      <Section>
        <Heading
          eyebrow="Upcoming Events"
          title="The next conversations."
          accent="Are already taking shape."
          align="center"
          body="Explore upcoming Wavexa Technologies conferences bringing together healthcare professionals, researchers, clinicians, innovators and institutions from around the world."
        />

        <Stagger className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {UPCOMING_CONFERENCES.map((conference) => (
            <StaggerItem
  key={`${conference.title}-${conference.year}`}
>
  <Link
    to={`/upcoming-conferences/${conference.slug}`}
    className="block h-full"
  >
    <Card className="group h-full overflow-hidden p-0 transition-all duration-500 hover:-translate-y-1">
                {/* IMAGE */}
                {/* IMAGE */}
<div className="relative aspect-[16/10] overflow-hidden">
  <img
    src={conference.image}
    alt={`${conference.title} — ${conference.date}`}
    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    loading="lazy"
  />

  {/* IMAGE OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

  {/* YEAR */}
  <div className="absolute left-5 top-5">
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-md">
      <CalendarDays className="h-3.5 w-3.5" />
      {conference.year}
    </span>
  </div>

  {/* ARROW */}
  <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/55 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
    <ArrowUpRight className="h-4 w-4 text-white" />
  </div>

  {/* IMAGE CONTENT */}
  <div className="absolute bottom-0 left-0 right-0 p-6">
    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
      {conference.edition}
    </p>

    <h3 className="mt-2 font-heading text-2xl font-semibold leading-tight text-white">
      {conference.title}
    </h3>
  </div>
</div>

                {/* CARD FOOTER */}
                <div className="flex min-h-[100px] items-center justify-between gap-4 px-5 py-4 sm:px-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5 text-primary" />

                      <p className="text-xs font-medium text-muted-foreground">
                        {conference.date}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <Globe2 className="h-3.5 w-3.5 text-primary" />

                      <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                        {conference.location}
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
          accent="area of interest."
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
                <h3 className="font-heading text-3xl font-semibold">
                  {group.title}
                  <span className="block text-gradient">
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
            title="Be part of"
            accent="what comes next."
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
    </>
  );
}