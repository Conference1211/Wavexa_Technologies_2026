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
import { SpeakerCard, TestimonialCard } from "@/components/cards";
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
      <Helmet>
        <title>Wavexa Technologies 2026 — World Health Innovation Conference</title>
        <meta
          name="description"
          content="Wavexa Technologies 2026: four days in Geneva connecting healthcare, innovation, research and future medicine."
        />
        <meta name="author" content="Wavexa Technologies" />
        <meta property="og:site_name" content="Wavexa Technologies" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Wavexa Technologies 2026 — World Health Innovation Conference" />
        <meta
          property="og:description"
          content="Wavexa Technologies 2026: four days in Geneva connecting healthcare, innovation, research and future medicine."
        />
        <meta property="og:url" content="/" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "Wavexa Technologies 2026",
            startDate: "2026-10-12",
            endDate: "2026-10-15",
            eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
            location: {
              "@type": "Place",
              name: "Palais Lumière Convention Centre",
              address: "Quai Wilson 41, 1201 Geneva, Switzerland",
            },
          })}
        </script>
      </Helmet>

      {/* Cinematic hero, stats, countdown-teaser CTAs */}
      <Hero />

      {/* Countdown */}
      <Section className="pt-0">
        <Reveal>
          <Countdown />
        </Reveal>
      </Section>

      {/* About / mission */}
      <Section veil>
        <Heading
          eyebrow="About"
          title="Where evidence meets"
          accent="consequence"
          body={`${CONFERENCE.name} is an independent, non-profit convening body for the people who decide what medicine looks like next — clinicians, researchers, regulators, founders and payers, in one room, for four days in ${CONFERENCE.city}.`}
        />
        <Reveal delay={0.1} className="mt-10">
          <ButtonLink to="/about" variant="outline">
            More about Wavexa
          </ButtonLink>
        </Reveal>
      </Section>

      {/* Why Attend */}
      <Section>
        <Heading eyebrow="Why attend" title="What four days" accent="actually gets you" align="center" />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHY_ATTEND.map((w) => (
            <StaggerItem key={w.title}>
              <Card className="h-full">
                <h3 className="font-heading text-2xl font-semibold">{w.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Featured Speakers */}
      <Section veil>
        <Heading eyebrow="Faculty" title="Featured" accent="speakers" align="center" />
        <Stagger className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {FEATURED_SPEAKERS.map((s, i) => (
            <StaggerItem key={s.name}>
              <SpeakerCard speaker={s} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-12 text-center">
          <ButtonLink to="/speakers" size="lg" variant="outline">
            See all 200 speakers
          </ButtonLink>
        </Reveal>
      </Section>

      {/* Conference Tracks */}
      <Section>
        <Heading eyebrow="Programme" title="Six tracks," accent="one hundred sessions" align="center" />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TRACKS.map((t) => {
            const C =
              (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
                t.icon
              ] ?? Icons.Sparkles;
            return (
              <StaggerItem key={t.title}>
                <Card className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl [background-image:var(--gradient-brand)] text-primary-foreground">
                      <C className="h-5 w-5" />
                    </span>
                    <Badge tone="muted">{t.sessions} sessions</Badge>
                  </div>
                  <h3 className="mt-5 font-heading text-xl font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal className="mt-12 text-center">
          <ButtonLink to="/tracks" size="lg" variant="outline">
            Explore all tracks
          </ButtonLink>
        </Reveal>
      </Section>

      {/* Agenda Timeline (Day 1 preview) */}
      <Section veil>
        <Heading eyebrow="Schedule" title="A first look at" accent="Day One" align="center" />
        <Reveal className="mt-14 mx-auto max-w-3xl">
          <Timeline items={SCHEDULE[0]!.items} />
        </Reveal>
        <Reveal className="mt-12 text-center">
          <ButtonLink to="/schedule" size="lg" variant="outline">
            View the full four-day agenda
          </ButtonLink>
        </Reveal>
      </Section>

      {/* Registration CTA */}
      <Section>
        <Reveal>
          <div className="glass-strong gradient-border relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center sm:px-16">
            <div aria-hidden className="pointer-events-none absolute inset-0 veil opacity-70" />
            <div className="relative">
              <Badge tone="gold">Early bird until 30 June</Badge>
              <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">
                Reserve your seat in <span className="text-gradient italic">Geneva</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
                Passes from €390. Group bookings of five or more save 20% automatically at checkout.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <ButtonLink to="/registration" size="lg" className="group">
                  Register Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </ButtonLink>
                <ButtonLink to="/registration" size="lg" variant="outline">
                  View passes
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Sponsors teaser */}
      <Section veil>
        <Heading eyebrow="Partners" title="Backed by the names" accent="shaping health-tech" align="center" />
        <Reveal className="mt-12 text-center">
          <ButtonLink to="/sponsors" size="lg" variant="outline">
            Meet our sponsors
          </ButtonLink>
        </Reveal>
      </Section>

      {/* Testimonials */}
      <Section>
        <Heading eyebrow="Delegates" title="What people say" accent="after Geneva" align="center" />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <TestimonialCard quote={t.quote} name={t.name} role={t.role} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Submit Abstract CTA */}
      <Section veil>
        <div className="glass gradient-border relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center sm:px-16">
          <Badge>Call for papers</Badge>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">
            Present your research in <span className="text-gradient italic">Geneva</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
            Six research categories, double-blind review, and CHF 45,000 in awards. Abstracts close
            31 March 2026.
          </p>
          <div className="mt-9">
            <ButtonLink to="/submit-abstract" size="lg" variant="gold">
              Submit an abstract
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <Heading eyebrow="FAQ" title="Answers before" accent="you book" align="center" />
        <Reveal className="mx-auto mt-14 max-w-3xl">
          <FaqAccordion items={FAQS.slice(0, 5)} />
        </Reveal>
        <Reveal className="mt-12 text-center">
          <ButtonLink to="/faq" variant="outline" size="lg">
            See all questions
          </ButtonLink>
        </Reveal>
      </Section>

      {/* Newsletter */}
      <Section veil>
        <Reveal>
          <Newsletter />
        </Reveal>
      </Section>

      {/* Contact teaser */}
      <Section>
        <Heading eyebrow="Contact" title="Talk to the" accent="programme team" align="center" />
        <Reveal className="mt-12 text-center">
          <ButtonLink to="/contact" size="lg" variant="outline">
            Get in touch
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
