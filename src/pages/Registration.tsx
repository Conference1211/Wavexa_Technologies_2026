import * as React from "react";
import { Helmet } from "@/components/Seo";
import { Check, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/Hero";
import {
  Section,
  Heading,
  Card,
  Stagger,
  StaggerItem,
  Reveal,
  Badge,
  Button,
} from "@/components/ui-kit";
import { Newsletter } from "@/components/forms";
import { TICKETS } from "@/constants/conference";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full rounded-2xl border border-border/70 bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60";

export default function Registration() {
  const [selected, setSelected] = React.useState("Delegate");
  const [confirmed, setConfirmed] = React.useState(false);

  return (
    <>
      <Helmet>
        <title>Registration & Passes — Wavexa Technologies 2026</title>
        <meta
          name="description"
          content="Digital, Delegate and Executive passes for Wavexa Technologies 2026 in Geneva. Group rates, scholarships, CME credits and visa support included."
        />
        <meta property="og:title" content="Registration & Passes — Wavexa Technologies 2026" />
        <meta property="og:description" content="Passes from €390. Early rate closes 30 June 2026." />
        <meta property="og:url" content="/registration" />
        <link rel="canonical" href="/registration" />
      </Helmet>

      <PageHero
        eyebrow="Registration"
        title="Choose how you"
        accent="join us"
        body="Every pass includes twelve months of session recordings. Group bookings of five or more receive 20% automatically at checkout."
      />

      <Section className="pt-0">
        <Stagger className="grid gap-6 lg:grid-cols-3">
          {TICKETS.map((t) => (
            <StaggerItem key={t.name}>
              <Card
                className={cn(
                  "h-full cursor-pointer transition-shadow",
                  selected === t.name && "shadow-[var(--shadow-lift)] ring-2 ring-primary/45",
                )}
              >
                <div onClick={() => setSelected(t.name)}>
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-display text-2xl font-semibold">{t.name}</h2>
                    <Badge tone={t.featured ? "gold" : "muted"}>{t.tag}</Badge>
                  </div>
                  <p className="mt-5 font-numeric text-5xl font-bold tracking-tight text-gradient">
                    €{t.price.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">per delegate, excl. VAT</p>
                  <ul className="mt-7 space-y-3 text-sm text-muted-foreground">
                    {t.perks.map((p) => (
                      <li key={p} className="flex gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={t.featured ? "primary" : "outline"}
                    className="mt-8 w-full"
                    onClick={() => setSelected(t.name)}
                  >
                    {selected === t.name ? "Selected" : `Choose ${t.name}`}
                  </Button>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section veil>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Heading
            eyebrow="Secure your seat"
            title="Complete your"
            accent="registration"
            body={`Selected pass: ${selected}. Confirmation, invoice and Swiss visa support letter arrive within minutes.`}
          />
          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setConfirmed(true);
              }}
              className="glass gradient-border rounded-3xl p-7 shadow-[var(--shadow-soft)]"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="First name" className={inputCls} />
                <input required placeholder="Last name" className={inputCls} />
                <input
                  required
                  type="email"
                  placeholder="Work email"
                  className={cn(inputCls, "sm:col-span-2")}
                />
                <input
                  placeholder="Institution / company"
                  className={cn(inputCls, "sm:col-span-2")}
                />
                <select className={inputCls} defaultValue="Clinician">
                  {["Clinician", "Researcher", "Founder", "Investor", "Policy", "Student"].map(
                    (r) => (
                      <option key={r}>{r}</option>
                    ),
                  )}
                </select>
                <select
                  className={inputCls}
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  {TICKETS.map((t) => (
                    <option key={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>
              <Button type="submit" size="lg" className="mt-6 w-full">
                {confirmed ? "Registration received" : "Complete registration"}
              </Button>
              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Full refund up to 60 days before
                the event.
              </p>
            </form>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <Newsletter />
        </Reveal>
      </Section>
    </>
  );
}
