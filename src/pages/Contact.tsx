import { Helmet } from "@/components/Seo";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/Hero";
import { Section, Card, Reveal, Stagger, StaggerItem } from "@/components/ui-kit";
import { ContactForm, Newsletter } from "@/components/forms";
import { CONFERENCE } from "@/constants/conference";

const DETAILS = [
  { icon: Mail, title: "Email", body: CONFERENCE.email },
  { icon: Phone, title: "Phone", body: CONFERENCE.phone },
  { icon: Clock, title: "Hours", body: "Mon–Fri, 09:00–18:00 CET" },
];

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact — Wavexa Technologies 2026</title>
        <meta
          name="description"
          content="Contact the Wavexa Technologies programme team about registration, speaking, sponsorship, press or accessibility in Geneva."
        />
        <meta property="og:title" content="Contact — Wavexa Technologies 2026" />
        <meta
          property="og:description"
          content="Reach the Wavexa Technologies programme team in Geneva."
        />
        <meta property="og:url" content="/contact" />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <PageHero
        eyebrow="Contact"
        title="Talk to the"
        accent="programme team"
        body="Registration, speaking proposals, sponsorship, press accreditation or accessibility requirements — one team, one working day."
      />

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {DETAILS.map((d) => (
              <StaggerItem key={d.title}>
                <Card className="h-full p-6" lift={false}>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/12 text-accent">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 font-heading text-xl font-semibold">{d.title}</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">{d.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      <Section veil>
        <Reveal>
          <Newsletter />
        </Reveal>
      </Section>
    </>
  );
}
