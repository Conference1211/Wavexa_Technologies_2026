import { Helmet } from "@/components/Seo";
import { PageHero } from "@/components/sections/Hero";
import { motion } from "framer-motion";
import aboutHealthcareImage from "@/assets/about-healthcare.png";

import {
  Section,
  Heading,
  Card,
  Reveal,
  Stagger,
  StaggerItem,
  ButtonLink,
} from "@/components/ui-kit";

const SCIENTIFIC_PROGRAM = [
  "Keynote Presentations",
  "Plenary Sessions",
  "Scientific Paper Presentations",
  "Poster Presentations",
  "Expert Panel Discussions",
  "Interactive Workshops",
  "Young Researcher Forums",
  "Networking Opportunities",
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>
          About the Conference | Global Summit on Diabetes, Cardiology &
          Cardiometabolic Health 2026
        </title>

        <meta
          name="description"
          content="Learn about the Global Summit on Diabetes, Cardiology & Cardiometabolic Health 2026, a two-day global virtual conference taking place on December 9-10, 2026."
        />
      </Helmet>

      {/* =========================================================
          HERO
      ========================================================== */}

     <div className="relative overflow-visible">
        {/* HERO */}
<div className="relative overflow-visible">
  <PageHero
    eyebrow="About the Conference"
    title="Global Summit on Diabetes,"
    accent="Cardiology & Cardiometabolic Health 2026"
    body="Advancing Innovation and Integrated Care in Diabetes and Cardiometabolic Health."
  />

  {/* Healthcare Video */}
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
      src={aboutHealthcareImage}
      alt="Healthcare conference"
      className="h-auto w-full object-contain"
    />
  </motion.div>
</div>
      </div>

      {/* =========================================================
          ABOUT THE CONFERENCE
      ========================================================== */}

      <Section>
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <Heading
              eyebrow="About the Conference"
              title="Advancing science."
              accent="Improving healthcare."
              align="center"
            />
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <Card className="p-7 sm:p-10">
              <div className="space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  Wavexa Conferences proudly presents the{" "}
                  <strong className="text-foreground">
                    Global Summit on Diabetes, Cardiology & Cardiometabolic
                    Health 2026
                  </strong>
                  , a premier international virtual conference dedicated to
                  advancing scientific research, clinical excellence, and
                  innovative healthcare solutions in the fields of diabetes,
                  cardiovascular medicine, and cardiometabolic health.
                </p>

                <p>
                  Scheduled as a{" "}
                  <strong className="text-foreground">
                    two-day global webinar conference on December 09-10, 2026
                  </strong>
                  , the summit will bring together leading researchers,
                  clinicians, cardiologists, diabetologists, endocrinologists,
                  healthcare professionals, academic scientists, policymakers,
                  industry experts, and healthcare innovators from around the
                  world.
                </p>

                <p>
                  The conference will provide a platform to discuss the latest
                  advancements, emerging technologies, and evidence-based
                  practices that are transforming patient care and improving
                  health outcomes.
                </p>

                <p>
                  With the growing global burden of diabetes, cardiovascular
                  diseases, obesity, hypertension, and metabolic disorders, the
                  summit will encourage collaborative approaches integrating
                  prevention, diagnosis, treatment, and digital health
                  solutions.
                </p>

                <p>
                  The conference theme,{" "}
                  <strong className="text-foreground">
                    “Advancing Innovation and Integrated Care in Diabetes and
                    Cardiometabolic Health”
                  </strong>
                  , highlights the importance of cutting-edge research, digital
                  health technologies, artificial intelligence, precision
                  medicine, and patient-centered care.
                </p>

                <p>
                  Participants will gain insights into diabetes management,
                  preventive cardiology, cardiovascular risk reduction,
                  obesity and metabolic health, digital therapeutics, remote
                  patient monitoring, healthcare analytics, precision medicine,
                  and emerging treatment strategies.
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* =========================================================
          CONFERENCE THEME
      ========================================================== */}

      <Section veil>
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <Card
              className="
                group
                relative
                overflow-hidden
                p-8
                text-center
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-xl
                sm:p-10
              "
            >
              {/* Animated Glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-0
                  h-32
                  w-64
                  -translate-x-1/2
                  rounded-full
                  bg-primary/10
                  blur-3xl
                  transition-all
                  duration-700
                  group-hover:scale-150
                "
              />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  Conference Theme
                </p>

                <h2
                  className="
                    mt-4
                    font-heading
                    text-3xl
                    font-semibold
                    leading-tight
                    transition-transform
                    duration-500
                    group-hover:scale-[1.01]
                    sm:text-4xl
                  "
                >
                  Advancing Innovation and Integrated Care in Diabetes and
                  Cardiometabolic Health
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Exploring innovative research, emerging technologies,
                  artificial intelligence, precision medicine, and integrated
                  patient-centered approaches to cardiometabolic healthcare.
                </p>
              </div>
            </Card>
          </div>
        </Reveal>
      </Section>

      {/* =========================================================
          SCIENTIFIC PROGRAM
      ========================================================== */}

      <Section>
        <Reveal>
          <Heading
            eyebrow="Scientific Program"
            title="Learn. Share."
            accent="Connect."
            align="center"
            body="The summit will feature a diverse scientific program designed to encourage knowledge exchange, research presentation, expert discussion, and professional networking."
          />
        </Reveal>

        <Stagger className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {SCIENTIFIC_PROGRAM.map((item, index) => (
            <StaggerItem key={item}>
              <Card
                className="
                  group
                  h-full
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <div className="flex items-center gap-4">
                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-border
                      font-numeric
                      text-xs
                      tracking-[0.15em]
                      text-gold
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:border-primary/40
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm font-medium text-foreground">
                    {item}
                  </span>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* =========================================================
          FINAL CONFERENCE INFORMATION
      ========================================================== */}

      <Section veil>
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <Heading
              eyebrow="Join Us"
              title="A global platform for"
              accent="knowledge, collaboration & innovation."
              align="center"
              body="The Global Summit on Diabetes, Cardiology & Cardiometabolic Health 2026 is committed to fostering scientific excellence, promoting interdisciplinary collaboration, and supporting innovative healthcare solutions that contribute to better patient outcomes and healthier communities worldwide."
            />

            <Reveal delay={0.2} className="mt-8">
              <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                This virtual webinar conference provides a unique opportunity
                for participants worldwide to engage with leading experts,
                present their research, build professional networks, and
                explore innovative solutions without geographical barriers.
              </p>

              <p className="mx-auto mt-5 max-w-3xl text-sm font-medium leading-relaxed text-foreground sm:text-base">
                Join us as we unite global experts and healthcare leaders to
                shape the future of diabetes care, cardiovascular medicine, and
                cardiometabolic health.
              </p>

              <div className="mt-8">
                <ButtonLink
                  to="/registration"
                  size="lg"
                  className="
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >
                  Register for the Conference
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
