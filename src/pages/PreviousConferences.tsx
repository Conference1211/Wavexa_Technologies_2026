import { Helmet } from "@/components/Seo";
import { PageHero } from "@/components/sections/Hero";
import { Link } from "react-router-dom";
import previousConferencesImage from "@/assets/previous-conferences.png";

import {
  Section,
  Heading,
  Card,
  Reveal,
  Stagger,
  StaggerItem,
  ButtonLink,
} from "@/components/ui-kit";
import { ArrowUpRight, CalendarDays } from "lucide-react";

const PREVIOUS_CONFERENCES = [
  {
    slug: "international-congress-on-infectious-diseases",
    title: "International Congress on Infectious Diseases",
    year: "2026",
    date: "Aug 13–14, 2026",
    edition: "Infectious Diseases",
    image:
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "world-conference-on-neurology-and-neuroscience",
    title: "World Conference on Neurology and Neuroscience",
    year: "2026",
    date: "May 18–19, 2026",
    edition: "Neurology & Neuroscience",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "international-conference-on-copd-and-lung-health",
    title: "International Conference on COPD and Lung Health",
    year: "2026",
    date: "April 6–7, 2026",
    edition: "COPD & Lung Health",
    image:
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "world-health-congress-women-health-gynecology",
    title: "World Health Congress on Women Health and Gynecology",
    year: "2026",
    date: "Feb 24–25, 2026",
    edition: "Women’s Health & Gynecology",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "Technologies-summit-nanoscience-nanotechnology",
    title: "Technologies Summit on Nanoscience and Nanotechnology",
    year: "2025",
    date: "Nov 24–25, 2025",
    edition: "Nanoscience & Nanotechnology",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=85",
  },
];
/* =========================================================
   CONFERENCE DESTINATIONS
========================================================= */

const DESTINATION_GROUPS = [
  {
    name: "Americas",
    countries: [
      {
        name: "Canada",
        flag: "https://flagcdn.com/w40/ca.png",
      },
      {
        name: "Brazil",
        flag: "https://flagcdn.com/w40/br.png",
      },
      {
        name: "United States",
        flag: "https://flagcdn.com/w40/us.png",
      },
      {
        name: "Mexico",
        flag: "https://flagcdn.com/w40/mx.png",
      },
    ],
  },

  {
    name: "Asia-Pacific",
    countries: [
      {
        name: "Australia",
        flag: "https://flagcdn.com/w40/au.png",
      },
      {
        name: "China",
        flag: "https://flagcdn.com/w40/cn.png",
      },
      {
        name: "Hong Kong",
        flag: "https://flagcdn.com/w40/hk.png",
      },
      {
        name: "India",
        flag: "https://flagcdn.com/w40/in.png",
      },
      {
        name: "Japan",
        flag: "https://flagcdn.com/w40/jp.png",
      },
      {
        name: "New Zealand",
        flag: "https://flagcdn.com/w40/nz.png",
      },
      {
        name: "Philippines",
        flag: "https://flagcdn.com/w40/ph.png",
      },
      {
        name: "Singapore",
        flag: "https://flagcdn.com/w40/sg.png",
      },
    ],
  },

  {
    name: "Europe",
    countries: [
      {
        name: "Austria",
        flag: "https://flagcdn.com/w40/at.png",
      },
      {
        name: "Belgium",
        flag: "https://flagcdn.com/w40/be.png",
      },
      {
        name: "Czech Republic",
        flag: "https://flagcdn.com/w40/cz.png",
      },
      {
        name: "Denmark",
        flag: "https://flagcdn.com/w40/dk.png",
      },
      {
        name: "Finland",
        flag: "https://flagcdn.com/w40/fi.png",
      },
      {
        name: "France",
        flag: "https://flagcdn.com/w40/fr.png",
      },
      {
        name: "Germany",
        flag: "https://flagcdn.com/w40/de.png",
      },
      {
        name: "Greece",
        flag: "https://flagcdn.com/w40/gr.png",
      },
      {
        name: "Hungary",
        flag: "https://flagcdn.com/w40/hu.png",
      },
      {
        name: "Ireland",
        flag: "https://flagcdn.com/w40/ie.png",
      },
      {
        name: "Italy",
        flag: "https://flagcdn.com/w40/it.png",
      },
      {
        name: "Luxembourg",
        flag: "https://flagcdn.com/w40/lu.png",
      },
      {
        name: "Netherlands",
        flag: "https://flagcdn.com/w40/nl.png",
      },
      {
        name: "Norway",
        flag: "https://flagcdn.com/w40/no.png",
      },
      {
        name: "Poland",
        flag: "https://flagcdn.com/w40/pl.png",
      },
      {
        name: "Portugal",
        flag: "https://flagcdn.com/w40/pt.png",
      },
      {
        name: "Romania",
        flag: "https://flagcdn.com/w40/ro.png",
      },
      {
        name: "Russia",
        flag: "https://flagcdn.com/w40/ru.png",
      },
      {
        name: "Slovenia",
        flag: "https://flagcdn.com/w40/si.png",
      },
      {
        name: "South Africa",
        flag: "https://flagcdn.com/w40/za.png",
      },
      {
        name: "Spain",
        flag: "https://flagcdn.com/w40/es.png",
      },
      {
        name: "Sweden",
        flag: "https://flagcdn.com/w40/se.png",
      },
      {
        name: "Switzerland",
        flag: "https://flagcdn.com/w40/ch.png",
      },
      {
        name: "United Kingdom",
        flag: "https://flagcdn.com/w40/gb.png",
      },
    ],
  },
];
/* =========================================================
   MEDICAL & CLINICAL
========================================================= */

