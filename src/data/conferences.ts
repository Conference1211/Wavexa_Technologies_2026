import { BUSINESS } from "@/data/business";
import heroAsset from "@/assets/hero.png";
import lungsAsset from "@/assets/lungs.jpg";
import cardiologyAsset from "@/assets/cardiology.jpg";
import diabetesAsset from "@/assets/Diabetes1.jpg";
import gynecologyAsset from "@/assets/gyenicology.jpeg";

import {
  CONFERENCE as LEGACY_CONFERENCE,
  STATS as LEGACY_STATS,
  WHY_ATTEND as LEGACY_WHY_ATTEND,
  SPEAKERS as LEGACY_SPEAKERS,
  TRACKS as LEGACY_TRACKS,
  SCHEDULE as LEGACY_SCHEDULE,
  SPONSOR_TIERS as LEGACY_SPONSOR_TIERS,
  TESTIMONIALS as LEGACY_TESTIMONIALS,
  FAQS as LEGACY_FAQS,
  TICKETS as LEGACY_TICKETS,
  REGISTRATION_DEADLINES as LEGACY_REGISTRATION_DEADLINES,
  GALLERY as LEGACY_GALLERY,
  VENUE_FEATURES as LEGACY_VENUE_FEATURES,
  ABSTRACT_CATEGORIES as LEGACY_ABSTRACT_CATEGORIES,
  ABSTRACT_DATES as LEGACY_ABSTRACT_DATES,
  ABSTRACT_PROCESS as LEGACY_ABSTRACT_PROCESS,
  ABSTRACT_BENEFITS as LEGACY_ABSTRACT_BENEFITS,
  ABSTRACT_AWARDS as LEGACY_ABSTRACT_AWARDS,
  ABSTRACT_GUIDELINES as LEGACY_ABSTRACT_GUIDELINES,
} from "@/data/conferenceLegacy";

export type ConferenceTrack = (typeof LEGACY_TRACKS)[number];
export type ConferenceScheduleDay = (typeof LEGACY_SCHEDULE)[number];
export type ConferenceTicket = (typeof LEGACY_TICKETS)[number];

