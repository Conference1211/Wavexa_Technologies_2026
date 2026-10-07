import * as React from "react";
import { Helmet } from "@/components/Seo";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe2,
  BookOpen,
  Cpu,
  ChevronDown,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Section, Card, Reveal } from "@/components/ui-kit";
import { PageHero } from "@/components/sections/Hero";
import { useConference } from "@/context/ConferenceContext";
import { conferencePath } from "@/data/conferences";

// COLORFUL LIGHT THEMES FOR EACH TRACK
const TRACK_ACCENTS = [
  // 1. Purple
  {
    border: "border-purple-200 hover:border-purple-400",
    badge: "bg-purple-600 text-white shadow-sm shadow-purple-500/20",
    title: "text-purple-950",
    subText: "text-purple-700",
    subBg: "bg-purple-50/80 border-purple-100",
    ring: "ring-2 ring-purple-400 border-purple-400",
    glow: "hover:shadow-[0_12px_30px_-10px_rgba(147,51,234,0.15)]",
    accentBar: "bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500",
    iconBg: "bg-gradient-to-tr from-purple-600 to-violet-600 text-white shadow-purple-500/30",
  },
  // 2. Emerald
  {
    border: "border-emerald-200 hover:border-emerald-400",
    badge: "bg-emerald-600 text-white shadow-sm shadow-emerald-500/20",
    title: "text-emerald-950",
    subText: "text-emerald-700",
    subBg: "bg-emerald-50/80 border-emerald-100",
    ring: "ring-2 ring-emerald-400 border-emerald-400",
    glow: "hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.15)]",
    accentBar: "bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500",
    iconBg: "bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-emerald-500/30",
  },
  // 3. Amber
  {
    border: "border-amber-200 hover:border-amber-400",
    badge: "bg-amber-600 text-white shadow-sm shadow-amber-500/20",
    title: "text-amber-950",
    subText: "text-amber-800",
    subBg: "bg-amber-50/80 border-amber-100",
    ring: "ring-2 ring-amber-400 border-amber-400",
    glow: "hover:shadow-[0_12px_30px_-10px_rgba(245,158,11,0.15)]",
    accentBar: "bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500",
    iconBg: "bg-gradient-to-tr from-amber-600 to-orange-600 text-white shadow-amber-500/30",
  },
  // 4. Cyan
  {
    border: "border-cyan-200 hover:border-cyan-400",
    badge: "bg-cyan-600 text-white shadow-sm shadow-cyan-500/20",
    title: "text-cyan-950",
    subText: "text-cyan-800",
    subBg: "bg-cyan-50/80 border-cyan-100",
    ring: "ring-2 ring-cyan-400 border-cyan-400",
    glow: "hover:shadow-[0_12px_30px_-10px_rgba(6,182,212,0.15)]",
    accentBar: "bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500",
    iconBg: "bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-cyan-500/30",
  },
  // 5. Fuchsia
  {
    border: "border-fuchsia-200 hover:border-fuchsia-400",
    badge: "bg-fuchsia-600 text-white shadow-sm shadow-fuchsia-500/20",
    title: "text-fuchsia-950",
    subText: "text-fuchsia-700",
    subBg: "bg-fuchsia-50/80 border-fuchsia-100",
    ring: "ring-2 ring-fuchsia-400 border-fuchsia-400",
    glow: "hover:shadow-[0_12px_30px_-10px_rgba(217,70,239,0.15)]",
    accentBar: "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500",
    iconBg: "bg-gradient-to-tr from-fuchsia-600 to-pink-600 text-white shadow-fuchsia-500/30",
  },
];