const MEDICAL_CLINICAL = [
  "Diabetes & Endocrinology",
  "Healthcare Management",
  "Medical Ethics & Health Policies",
  "Ophthalmology",
  "Physical Therapy & Rehabilitation",
  "Reproductive Medicine & Women's Healthcare",
  "Gastroenterology",
  "Infectious Diseases",
  "Obesity",
  "Palliative Care",
  "Radiology",
  "Cardiology",
  "Neurology & Neuroscience",
  "Oncology & Cancer",
  "Pediatrics",
  "Surgery",
];

/* =========================================================
   SUBJECTS
========================================================= */

const SUBJECTS = [
  "Agri, Food & Aqua",
  "Alternative Healthcare",
  "Animal Science & Veterinary",
  "Biochemistry",
  "Biotechnology",
  "Business & Management",
  "Cardiology",
  "Dentistry",
  "EEE & Engineering",
  "Genetics & Molecular Biology",
  "Hematology",
  "Immunology",
  "Materials Science",
  "Microbiology",
  "Nephrology",
  "Nutrition",
  "Nursing",
  "Oncology & Cancer",
  "Pharma",
  "Pharmaceutical Sciences",
  "Psychiatry",
  "Surgery",
  "Vaccines",
  "Digital Health & Technology",
  "Medical Devices",
];

/* =========================================================
   PAGE
========================================================= */

