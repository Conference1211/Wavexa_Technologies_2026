import { Helmet } from "@/components/Seo";
import { Mail, Phone, ArrowUpRight, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/sections/Hero";
import { motion } from "framer-motion";

import { Section, Card, Reveal } from "@/components/ui-kit";
import { ContactForm } from "@/components/forms";
import { useConference } from "@/context/ConferenceContext";

export default function Contact() {
  const conference = useConference();
  return (
    <>
      <Helmet>
        <title>Contact — Wavexa</title>

        <meta
          name="description"
          content="Contact Wavexa for speaker invitations, partnership discussions, and platform inquiries."
        />

        <meta property="og:title" content="Contact — Wavexa" />

        <meta
          property="og:description"
          content="Get in touch with Wavexa about the selected conference, speaker invitations, partnerships, and conference inquiries."
        />

        <meta property="og:url" content="/contact" />

        <link rel="canonical" href="/contact" />
      </Helmet>

    {/* PAGE HERO */}
<PageHero
  eyebrow="Contact"
  title="Get in"
  accent="touch"
  body="Have a question, partnership idea, or conference inquiry? Our team is here to help."
/>


      

      {/* CONTACT SECTION */}
      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:items-start">

          {/* LEFT CONTENT */}
          <Reveal>
            <div className="flex h-full flex-col">

              {/* INTRO */}
              <div className="mt-6 sm:mt-10">
  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
    We&apos;re here to help
  </p>

  <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] sm:mt-3 sm:text-4xl">
    Let&apos;s connect and
    <span className="block text-accent">
      make an impact.
    </span>
  </h2>

  <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:mt-5 sm:leading-7">
    Whether you are interested in speaking at our conference,
    exploring a partnership, or simply have a question, our team
    would be happy to hear from you.
  </p>
</div>

              {/* CONTACT DETAILS */}
              <div className="mt-10 space-y-3">

                {/* EMAIL */}
                <a
                  href={`mailto:${conference.email}`}
                  className="group flex items-center justify-between rounded-2xl border border-border/60 bg-background/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.04]"
                >
                  <div className="flex items-center gap-4">

                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105">
                      <Mail className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Email
                      </p>

                      <p className="mt-1 text-sm font-semibold text-foreground sm:text-base">
                        {conference.email}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>

                
              </div>

              {/* WHAT WE CAN HELP WITH */}
              <div className="mt-10">

                <p className="text-sm font-semibold text-foreground">
                  How can we help?
                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                  <span className="rounded-full border border-border/60 bg-muted/30 px-4 py-2 text-xs font-medium text-muted-foreground">
                    Speaker Invitations
                  </span>

                  <span className="rounded-full border border-border/60 bg-muted/30 px-4 py-2 text-xs font-medium text-muted-foreground">
                    Partnerships
                  </span>

                  <span className="rounded-full border border-border/60 bg-muted/30 px-4 py-2 text-xs font-medium text-muted-foreground">
                    Conference Queries
                  </span>

                  <span className="rounded-full border border-border/60 bg-muted/30 px-4 py-2 text-xs font-medium text-muted-foreground">
                    General Support
                  </span>

                </div>
              </div>

              {/* RESPONSE NOTE */}
              <div className="mt-8 flex items-start gap-3 border-l-2 border-accent/40 pl-4">

                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />

                <p className="text-xs leading-6 text-muted-foreground">
                  Our team typically responds within{" "}
                  <span className="font-semibold text-foreground">
                    2–3 business days
                  </span>
                  .
                </p>

              </div>

            </div>
          </Reveal>

          {/* RIGHT SIDE - FORM */}
          <Reveal delay={0.1}>
            <Card
              className="relative overflow-hidden p-7 sm:p-9 lg:p-10"
              lift={false}
            >

              {/* SUBTLE DECORATIVE ELEMENT */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />

              <div className="relative">

                {/* FORM HEADER */}
                <div className="mb-8">

                  <div className="flex items-center justify-between gap-4">

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      Contact Wavexa
                    </p>

                    <span className="rounded-full bg-accent/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                      Get in touch
                    </span>

                  </div>

                  <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
                    Tell us how we can help.
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                    Share your details and message with us. Whether it&apos;s
                    about speaking, partnerships, or the conference, we&apos;ll
                    get back to you soon.
                  </p>

                </div>

                {/* FORM */}
                <ContactForm />

              </div>

            </Card>
          </Reveal>

        </div>
      </Section>
    </>
  );
}