import { Helmet } from "@/components/Seo";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/Hero";
import {
  Section,
  Heading,
  Card,
  Stagger,
  StaggerItem,
  Reveal,
  ButtonLink,
} from "@/components/ui-kit";
import { SponsorCard } from "@/components/cards";
import { SPONSOR_TIERS } from "@/constants/conference";

const PACKAGES = [
  {
    tier: "Diamond",
    price: "€180,000",
    perks: [
      "Main-stage session",
      "Lakeside pavilion",
      "40 delegate passes",
      "Named award category",
      "Year-round programme presence",
    ],
  },
  {
    tier: "Platinum",
    price: "€95,000",
    perks: [
      "Track host slot",
      "Premium floor stand",
      "20 delegate passes",
      "Investor floor access",
      "Delegate data insights",
    ],
  },
  {
    tier: "Gold",
    price: "€42,000",
    perks: [
      "Lab or roundtable host",
      "Exhibition stand",
      "10 delegate passes",
      "Logo across all stages",
    ],
  },
];

const ALL_SPONSORS = SPONSOR_TIERS.flatMap((t) =>
  t.names.map((name: string) => ({
    name,
    tier: t.tier,
  }))
);

export default function Sponsors() {
  return (
    <>
      <Helmet>
        <title>Sponsors & Partners — Wavexa Technologies 2026</title>
        <meta
          name="description"
          content="Diamond, Platinum, Gold and institutional partners behind Wavexa Technologies 2026, plus sponsorship packages for reaching 5,000 health decision-makers."
        />
        <meta property="og:title" content="Sponsors & Partners — Wavexa Technologies 2026" />
        <meta
          property="og:description"
          content="Partner with the summit reaching 5,000 health decision-makers."
        />
        <meta property="og:url" content="/sponsors" />
        <link rel="canonical" href="/sponsors" />
      </Helmet>

      <PageHero
        eyebrow="Sponsors"
        title="Partners who fund"
        accent="the difficult work"
        body="Sponsorship at Wavexa buys presence, never programme influence. Session selection stays with the independent committee — which is exactly why delegates trust the floor."
      />

      <div className="relative overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee-track flex w-max gap-4">
          {[...ALL_SPONSORS, ...ALL_SPONSORS].map((s, i) => (
            <span
              key={`${s.name}-${i}`}
              className="glass gradient-border flex items-center gap-3 rounded-2xl px-6 py-4 whitespace-nowrap transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg [background-image:var(--gradient-brand)] text-[11px] font-bold text-primary-foreground">
                {s.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <span className="font-heading text-lg font-semibold">{s.name}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.tier}
              </span>
            </span>
          ))}
        </div>
      </div>

      <Section className="pt-0">
        {SPONSOR_TIERS.map((t) => (
          <div key={t.tier} className="mb-14 last:mb-0">
            <Reveal>
              <h2 className="mb-6 font-heading text-3xl font-semibold">
                {t.tier}{" "}
                <span className="numeric ml-2 text-sm text-muted-foreground">{t.names.length}</span>
              </h2>
            </Reveal>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.names.map((n) => (
                <StaggerItem key={n}>
                  <SponsorCard name={n} tier={t.tier} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        ))}
      </Section>

      <Section veil>
        <Heading eyebrow="Packages" title="Three ways" accent="to partner" align="center" />
        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((p) => (
            <StaggerItem key={p.tier}>
              <Card className="h-full">
                <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  {p.tier}
                </p>
                <p className="mt-3 font-numeric text-4xl font-bold tracking-tight text-gradient">
                  {p.price}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-12 text-center">
          <ButtonLink to="/contact" size="lg" variant="gold">
            Request the partner pack
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