export interface Conference {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  edition: string;
  dates: string;
  startISO: string;
  venue: string;
  email: string;
  phone: string;
  image: string;
  hero: { eyebrow: string; image?: string };
  about: {
    overview: string;
    theme: string;
    focus: string;
  };
  stats: typeof LEGACY_STATS;
  whyAttend: typeof LEGACY_WHY_ATTEND;
  speakers: typeof LEGACY_SPEAKERS;
  tracks: ConferenceTrack[];
  schedule: ConferenceScheduleDay[];
  sponsorTiers: typeof LEGACY_SPONSOR_TIERS;
  testimonials: typeof LEGACY_TESTIMONIALS;
  faqs: typeof LEGACY_FAQS;
  tickets: ConferenceTicket[];
  registrationDeadlines: typeof LEGACY_REGISTRATION_DEADLINES;
  gallery: typeof LEGACY_GALLERY;
  venueFeatures: typeof LEGACY_VENUE_FEATURES;
  abstractCategories: typeof LEGACY_ABSTRACT_CATEGORIES;
  abstractDates: typeof LEGACY_ABSTRACT_DATES;
  abstractProcess: typeof LEGACY_ABSTRACT_PROCESS;
  abstractBenefits: typeof LEGACY_ABSTRACT_BENEFITS;
  abstractAwards: typeof LEGACY_ABSTRACT_AWARDS;
  abstractGuidelines: typeof LEGACY_ABSTRACT_GUIDELINES;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const topicTracks = (shortName: string, icon: string): ConferenceTrack[] =>
  [
    `${shortName} — Emerging Research & Innovation`,
    `${shortName} — Clinical Advances & Best Practices`,
    `${shortName} — Diagnostics, Technology & AI`,
    `${shortName} — Prevention, Management & Patient Care`,
    `${shortName} — Translational Research & Future Directions`,
    `${shortName} — Global Health, Policy & Collaboration`,
  ].map((title, index) => ({
    title,
    icon,
    sessions: 6 + index,
    body: `Explore current research, clinical developments, technologies and practical approaches in ${shortName.toLowerCase()}. This scientific track brings together clinicians, researchers and healthcare professionals to exchange evidence, innovations and future directions.`,
    subTracks: [
      "Recent research and evidence",
      "Clinical practice and emerging approaches",
      "Technology and digital innovation",
      "Patient-centered care",
      "Future research directions",
    ],
  }));

const makeSchedule = (
  shortName: string,
  dates: string,
  tracks: ConferenceTrack[],
): ConferenceScheduleDay[] => {
  let firstDate = dates;
  let secondDate = dates;

  // Handles dates like:
  // "20–21 December 2026"
  // "09–10 December 2026"
  // "12–13 November 2026"
  const match = dates.match(/^(\d{1,2})\s*[–-]\s*(\d{1,2})\s+(.+)$/);

  if (match) {
    const firstDay = match[1];
    const secondDay = match[2];
    const monthYear = match[3];

    firstDate = `${firstDay} ${monthYear}`;
    secondDate = `${secondDay} ${monthYear}`;
  }

  const makeItems = (offset: number) =>
  tracks.slice(offset, offset + 3).map((track, index) => ({
    title: track.title,
    speaker: "International Faculty",
    type:
      index === 0
        ? "Keynote"
        : index === 1
          ? "Plenary"
          : "Scientific Session",
  }));

  return [
    {
      day: "Day 1",
      date: firstDate,
      theme: `${shortName} — Science & Innovation`,
      items: makeItems(0),
    },
    {
      day: "Day 2",
      date: secondDate,
      theme: `${shortName} — Clinical Practice & Future Directions`,
      items: makeItems(3),
    },
  ] as ConferenceScheduleDay[];
};

const formatDeadline = (startISO: string, daysBefore: number) => {
  const date = new Date(startISO);
  date.setUTCDate(date.getUTCDate() - daysBefore);
  return date.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric", timeZone: "UTC" });
};

const makeConference = (
  input: Pick<Conference, "slug" | "name" | "shortName" | "dates" | "startISO" | "venue" | "tagline" | "image" | "about" | "hero"> & Partial<Conference>,
): Conference => {
  const tracks = input.tracks ?? topicTracks(input.shortName, "Microscope");
  const registrationDeadlines = input.registrationDeadlines ?? {
    earlyBird: formatDeadline(input.startISO, 40),
    standard: formatDeadline(input.startISO, 35),
    final: formatDeadline(input.startISO, 10),
  };
  return {
    id: input.slug,
    email: BUSINESS.email,
    phone: BUSINESS.phone,
    edition: input.edition ?? input.startISO.slice(0, 4),
    stats: input.stats ?? LEGACY_STATS,
    whyAttend: input.whyAttend ?? LEGACY_WHY_ATTEND,
    speakers: input.speakers ?? LEGACY_SPEAKERS,
    tracks,
    schedule: input.schedule ?? makeSchedule(input.shortName, input.dates, tracks),
    sponsorTiers: input.sponsorTiers ?? LEGACY_SPONSOR_TIERS,
    testimonials: input.testimonials ?? LEGACY_TESTIMONIALS,
    faqs: input.faqs ?? LEGACY_FAQS,
    tickets: input.tickets ?? LEGACY_TICKETS,
    registrationDeadlines,
    gallery: input.gallery ?? LEGACY_GALLERY,
    venueFeatures: input.venueFeatures ?? LEGACY_VENUE_FEATURES,
    abstractCategories: input.abstractCategories ?? LEGACY_ABSTRACT_CATEGORIES,
    abstractDates: input.abstractDates ?? LEGACY_ABSTRACT_DATES,
    abstractProcess: input.abstractProcess ?? LEGACY_ABSTRACT_PROCESS,
    abstractBenefits: input.abstractBenefits ?? LEGACY_ABSTRACT_BENEFITS,
    abstractAwards: input.abstractAwards ?? LEGACY_ABSTRACT_AWARDS,
    abstractGuidelines: input.abstractGuidelines ?? LEGACY_ABSTRACT_GUIDELINES,
    ...input,
  };
};

const current = makeConference({
  slug: "global-summit-on-diabetes-cardiology-and-cardiometabolic-health",
  name: LEGACY_CONFERENCE.name,
  shortName: "Diabetes, Cardiology & Cardiometabolic Health",
  tagline: LEGACY_CONFERENCE.tagline,
  edition: LEGACY_CONFERENCE.edition,
  dates: "09–10 December 2026",
  startISO: LEGACY_CONFERENCE.startISO,
  venue: "Global Webinar",
  image: heroAsset,
  hero: { eyebrow: "Global Medical Summit · 2026", image: heroAsset },
  about: {
    overview: "A two-day international scientific programme bringing together clinicians, researchers, cardiologists, diabetologists, healthcare professionals, policymakers and healthcare innovators.",
    theme: LEGACY_CONFERENCE.tagline,
    focus: "Diabetes, cardiology, cardiometabolic health, digital innovation and integrated care.",
  },
  stats: LEGACY_STATS,
  whyAttend: LEGACY_WHY_ATTEND,
  speakers: LEGACY_SPEAKERS,
  tracks: LEGACY_TRACKS,
  schedule: LEGACY_SCHEDULE,
  sponsorTiers: LEGACY_SPONSOR_TIERS,
  testimonials: LEGACY_TESTIMONIALS,
  faqs: LEGACY_FAQS,
  tickets: LEGACY_TICKETS,
  registrationDeadlines: LEGACY_REGISTRATION_DEADLINES,
  gallery: LEGACY_GALLERY,
  venueFeatures: LEGACY_VENUE_FEATURES,
  abstractCategories: LEGACY_ABSTRACT_CATEGORIES,
  abstractDates: LEGACY_ABSTRACT_DATES,
  abstractProcess: LEGACY_ABSTRACT_PROCESS,
  abstractBenefits: LEGACY_ABSTRACT_BENEFITS,
  abstractAwards: LEGACY_ABSTRACT_AWARDS,
  abstractGuidelines: LEGACY_ABSTRACT_GUIDELINES,
});

const upcoming = [
  { slug: "international-conference-on-dental-and-oral-health", name: "International Conference on Dental and Oral Health", shortName: "Dental & Oral Health", dates: "20–21 December 2026", startISO: "2026-12-20T09:00:00Z", image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1400&q=85", tagline: "Advancing research, technology and patient-centered oral healthcare.", focus: "Dental science, oral medicine, clinical innovation and digital dentistry." },
  { slug: "international-conference-on-psychiatry-and-mental-health", name: "International Conference on Psychiatry and Mental Health", shortName: "Psychiatry & Mental Health", dates: "12–13 November 2026", startISO: "2026-11-12T09:00:00Z", image: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?auto=format&fit=crop&w=1400&q=85", tagline: "Connecting research, clinical practice and innovation in mental healthcare.", focus: "Psychiatry, mental health, neuroscience, prevention and integrated care." },
  { slug: "international-conference-on-copd-and-lung-health", name: "International Conference on COPD and Lung Health", shortName: "COPD & Lung Health", dates: "15–16 February 2027", startISO: "2027-02-15T09:00:00Z", image: lungsAsset, tagline: "New perspectives in respiratory medicine and lung health.", focus: "COPD, respiratory medicine, pulmonary research and prevention." },
  { slug: "international-conference-on-cardiology", name: "International Conference on Cardiology", shortName: "Cardiology", dates: "11–12 March 2027", startISO: "2027-03-11T09:00:00Z", image: cardiologyAsset, tagline: "Exploring advances in cardiovascular science and patient care.", focus: "Cardiology, cardiovascular prevention, diagnostics and therapeutics." },
  { slug: "world-congress-on-diabetes-and-pediatric-endocrinology", name: "World Congress on Diabetes and Pediatric Endocrinology", shortName: "Diabetes & Pediatric Endocrinology", dates: "30–31 March 2027", startISO: "2027-03-30T09:00:00Z", image: diabetesAsset, tagline: "Advancing pediatric metabolic health through science and collaboration.", focus: "Pediatric diabetes, endocrinology, growth, metabolism and child health." },
  { slug: "world-health-congress-on-women-health-and-gynecology", name: "World Health Congress on Women Health and Gynecology", shortName: "Women’s Health & Gynecology", dates: "22–23 April 2027", startISO: "2027-04-22T09:00:00Z", image: gynecologyAsset, tagline: "Research and innovation across the continuum of women’s health.", focus: "Gynecology, reproductive health, maternal care and women’s health." },
];

export const CONFERENCES: Conference[] = [
  current,
  ...upcoming.map((item) => makeConference({
    ...item,
    edition: item.startISO.slice(0, 4),
    venue: "International",
    hero: {
  eyebrow: `International Conference · ${item.startISO.slice(0, 4)}`,
  image: item.image,
},
    about: {
      overview: `An international scientific conference focused on ${item.shortName.toLowerCase()}, bringing together healthcare professionals, researchers, clinicians and innovators.`,
      theme: item.tagline,
      focus: item.focus,
    },
  })),
];

export const UPCOMING_CONFERENCES = CONFERENCES.slice(1);
export const DEFAULT_CONFERENCE_ID = current.id;

export function getConference(conferenceId?: string | null): Conference | undefined {
  if (!conferenceId) return undefined;
  return CONFERENCES.find((conference) => conference.id === conferenceId || conference.slug === conferenceId);
}

export function conferencePath(conferenceId: string, path = "") {
  const suffix = path === "/" ? "" : path;
  return `/conferences/${conferenceId}${suffix}`;
}

export { slugify };
