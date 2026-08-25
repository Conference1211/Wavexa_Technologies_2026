import type * as React from "react";
import { Helmet } from "@/components/Seo";
import * as Icons from "lucide-react";
import { PageHero } from "@/components/sections/Hero";
import {
  Section,
  Heading,
  Card,
  Stagger,
  StaggerItem,
  Badge,
  ButtonLink,
  Reveal,
} from "@/components/ui-kit";
import { TRACKS } from "@/constants/conference";

const FORMATS = [
  {
    title: "Keynotes",
    body: "45 minutes on the main stage, no slides of logos, one argument defended in public.",
  },
  {
    title: "Deep Dives",
    body: "90-minute technical sessions with the primary data on screen and the authors in the room.",
  },
  {
    title: "Labs",
    body: "Capped at 40 people, real equipment, real datasets, and someone who built it standing next to you.",
  },
  {
    title: "Roundtables",
    body: "Chatham House rule. Payers, regulators and founders working through a single decision.",
  },
];

export default function Tracks() {
  return (
    <>
      <Helmet>
        <title>Conference Tracks — Wavexa Technologies 2026</title>
        <meta
          name="description"
          content="Six tracks and one hundred sessions: clinical AI, genomics, surgical robotics, longevity science, digital health systems and health policy."
        />
        <meta property="og:title" content="Conference Tracks — Wavexa Technologies 2026" />
        <meta
          property="og:description"
          content="Six tracks, one hundred sessions across four days in Geneva."
        />
        <meta property="og:url" content="/tracks" />
        <link rel="canonical" href="/tracks" />
      </Helmet>

      <PageHero
        eyebrow="Tracks"
        title="Six tracks."
        accent="One hundred sessions."
        body="Tracks run in parallel across four days with no filler slots. Every session is recorded and released to delegates within 24 hours."
      />

      <Section className="pt-0">
        <Stagger className="grid gap-6 md:grid-cols-2">
          {TRACKS.map((t) => {
            const C =
              (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
                t.icon
              ] ?? Icons.Sparkles;
            return (
              <StaggerItem key={t.title}>
                <Card className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl [background-image:var(--gradient-brand)] text-primary-foreground">
                      <C className="h-6 w-6" />
                    </span>
                    <Badge tone="muted">{t.sessions} sessions</Badge>
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-balance">
                    {t.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{t.body}</p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <Section veil>
        <Heading eyebrow="Session formats" title="Four ways" accent="to go deep" align="center" />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FORMATS.map((f) => (
            <StaggerItem key={f.title}>
              <Card className="h-full p-6">
                <h3 className="font-heading text-2xl font-semibold">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-12 text-center">
          <ButtonLink to="/schedule" size="lg" variant="outline">
            See the four-day schedule
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
