import * as React from "react";
import { Helmet } from "@/components/Seo";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/sections/Hero";
import tracksImage from "@/assets/Track.png";
import { Section, Heading, Card, Stagger, StaggerItem } from "@/components/ui-kit";
import { TRACKS } from "@/constants/conference";

export default function Tracks() {
  const [openTrack, setOpenTrack] = React.useState<number | null>(null);

  const handleTrackClick = (index: number) => {
    setOpenTrack((current) => (current === index ? null : index));
  };

  return (
    <>
      {/* =========================================================
          SEO
      ========================================================= */}
      <Helmet>
        <title>Scientific Sessions & Tracks — Wavexa Conferences</title>

        <meta
          name="description"
          content="Explore 15 scientific sessions and tracks covering diabetes, cardiology, cardiometabolic health, digital health, precision medicine, obesity, women's health, cardiac surgery and emerging therapies."
        />

        <meta
          property="og:title"
          content="Scientific Sessions & Tracks — Wavexa Conferences"
        />

        <meta
          property="og:description"
          content="Explore 15 scientific tracks focused on diabetes, cardiology, cardiometabolic health, digital health, precision medicine and emerging healthcare innovations."
        />

        <meta property="og:url" content="/tracks" />

        <link rel="canonical" href="/tracks" />
      </Helmet>

      {/* =========================================================
          HERO
      ========================================================= */}
      <div className="relative overflow-visible">
  <PageHero
    eyebrow="Scientific Sessions & Tracks"
    title="Explore 15"
    accent="Scientific Tracks."
    body="Discover the latest research, clinical advancements, emerging therapies, and innovative approaches across diabetes, cardiology, cardiometabolic health, digital healthcare, precision medicine, obesity, women's health, cardiac surgery, and more."
  />

  {/* HERO IMAGE */}
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
      src={tracksImage}
      alt="Scientific conference tracks"
      className="h-auto w-full object-contain"
    />
  </motion.div>
</div>

      {/* =========================================================
          SCIENTIFIC TRACKS
      ========================================================= */}
      <Section className="pt-0">
        <div className="mx-auto max-w-4xl">

          {/* SECTION HEADING */}
          <Heading
            eyebrow="Scientific Sessions & Tracks"
            title="Explore Our"
            accent="Scientific Tracks"
            align="center"
          />

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-center
              text-[15px]
              leading-relaxed
              text-muted-foreground
            "
          >
            Explore our scientific sessions below. Click on a track title
            to view the detailed session information.
          </motion.p>

          {/* =========================================================
              TRACK LIST
          ========================================================= */}
          <div
            className="
              mx-auto
              mt-12
              overflow-hidden
              rounded-3xl
              border
              border-border/60
              bg-background
              shadow-sm
            "
          >
            {TRACKS.map((track, index) => {
              const isOpen = openTrack === index;

              return (
                <motion.div
                  key={track.title}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
                    ${
                      index !== TRACKS.length - 1
                        ? "border-b border-border/60"
                        : ""
                    }
                  `}
                >
                  {/* =================================================
                      TRACK TITLE
                  ================================================= */}
                  <button
                    type="button"
                    onClick={() => handleTrackClick(index)}
                    aria-expanded={isOpen}
                    className="
                      group
                      flex
                      w-full
                      items-center
                      gap-4
                      px-5
                      py-5
                      text-left
                      transition-all
                      duration-300
                      hover:bg-muted/40
                      sm:px-7
                      sm:py-6
                    "
                  >
                    {/* NUMBER */}
                    <span
                      className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-sm
                        font-bold
                        transition-all
                        duration-300
                        ${
                          isOpen
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                        }
                      `}
                    >
                      {index + 1}
                    </span>

                    {/* TITLE */}
                    <span
                      className={`
                        flex-1
                        font-heading
                        text-base
                        font-semibold
                        leading-snug
                        transition-colors
                        duration-300
                        sm:text-lg
                        ${
                          isOpen
                            ? "text-primary"
                            : "text-foreground group-hover:text-primary"
                        }
                      `}
                    >
                      Track {index + 1}: {track.title}
                    </span>

                    {/* ARROW */}
                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition-all
                        duration-300
                        ${
                          isOpen
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-muted-foreground group-hover:border-primary group-hover:text-primary"
                        }
                      `}
                    >
                      <motion.span
                        animate={{
                          rotate: isOpen ? 180 : 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.span>
                    </span>
                  </button>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          height: {
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          },
                          opacity: {
                            duration: 0.25,
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div
                          className="
                            px-5
                            pb-7
                            pl-[76px]
                            pr-5
                            sm:px-7
                            sm:pb-8
                            sm:pl-[88px]
                          "
                        >
                          <motion.div
                            initial={{
                              opacity: 0,
                              y: -8,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              duration: 0.3,
                              delay: 0.08,
                            }}
                            className="
                              max-w-3xl
                              border-l-2
                              border-primary/30
                              pl-5
                              sm:pl-6
                            "
                          >
                            <p
  className="
    text-[15px]
    leading-relaxed
    text-muted-foreground
    sm:text-base
  "
>
  {track.body}
</p>

{/* =================================================
    SUB-TRACKS
================================================= */}
{track.subTracks && track.subTracks.length > 0 && (
  <div className="mt-7">
    <h4
      className="
        mb-4
        font-heading
        text-base
        font-semibold
        text-foreground
        sm:text-lg
      "
    >
      Sub-Tracks
    </h4>

    <div className="grid gap-3 sm:grid-cols-2">
      {track.subTracks.map((subTrack, subIndex) => (
        <motion.div
          key={subTrack}
          initial={{
            opacity: 0,
            x: -10,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.25,
            delay: subIndex * 0.04,
          }}
          className="
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-border/60
            bg-muted/30
            px-4
            py-3
            transition-all
            duration-200
            hover:border-primary/30
            hover:bg-primary/5
          "
        >
          <span
            className="
              mt-0.5
              flex
              h-6
              w-6
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-primary/10
              text-xs
              font-semibold
              text-primary
            "
          >
            {subIndex + 1}
          </span>

          <span
            className="
              text-sm
              leading-relaxed
              text-muted-foreground
            "
          >
            {subTrack}
          </span>
        </motion.div>
      ))}
    </div>
  </div>
)}
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* =========================================================
          SCIENTIFIC PROGRAMME
      ========================================================= */}
      <Section veil>
        <div className="mx-auto max-w-5xl">
          <Heading
            eyebrow="Scientific Programme"
            title="Advancing"
            accent="Cardiometabolic Health"
            align="center"
          />

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-center
              text-[15px]
              leading-relaxed
              text-muted-foreground
            "
          >
            The scientific programme brings together clinicians, researchers,
            healthcare professionals, academics, and industry experts to share
            the latest evidence, innovations, clinical experiences, and
            emerging approaches in diabetes, cardiology, and cardiometabolic
            health.
          </motion.p>

          {/* =========================================================
              PROGRAMME HIGHLIGHTS
          ========================================================= */}
          <Stagger className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Global Experts",
                body: "Connect with clinicians, researchers and healthcare professionals from around the world.",
              },
              {
                title: "Latest Research",
                body: "Discover emerging research, clinical developments and innovative approaches in cardiometabolic health.",
              },
              {
                title: "Emerging Innovations",
                body: "Explore new technologies, therapies and strategies shaping the future of healthcare.",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  whileHover={{
                    y: -6,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="h-full"
                >
                  <Card className="h-full p-6">
                    <span
                      className="
                        grid
                        h-12
                        w-12
                        place-items-center
                        rounded-xl
                        [background-image:var(--gradient-brand)]
                        text-primary-foreground
                      "
                    >
                      <span className="text-sm font-bold">
                        {item.title === "Global Experts"
                          ? "01"
                          : item.title === "Latest Research"
                            ? "02"
                            : "03"}
                      </span>
                    </span>

                    <h3
                      className="
                        mt-5
                        font-heading
                        text-xl
                        font-semibold
                        text-foreground
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
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>
    </>
  );
}
