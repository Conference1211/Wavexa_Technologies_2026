import { Helmet } from "@/components/Seo";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/Hero";
import { Section, Card, Reveal } from "@/components/ui-kit";
import { ContactForm } from "@/components/forms";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact — WebiConX</title>

        <meta
          name="description"
          content="Contact WebiConX for speaker invitations, partnership discussions, and platform inquiries."
        />

        <meta property="og:title" content="Contact — WebiConX" />

        <meta
          property="og:description"
          content="Get in touch with WebiConX for speaker invitations, partnerships, and platform inquiries."
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
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

          {/* LEFT SIDE */}
          <Reveal>
            <div className="space-y-6">

              {/* REGISTERED OFFICE */}
              <Card className="p-7" lift={false}>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/12 text-accent">
                    <MapPin className="h-5 w-5" />
                  </span>

                  <div>
                    <h2 className="font-heading text-xl font-semibold">
                      🇮🇳 Registered Office
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      <strong className="text-foreground">
                        GVK Tech Innovations
                      </strong>
                      <br />
                      50-2-83/3/1, TPT Colony
                      <br />
                      Seethammadhara, Satyam Junction
                      <br />
                      Visakhapatnam, Andhra Pradesh 530013
                      <br />
                      India
                    </p>

                    <div className="mt-5 space-y-3">

                      {/* PHONE */}
                      <a
                        href="tel:+919491512215"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-accent" />
                        <span>Phone / WhatsApp: +91 9491512215</span>
                      </a>

                      {/* EMAIL */}
                      <a
                        href="mailto:contact@webiconx.com"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        <Mail className="h-4 w-4 shrink-0 text-accent" />
                        <span>contact@webiconx.com</span>
                      </a>

                    </div>
                  </div>
                </div>
              </Card>

              {/* INTERNATIONAL COORDINATION */}
              <Card className="p-7" lift={false}>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/12 text-accent">
                    <Phone className="h-5 w-5" />
                  </span>

                  <div>
                    <h2 className="font-heading text-xl font-semibold">
                      International Coordination
                    </h2>

                    <div className="mt-4 space-y-3">

                      {/* PHONE */}
                      <a
                        href="tel:+447915642089"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-accent" />
                        <span>Phone / WhatsApp: +44 791 564 2089</span>
                      </a>

                      {/* EMAIL */}
                      <a
                        href="mailto:contact@webiconx.com"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        <Mail className="h-4 w-4 shrink-0 text-accent" />
                        <span>contact@webiconx.com</span>
                      </a>

                    </div>
                  </div>
                </div>
              </Card>

            </div>
          </Reveal>

          {/* RIGHT SIDE */}
          <Reveal delay={0.1}>
            <Card className="p-7 sm:p-9" lift={false}>

              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Contact WebiConX
                </p>

                <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Let&apos;s start a conversation.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                  For speaker invitations, partnership discussions, or
                  platform inquiries, please use the form below. Our team
                  will respond within 2–3 business days.
                </p>
              </div>

              <ContactForm />

            </Card>
          </Reveal>

        </div>
      </Section>
    </>
  );
}