export default function PreviousConferences() {
  return (
    <>
      <Helmet>
        <title>Previous Conferences — Wavexa Technologies</title>

        <meta
          name="description"
          content="Explore previous Wavexa Technologies conferences, international destinations, medical and clinical specialties, and subject-focused healthcare conferences."
        />
      </Helmet>

      {/* =====================================================
          PAGE HERO
      ===================================================== */}

      <div className="relative">
  <PageHero
    eyebrow="Previous Conferences"
    title="Ideas that remain."
    accent="Connections that continue."
    body="Explore previous Wavexa Technologies editions and revisit the conversations, knowledge and connections that continue to shape our Technologies healthcare community."
  />

  {/* Previous Conferences Visual */}
  <img
    src={previousConferencesImage}
    alt="Previous Wavexa Technologies conferences and healthcare events"
    className="
      pointer-events-none
      absolute
      object-contain

      /* MOBILE */
      right-5
      bottom-[-140px]
      w-[170px]

      /* SMALL TABLET */
      sm:right-8
      sm:bottom-[-100px]
      sm:w-[210px]

      /* TABLET */
      md:right-8
      md:bottom-auto
      md:top-[68%]
      md:w-[280px]

      /* DESKTOP */
      lg:right-[8%]
      lg:top-[56%]
      lg:w-[540px]

      /* LARGE DESKTOP */
      xl:right-[6%]
      xl:top-[57%]
      xl:w-[620px]

      -translate-y-1/2
    "
  />
</div>

      {/* =====================================================
          PREVIOUS CONFERENCES
      ===================================================== */}

      <Section>
        <Heading
          eyebrow="Conference Memories"
          title="A look back."
          accent="Across the years."
          align="center"
          body="Explore selected Wavexa Technologies conference editions and revisit the conversations, connections and ideas that shaped our journey."
        />

        <Stagger className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {PREVIOUS_CONFERENCES.map((conference) => (
            <StaggerItem key={`${conference.title}-${conference.year}`}>
  <Link
    to={`/previous-conferences/${conference.slug}`}
    className="block"
  >
    <Card className="group overflow-hidden p-0 transition-all duration-500 hover:-translate-y-1">
                {/* IMAGE */}
                {/* IMAGE */}
<div className="relative aspect-[16/10] overflow-hidden">

  <img
    src={conference.image}
    alt={`${conference.title} — ${conference.year}`}
    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    loading="lazy"
  />

  {/* STRONG OVERLAY FOR BOTH LIGHT & DARK MODE */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

  {/* YEAR */}
  <div className="absolute left-5 top-5">
    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-md">
      <CalendarDays className="h-3.5 w-3.5" />
      {conference.year}
    </span>
  </div>

  {/* ARROW */}
  <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-black/55 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
    <ArrowUpRight className="h-4 w-4 text-white" />
  </div>

  {/* IMAGE TEXT */}
  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
      {conference.edition}
    </p>

    <h3 className="mt-2 font-heading text-2xl font-semibold leading-tight text-white drop-shadow-lg sm:text-3xl">
      {conference.title}
    </h3>

  </div>
</div>

                {/* CARD FOOTER */}
                <div className="flex items-center justify-between px-5 py-4 sm:px-6">
  <div>
    <p className="text-xs font-medium text-muted-foreground">
      {conference.date}
    </p>

    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
      Wavexa Technologies · {conference.year}
    </p>
  </div>

  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary transition-transform duration-300 group-hover:translate-x-1">
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
          Technologies CONFERENCE DIRECTORY
      ===================================================== */}

      <Section veil>
        <Heading
          eyebrow="Technologies Conference Directory"
          title="Explore Wavexa Technologies."
          accent="Across healthcare & science."
          align="center"
          body="Discover conference destinations, medical specialties and subject areas connecting healthcare professionals, researchers and innovators around the world."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* =================================================
              COLUMN 1 — DESTINATIONS
          ================================================= */}

          <Reveal>
            <Card className="h-full overflow-hidden p-0">
              {/* HEADER */}
              <div className="border-b border-border/70 bg-muted/20 px-6 py-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                  Technologies Reach
                </p>

                <h3 className="mt-2 font-heading text-2xl font-semibold">
                  Conference Series
                  <span className="block text-gradient">
                    Around the World
                  </span>
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Explore healthcare conferences and professional events across
                  leading international destinations.
                </p>
              </div>

              {/* DESTINATIONS */}
              <div className="p-6">
                {DESTINATION_GROUPS.map((region) => (
                  <div
                    key={region.name}
                    className="border-b border-border/50 py-5 first:pt-0 last:border-b-0 last:pb-0"
                  >
                    {/* REGION */}
                    <div className="mb-4 flex items-center gap-3">
                      <span className="h-1 w-7 rounded-full bg-gold" />

                      <h4 className="font-heading text-lg font-semibold">
                        {region.name}
                      </h4>
                    </div>

                    {/* COUNTRIES */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      {region.countries.map((country) => (
                        <div
                          key={country.name}
                          className="group flex items-center gap-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                        >
                          <img
  src={country.flag}
  alt={`${country.name} flag`}
  className="h-4 w-6 shrink-0 rounded-[2px] object-cover shadow-sm"
/>

                          <span>{country.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          {/* =================================================
              COLUMN 2 — MEDICAL & CLINICAL
          ================================================= */}

          <Reveal delay={0.1}>
            <Card className="h-full overflow-hidden p-0">
              {/* HEADER */}
              <div className="border-b border-border/70 bg-muted/20 px-6 py-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                  Healthcare Specialties
                </p>

                <h3 className="mt-2 font-heading text-2xl font-semibold">
                  Medical & Clinical
                  <span className="block text-gradient">
                    Webinars & Conferences
                  </span>
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Explore clinical specialties and medical disciplines
                  represented across the Technologies conference community.
                </p>
              </div>

              {/* LIST */}
              <div className="p-6">
                <div className="grid gap-1">
                  {MEDICAL_CLINICAL.map((topic, index) => (
                    <div
                      key={topic}
                      className="group flex items-start gap-3 rounded-lg px-2.5 py-2.5 transition-all duration-200 hover:bg-muted/40"
                    >
                      <span className="mt-0.5 font-numeric text-[10px] tracking-[0.15em] text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm leading-relaxed text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
  {topic}
</span>

                      
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>

          {/* =================================================
              COLUMN 3 — SUBJECTS
          ================================================= */}

          <Reveal delay={0.2}>
            <Card className="h-full overflow-hidden p-0">
              {/* HEADER */}
              <div className="border-b border-border/70 bg-muted/20 px-6 py-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                  Explore By Interest
                </p>

                <h3 className="mt-2 font-heading text-2xl font-semibold">
                  Webinars & Conferences
                  <span className="block text-gradient">
                    By Subject
                  </span>
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Discover focused topics spanning healthcare, science,
                  technology and emerging areas of medicine.
                </p>
              </div>

              {/* SUBJECT LIST */}
              <div className="p-6">
                <div className="grid gap-1">
                  {SUBJECTS.map((subject) => (
                    <div
                      key={subject}
                      className="group flex items-start gap-3 rounded-lg px-2.5 py-2.5 transition-all duration-200 hover:bg-muted/40"
                    >
                      <span className="mt-0.5 text-primary">
                        ›
                      </span>

                      <span className="text-sm leading-relaxed text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                        {subject}
                      </span>

                      
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* =====================================================
          THE JOURNEY CONTINUES
      ===================================================== */}

      {/* =====================================================
    UPCOMING CONFERENCES
===================================================== */}

<Section veil>
  <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

    {/* LEFT — LOOKING FORWARD */}
    <Heading
      eyebrow="Looking Forward"
      title="The journey"
      accent="continues."
      body="Every Wavexa edition creates new conversations, new connections and new possibilities. Explore upcoming Wavexa Technologies conferences and discover the next opportunities to connect, learn and shape the future of healthcare."
    />

    {/* RIGHT — UPCOMING CONFERENCES CARD */}
    <Reveal delay={0.1}>
      <Card className="relative overflow-hidden p-7 sm:p-9">

        {/* DECORATIVE GLOW */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative">

          {/* EYEBROW */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
            Upcoming Conferences
          </p>

          {/* TITLE */}
          <h3 className="mt-3 font-heading text-3xl font-semibold">
            Discover what’s
            <span className="block text-gradient">
              coming next.
            </span>
          </h3>

          {/* DESCRIPTION */}
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Explore upcoming Wavexa Technologies conferences, discover new
            opportunities and become part of the conversations shaping
            healthcare, innovation and future medicine.
          </p>

          {/* BUTTON */}
          <div className="mt-7">
            <ButtonLink to="/upcoming-conferences" size="lg">
              View Upcoming Conferences
              <ArrowUpRight className="h-4 w-4" />
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