export default function Tracks() {
  const conference = useConference();
  const [expandedTrackIdx, setExpandedTrackIdx] = React.useState<number | null>(null);

  const highlights = [
    {
      title: "Global Experts",
      body: "Connect with clinicians, researchers, and healthcare professionals from around the world.",
      icon: Globe2,
      badge: "01",
      accentGradient: "from-purple-500 via-violet-500 to-fuchsia-500",
      bgLight: "from-purple-500/10 via-violet-500/5 to-white",
      iconStyle: "bg-gradient-to-tr from-purple-600 to-violet-600 text-white shadow-purple-500/30",
      textColor: "text-purple-950",
      glowShadow: "hover:shadow-[0_20px_40px_-10px_rgba(147,51,234,0.25)]",
    },
    {
      title: "Latest Research",
      body: "Discover emerging research, clinical developments, and innovative approaches in cardiometabolic health.",
      icon: BookOpen,
      badge: "02",
      accentGradient: "from-emerald-400 via-teal-500 to-cyan-500",
      bgLight: "from-emerald-500/10 via-teal-500/5 to-white",
      iconStyle: "bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-emerald-500/30",
      textColor: "text-emerald-950",
      glowShadow: "hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.25)]",
    },
    {
      title: "Emerging Innovations",
      body: "Explore new technologies, therapies, and strategies shaping the future of healthcare.",
      icon: Cpu,
      badge: "03",
      accentGradient: "from-fuchsia-500 via-pink-500 to-rose-500",
      bgLight: "from-fuchsia-500/10 via-pink-500/5 to-white",
      iconStyle: "bg-gradient-to-tr from-fuchsia-600 to-pink-600 text-white shadow-fuchsia-500/30",
      textColor: "text-fuchsia-950",
      glowShadow: "hover:shadow-[0_20px_40px_-10px_rgba(217,70,239,0.25)]",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      <Helmet>
        <title>Scientific Sessions & Tracks — Wavexa Conferences</title>
      </Helmet>

      {/* HERO SECTION */}
      <PageHero
        eyebrow="Specialized Sessions"
        title="Explore"
        accent="Scientific Tracks."
        body="Discover cutting-edge research, clinical breakthroughs, digital therapeutics, and specialized multidisciplinary approaches in modern healthcare."
      />

      {/* TRACK CARDS SECTION */}
      <Section className="relative py-16 bg-slate-50 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              {/* Same pill style as UPCOMING EVENTS */}
              <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-blue-600">
                Scientific Sessions & Tracks
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">
                Explore Our <span className="text-teal-600">Scientific Tracks</span>
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-center text-sm font-medium text-slate-600">
                Click any card to reveal detailed topics, objectives, and specialized focus areas.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conference.tracks.map((track, idx) => {
              const isExpanded = expandedTrackIdx === idx;
              const theme = TRACK_ACCENTS[idx % TRACK_ACCENTS.length]!;

              return (
                <motion.div
                  key={track.title}
                  layout
                  onClick={() => setExpandedTrackIdx(isExpanded ? null : idx)}
                  className={`cursor-pointer rounded-3xl border-2 bg-white p-6 transition-all duration-300 relative overflow-hidden shadow-sm hover:-translate-y-1 ${theme.border} ${theme.glow} ${
                    isExpanded
                      ? `${theme.ring} shadow-xl md:col-span-2 lg:col-span-3`
                      : ""
                  }`}
                >
                  <div className={`absolute left-0 top-0 h-1.5 w-full ${theme.accentBar}`} />

                  <div className="flex items-center justify-between mb-4 mt-1">
                    <span className={`px-3.5 py-1 rounded-full text-xs font-bold ${theme.badge}`}>
                      Track {String(idx + 1).padStart(2, "0")}
                    </span>

                    <div className="p-2 rounded-full bg-slate-50 text-slate-700 border border-slate-200">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isExpanded ? "rotate-180 text-slate-900" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Track title */}
                  <h3 className={`text-lg font-bold mb-2 leading-snug ${theme.title}`}>
                    {track.title}
                  </h3>

                  {!isExpanded && (
                    <p className="text-slate-600 text-xs font-medium line-clamp-2 leading-relaxed">
                      {track.body}
                    </p>
                  )}

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-slate-100"
                      >
                        <p className="text-slate-700 text-base font-normal leading-relaxed mb-6">
                          {track.body}
                        </p>

                        {track.subTracks && track.subTracks.length > 0 && (
                          <div className="space-y-3">
                            <h4
                              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${theme.subText}`}
                            >
                              <Layers className="w-4 h-4" />
                              Sub-Tracks & Focused Topics
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {track.subTracks.map((sub, sIdx) => (
                                <div
                                  key={sIdx}
                                  className={`flex items-start gap-2.5 p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold text-slate-800 shadow-2xs ${theme.subBg}`}
                                >
                                  <CheckCircle2
                                    className={`w-4 h-4 ${theme.subText} shrink-0 mt-0.5`}
                                  />
                                  <span>{sub}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* PROGRAMME HIGHLIGHTS CARDS */}
      <Section className="border-t border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              {/* Same pill style as UPCOMING EVENTS */}
              <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-blue-600">
                Scientific Programme
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">
                Exploring <span className="text-teal-600">{conference.shortName}</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => {
              const IconComponent = item.icon;

              return (
                <Card
                  key={item.title}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-b ${item.bgLight} p-8 shadow-sm transition-all duration-300 ${item.glowShadow}`}
                >
                  <div
                    className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${item.accentGradient}`}
                  />

                  <div>
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconStyle}`}
                      >
                        <IconComponent className="h-7 w-7" />
                      </div>

                      <span className="text-xs font-black tracking-widest text-slate-400">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className={`mt-6 text-lg font-bold leading-snug ${item.textColor}`}>
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                      {item.body}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}
