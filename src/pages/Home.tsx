import { Helmet } from "@/components/Seo";
import { ArrowRight } from "lucide-react";

import { Hero } from "@/components/sections/Hero";
import { PosterSlider } from "@/components/sections/PosterSlider";

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

import { Newsletter } from "@/components/forms";

import { useConference } from "@/context/ConferenceContext";
import { conferencePath } from "@/data/conferences";

export default function Home() {
  const conference = useConference();

  return (
    <>
      {/* =========================================================
          SEO
      ========================================================= */}
      <Helmet>
        <title>{conference.name}</title>

        <meta
          name="description"
          content={`${conference.name} — a two-day international webinar on ${conference.dates}, bringing together global experts and healthcare professionals.`}
        />

        <meta
          name="author"
          content="Wavexa Conferences"
        />

        <meta
          property="og:site_name"
          content="Wavexa Conferences"
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content={conference.name}
        />

        <meta
          property="og:description"
          content={`Join ${conference.name} on ${conference.dates}. ${conference.about.focus}`}
        />

        <meta
          property="og:url"
          content="/"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <link
          rel="canonical"
          href="/"
        />

        {/* =========================================================
            EVENT SCHEMA
        ========================================================= */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: conference.name,
            startDate: "2026-12-09",
            endDate: "2026-12-10",
            eventAttendanceMode:
              "https://schema.org/OnlineEventAttendanceMode",
            location: {
              "@type": "VirtualLocation",
              url: "/",
            },
            description: conference.about.overview,
          })}
        </script>
      </Helmet>

      {/* =========================================================
          HERO
          Main homepage hero
          Keep Hero component as the single source of truth
      ========================================================= */}
      <Hero />

      {/* =========================================================
          CONFERENCE POSTER SLIDER
      ========================================================= */}
      <PosterSlider />

      {/* =========================================================
          ABOUT THE CONFERENCE
      ========================================================= */}
      <Section
        id="about"
        veil
      >
        <Heading
          eyebrow="About the Conference"
          title="Where evidence meets"
          accent="consequence"
          body={conference.about.overview}
        />

        <Reveal
          delay={0.1}
          className="mt-8 sm:mt-10"
        >
          <ButtonLink
            to={conferencePath(conference.id, "/about")}
            variant="outline"
          >
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

        <Stagger
          className="
            mt-10
            grid
            gap-5
            sm:mt-12
            sm:gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {conference.whyAttend.map((item) => (
            <StaggerItem key={item.title}>
              <Card className="h-full">
                <h3
                  className="
                    text-xl
                    font-bold
                    leading-[1.08]
                    tracking-[-0.035em]
                    sm:text-2xl
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-2.5
                    text-sm
                    leading-relaxed
                    text-muted-foreground
                  "
                >
                  {item.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* =========================================================
          REGISTRATION CTA
      ========================================================= */}
      <Section>
        <Reveal>
          <div
            className="
              glass-strong
              gradient-border
              relative
              overflow-hidden
              rounded-[2rem]
              px-5
              py-12
              text-center
              sm:rounded-[2.5rem]
              sm:px-10
              sm:py-14
              lg:px-16
              lg:py-16
            "
          >
            {/* Background veil */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                veil
                opacity-70
              "
            />

            <div
              className="
                relative
                mx-auto
                max-w-5xl
              "
            >
              {/* Date Badge */}
              <Badge tone="gold">
                {conference.dates}
              </Badge>

              {/* =================================================
                  HEADING
                  Hero typography style,
                  but slightly smaller for lower section
              ================================================= */}
              <h2
                className="
                  mx-auto
                  mt-6
                  max-w-5xl
                  text-[1.9rem]
                  font-bold
                  leading-[1.08]
                  tracking-[-0.035em]
                  text-foreground
                  text-balance
                  sm:text-[2.25rem]
                  md:text-[2.6rem]
                  lg:text-[2.9rem]
                  xl:text-[3.1rem]
                "
              >
                Join the{" "}
                <span className="text-gradient">
                  {conference.shortName}
                </span>
              </h2>

              {/* Description */}
              <p
                className="
                  mx-auto
                  mt-4
                  max-w-xl
                  text-[15px]
                  leading-relaxed
                  text-muted-foreground
                  sm:text-[17px]
                "
              >
                Be part of a two-day international webinar
                bringing together global experts to explore
                the latest advances in diabetes, cardiology,
                and cardiometabolic health.
              </p>

              {/* CTA */}
              <div
                className="
                  mt-8
                  flex
                  justify-center
                  sm:mt-9
                "
              >
                <ButtonLink
                  to={conferencePath(conference.id, "/registration")}
                  size="lg"
                  className="group"
                >
                  Register Now

                  <ArrowRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* =========================================================
          SUBMIT ABSTRACT
      ========================================================= */}
      <Section id="submit-abstract">
        <Reveal>
          <div
            className="
              glass
              gradient-border
              relative
              overflow-hidden
              rounded-[2rem]
              px-5
              py-12
              text-center
              sm:rounded-[2.5rem]
              sm:px-10
              sm:py-14
              lg:px-16
              lg:py-16
            "
          >
            <div
              className="
                mx-auto
                max-w-5xl
              "
            >
              {/* Badge */}
              <Badge>
                Call for Abstracts
              </Badge>

              {/* =================================================
                  HEADING
                  Same font style as Hero,
                  reduced size for section hierarchy
              ================================================= */}
              <h2
                className="
                  mx-auto
                  mt-6
                  max-w-5xl
                  text-[1.9rem]
                  font-bold
                  leading-[1.08]
                  tracking-[-0.035em]
                  text-foreground
                  text-balance
                  sm:text-[2.25rem]
                  md:text-[2.6rem]
                  lg:text-[2.9rem]
                  xl:text-[3.1rem]
                "
              >
                Share your research with the{" "}
                <span className="text-gradient">
                  global community
                </span>
              </h2>

              {/* Description */}
              <p
                className="
                  mx-auto
                  mt-4
                  max-w-xl
                  text-[15px]
                  leading-relaxed
                  text-muted-foreground
                  sm:text-[17px]
                "
              >
                Submit your research and clinical insights to {conference.name} and contribute to meaningful scientific exchange.
              </p>

              {/* CTA */}
              <div
                className="
                  mt-8
                  flex
                  justify-center
                  sm:mt-9
                "
              >
                <ButtonLink
                  to={conferencePath(conference.id, "/submit-abstract")}
                  size="lg"
                  variant="gold"
                >
                  Submit an Abstract
                </ButtonLink>
              </div>
            </div>
          </div>
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
    </>
  );
}