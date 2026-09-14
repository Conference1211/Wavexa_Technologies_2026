import { Helmet } from "@/components/Seo";
import { Mail, Phone, ArrowUpRight, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/sections/Hero";
import { motion } from "framer-motion";
import contactImage from "@/assets/contact1.png";
import { Section, Card, Reveal } from "@/components/ui-kit";
import { ContactForm } from "@/components/forms";

export default function Contact() {
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
          content="Get in touch with Wavexa for speaker invitations, partnerships, and platform inquiries."
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
      <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{
      duration: 0.8,
      delay: 0.25,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      pointer-events-none
      absolute
      right-2
      bottom-[-35px]
      z-10
      w-[130px]
      sm:right-6
      sm:bottom-[-30px]
      sm:w-[190px]
      md:right-8
      md:top-[68%]
      md:bottom-auto
      md:w-[280px]
      lg:right-[7%]
      lg:top-[55%]
      lg:bottom-auto
      lg:w-[500px]
      xl:right-[6%]
      xl:top-[55%]
      xl:w-[580px]
      -translate-y-1/2
    "
  >
    <img
      src={contactImage}
      alt="Contact Wavexa"
      className="h-auto w-full object-contain"
    />
  </motion.div>

      {/* CONTACT SECTION */}
      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:items-start">

          {/* LEFT CONTENT */}
          <Reveal>
            <div className="flex h-full flex-col">

              {/* INTRO */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  We&apos;re here to help
                </p>

                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Let&apos;s connect and
                  <span className="block text-accent">
                    make an impact.
                  </span>
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                  Whether you are interested in speaking at our conference,
                  exploring a partnership, or simply have a question, our team
                  would be happy to hear from you.
                </p>
              </div>

              {/* CONTACT DETAILS */}
              <div className="mt-10 space-y-3">

                {/* EMAIL */}
                <a
                  href="mailto:contact@wavexaglobal.com"
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
                        contact@wavexaglobal.com
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>

                {/* PHONE */}
                <a
                  href="tel:+919440388379"
                  className="group flex items-center justify-between rounded-2xl border border-border/60 bg-background/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.04]"
                >
                  <div className="flex items-center gap-4">

                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105">
                      <Phone className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Call / WhatsApp
                      </p>

                      <p className="mt-1 text-sm font-semibold text-foreground sm:text-base">
                        +91 94403 88379
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

                  <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
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