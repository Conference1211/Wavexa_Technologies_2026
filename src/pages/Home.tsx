import * as React from "react";
import { Helmet } from "@/components/Seo";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Hero, Countdown } from "@/components/sections/Hero";

import {
  Section,
  Heading,
  Card,
  Reveal,
  Stagger,
  StaggerItem,
  Badge,
  ButtonLink,
} from "@/components/ui-kit";

import { Timeline } from "@/components/Timeline";
import { FaqAccordion, Newsletter } from "@/components/forms";

import {
  CONFERENCE,
  WHY_ATTEND,
  SPEAKERS,
  TRACKS,
  SCHEDULE,
  TESTIMONIALS,
  FAQS,
} from "@/constants/conference";

const FEATURED_SPEAKERS = SPEAKERS.slice(0, 4);

export default function Home() {
  return (
    <>
      {/* =========================================================
          SEO
      ========================================================= */}
      <Helmet>
        <title>
          Global Summit on Diabetes, Cardiology & Cardiometabolic Health 2026
        </title>

        <meta
          name="description"
          content="Global Summit on Diabetes, Cardiology & Cardiometabolic Health 2026 — a two-day international webinar on December 2–3, 2026, bringing together global experts in diabetes, cardiology and cardiometabolic health."
        />

        <meta name="author" content="Wavexa Conferences" />

        <meta
          property="og:site_name"
          content="Wavexa Conferences"
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:title"
          content="Global Summit on Diabetes, Cardiology & Cardiometabolic Health 2026"
        />

        <meta
          property="og:description"
          content="Join the Global Summit on Diabetes, Cardiology & Cardiometabolic Health 2026 on December 2–3, 2026 — a two-day international webinar focused on innovation and integrated care."
        />

        <meta property="og:url" content="/" />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <link rel="canonical" href="/" />

        {/* Event Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: CONFERENCE.name,
            startDate: "2026-12-02",
            endDate: "2026-12-03",
            eventAttendanceMode:
              "https://schema.org/OnlineEventAttendanceMode",
            location: {
              "@type": "VirtualLocation",
              url: "/",
            },
            description:
              "Global Summit on Diabetes, Cardiology & Cardiometabolic Health 2026 — a two-day international webinar focused on advancing innovation and integrated care in diabetes and cardiometabolic health.",
          })}
        </script>
      </Helmet>

      {/* =========================================================
          HERO
      ========================================================= */}
      <Hero />

      {/* =========================================================
          COUNTDOWN
      ========================================================= */}
      <Section className="pt-0">
        <Reveal>
          <Countdown />
        </Reveal>
      </Section>

      {/* =========================================================
          ABOUT
      ========================================================= */}
      <Section id="about" veil>
        <Heading
          eyebrow="About the Conference"
          title="Where evidence meets"
          accent="consequence"
          body={`${CONFERENCE.name} brings together clinicians, researchers, cardiologists, diabetologists, endocrinologists, healthcare professionals, policymakers, industry experts, and healthcare innovators from around the world. The 2026 Global Summit will be held as a two-day international webinar on ${CONFERENCE.dates}, focused on advancing innovation and integrated care in diabetes and cardiometabolic health.`}
        />

        <Reveal delay={0.1} className="mt-10">
          <ButtonLink to="/about" variant="outline">
            More About the Conference
          </ButtonLink>
        </Reveal>
      </Section>

      {/* =========================================================
          WHY ATTEND
      ========================================================= */}
      <Section>
        <Heading
          eyebrow="Why Attend"
          title="What two days"
          accent="can inspire"
          align="center"
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHY_ATTEND.map((w) => (
            <StaggerItem key={w.title}>
              <Card className="h-full">
                <h3 className="font-heading text-2xl font-semibold">
                  {w.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {w.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* =========================================================
          FEATURED SPEAKERS
          Currently hidden
      ========================================================= */}

      {/*
      <Section veil>
        <Heading
          eyebrow="Faculty"
          title="Featured"
          accent="speakers"
          align="center"
        />

        <Stagger className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {FEATURED_SPEAKERS.map((s, i) => (
            <StaggerItem key={s.name}>
              <SpeakerCard speaker={s} index={i} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12 text-center">
          <ButtonLink
            to="/speakers"
            size="lg"
            variant="outline"
          >
            See All Speakers
          </ButtonLink>
        </Reveal>
      </Section>
      */}

      {/* =========================================================
          SCIENTIFIC TRACKS
      ========================================================= */}
      <Section id="tracks">
        <Heading
          eyebrow="Scientific Programme"
          title="Fifteen scientific tracks,"
          accent="one global conversation"
          align="center"
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TRACKS.slice(0, 6).map((t) => {
            const C =
              (Icons as unknown as Record<
                string,
                React.ComponentType<{ className?: string }>
              >)[t.icon] ?? Icons.Sparkles;

            return (
              <StaggerItem key={t.title}>
                <Card className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl [background-image:var(--gradient-brand)] text-primary-foreground">
                      <C className="h-5 w-5" />
                    </span>

                    <Badge tone="muted">
                      Scientific Track
                    </Badge>
                  </div>

                  <h3 className="mt-5 font-heading text-xl font-semibold">
                    {t.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t.body}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-12 text-center">
          <ButtonLink
            to="/tracks"
            size="lg"
            variant="outline"
          >
            Explore All Scientific Tracks
          </ButtonLink>
        </Reveal>
      </Section>

      {/* =========================================================
          SCHEDULE
      ========================================================= */}
      <Section id="schedule" veil>
        <Heading
          eyebrow="Programme"
          title="A first look at"
          accent="Day One"
          align="center"
        />

        <Reveal className="mx-auto mt-14 max-w-3xl">
          <Timeline items={SCHEDULE[0]!.items} />
        </Reveal>

        <Reveal className="mt-12 text-center">
          <ButtonLink
            to="/schedule"
            size="lg"
            variant="outline"
          >
            View the Full Two-Day Programme
          </ButtonLink>
        </Reveal>
      </Section>

      {/* =========================================================
          REGISTRATION CTA
      ========================================================= */}
      <Section>
        <Reveal>
          <div className="glass-strong gradient-border relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 veil opacity-70"
            />

            <div className="relative">
              <Badge tone="gold">
                December 2–3, 2026
              </Badge>

              <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">
                Join the{" "}
                <span className="text-gradient italic">
                  Global Summit
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
                Be part of a two-day international webinar bringing
                together global experts to explore the latest advances
                in diabetes, cardiology, and cardiometabolic health.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <ButtonLink
                  to="/registration"
                  size="lg"
                  className="group"
                >
                  Register Now

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </ButtonLink>

                <ButtonLink
                  to="/submit-abstract"
                  size="lg"
                  variant="outline"
                >
                  Submit Abstract
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* =========================================================
          SPONSORS
          Currently hidden
      ========================================================= */}

      {/*
      <Section veil>
        <Heading
          eyebrow="Partners"
          title="Backed by the names"
          accent="shaping health-tech"
          align="center"
        />

        <Reveal className="mt-12 text-center">
          <ButtonLink
            to="/sponsors"
            size="lg"
            variant="outline"
          >
            Meet Our Sponsors
          </ButtonLink>
        </Reveal>
      </Section>
      */}

      {/* =========================================================
          TESTIMONIALS
      =========================================================
      <Section>
        <Heading
          eyebrow="Delegates"
          title="What people say"
          accent="from our delegates"
          align="center"
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <TestimonialCard
                quote={t.quote}
                name={t.name}
                role={t.role}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
       */}

      {/* =========================================================
          SUBMIT ABSTRACT
      ========================================================= */}
      <Section id="submit-abstract">
        <div className="glass gradient-border relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center sm:px-16">
          <Badge>
            Call for Abstracts
          </Badge>

          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">
            Share your research with the{" "}
            <span className="text-gradient italic">
              global community
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
            Submit your research and clinical insights to the Global
            Summit on Diabetes, Cardiology & Cardiometabolic Health
            2026 and contribute to meaningful scientific exchange.
          </p>

          <div className="mt-9">
            <ButtonLink
              to="/submit-abstract"
              size="lg"
              variant="gold"
            >
              Submit an Abstract
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* =========================================================
          FAQ
      ========================================================= */}
      <Section>
        <Heading
          eyebrow="FAQ"
          title="Answers before"
          accent="you register"
          align="center"
        />

        <Reveal className="mx-auto mt-14 max-w-3xl">
          <FaqAccordion items={FAQS.slice(0, 5)} />
        </Reveal>

        <Reveal className="mt-12 text-center">
          <ButtonLink
            to="/faq"
            variant="outline"
            size="lg"
          >
            See All Questions
          </ButtonLink>
        </Reveal>
      </Section>

      {/* =========================================================
          NEWSLETTER
      ========================================================= */}
      <Section veil>
        <Reveal>
          <Newsletter />
        </Reveal>
      </Section>

      {/* =========================================================
          CONTACT
      ========================================================= */}
      <Section id="contact">
        <Heading
          eyebrow="Contact"
          title="Talk to the"
          accent="programme team"
          align="center"
        />

        <Reveal className="mt-12 text-center">
          <ButtonLink
            to="/contact"
            size="lg"
            variant="outline"
          >
            Get in Touch
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}