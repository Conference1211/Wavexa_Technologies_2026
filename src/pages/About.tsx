import { Helmet } from "@/components/Seo";
import {
  Lightbulb,
  Microscope,
  FileText,
  Presentation,
  Users,
  Wrench,
  GraduationCap,
  Share2,
} from "lucide-react";
import {
  Section,
  Card,
  Reveal,
  Stagger,
  StaggerItem,
  ButtonLink,
} from "@/components/ui-kit";
import { PageHero } from "@/components/sections/Hero";
import { useConference } from "@/context/ConferenceContext";
import { conferencePath } from "@/data/conferences";

const PROGRAM_ACCENTS = [
  {
    border: "border-purple-200 hover:border-purple-400",
    title: "text-purple-950 group-hover:text-purple-700",
    iconColor: "text-purple-600",
    accentBar: "bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500",
    glow: "hover:shadow-[0_12px_30px_-10px_rgba(147,51,234,0.15)]",
    bgLight: "from-purple-500/5 via-violet-500/5 to-white",
  },
  {
    border: "border-emerald-200 hover:border-emerald-400",
    title: "text-emerald-950 group-hover:text-emerald-700",
    iconColor: "text-emerald-600",
    accentBar: "bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500",
    glow: "hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.15)]",
    bgLight: "from-emerald-500/5 via-teal-500/5 to-white",
  },
  {
    border: "border-amber-200 hover:border-amber-400",
    title: "text-amber-950 group-hover:text-amber-700",
    iconColor: "text-amber-600",
    accentBar: "bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500",
    glow: "hover:shadow-[0_12px_30px_-10px_rgba(245,158,11,0.15)]",
    bgLight: "from-amber-500/5 via-orange-500/5 to-white",
  },
  {
    border: "border-cyan-200 hover:border-cyan-400",
    title: "text-cyan-950 group-hover:text-cyan-700",
    iconColor: "text-cyan-600",
    accentBar: "bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500",
    glow: "hover:shadow-[0_12px_30px_-10px_rgba(6,182,212,0.15)]",
    bgLight: "from-cyan-500/5 via-sky-500/5 to-white",
  },
  {
    border: "border-fuchsia-200 hover:border-fuchsia-400",
    title: "text-fuchsia-950 group-hover:text-fuchsia-700",
    iconColor: "text-fuchsia-600",
    accentBar: "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500",
    glow: "hover:shadow-[0_12px_30px_-10px_rgba(217,70,239,0.15)]",
    bgLight: "from-fuchsia-500/5 via-pink-500/5 to-white",
  },
  {
    border: "border-indigo-200 hover:border-indigo-400",
    title: "text-indigo-950 group-hover:text-indigo-700",
    iconColor: "text-indigo-600",
    accentBar: "bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500",
    glow: "hover:shadow-[0_12px_30px_-10px_rgba(99,102,241,0.15)]",
    bgLight: "from-indigo-500/5 via-blue-500/5 to-white",
  },
  {
    border: "border-rose-200 hover:border-rose-400",
    title: "text-rose-950 group-hover:text-rose-700",
    iconColor: "text-rose-600",
    accentBar: "bg-gradient-to-r from-rose-500 via-red-500 to-orange-500",
    glow: "hover:shadow-[0_12px_30px_-10px_rgba(244,63,94,0.15)]",
    bgLight: "from-rose-500/5 via-pink-500/5 to-white",
  },
  {
    border: "border-teal-200 hover:border-teal-400",
    title: "text-teal-950 group-hover:text-teal-700",
    iconColor: "text-teal-600",
    accentBar: "bg-gradient-to-r from-teal-400 via-emerald-500 to-cyan-500",
    glow: "hover:shadow-[0_12px_30px_-10px_rgba(20,184,166,0.15)]",
    bgLight: "from-teal-500/5 via-emerald-500/5 to-white",
  },
];

const SCIENTIFIC_PROGRAM = [
  {
    title: "Keynote Presentations",
    desc: "Visionary insights from global leaders in cardiology & diabetes.",
    Icon: Lightbulb,
  },
  {
    title: "Plenary Sessions",
    desc: "In-depth explorations into ground-breaking medical research.",
    Icon: Microscope,
  },
  {
    title: "Scientific Paper Presentations",
    desc: "Peer-reviewed findings and novel clinical breakthroughs.",
    Icon: FileText,
  },
  {
    title: "Poster Presentations",
    desc: "Interactive visual research galleries and Q&A forums.",
    Icon: Presentation,
  },
  {
    title: "Expert Panel Discussions",
    desc: "High-stakes debates on modern cardiometabolic challenges.",
    Icon: Users,
  },
  {
    title: "Interactive Workshops",
    desc: "Hands-on virtual skill-building and real-world case studies.",
    Icon: Wrench,
  },
  {
    title: "Young Researcher Forums",
    desc: "Spotlighting next-generation innovators in healthcare.",
    Icon: GraduationCap,
  },
  {
    title: "Networking Opportunities",
    desc: "Connect with doctors, scientists, and industry leaders.",
    Icon: Share2,
  },
];

const PILL_CLASS =
  "inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-blue-600";

export default function About() {
  const conference = useConference();
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Helmet>
        <title>{`About ${conference.name}`}</title>
        <meta
          name="description"
          content={conference.name}
        />
      </Helmet>

      <PageHero
        eyebrow="Virtual Global Conference"
        title={conference.name}
        accent={conference.edition}
        body={conference.tagline}
      />

      <Section className="bg-gradient-to-r from-blue-50 via-sky-50 to-teal-50 py-16 text-slate-900 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <div className="text-center">
              <span className={PILL_CLASS}>Conference Overview</span>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">
                Advancing Science.{" "}
                <span className="text-teal-600">Improving Healthcare.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <Card className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
              <div className="space-y-6 text-base font-normal leading-relaxed text-slate-700 sm:text-lg">
                <p>
                  Wavexa Conferences proudly presents the{" "}
                  <strong className="font-bold text-slate-950">{conference.name}</strong>
                  , a premier international virtual conference dedicated to
                  advancing scientific research, clinical excellence, and
                  innovative healthcare solutions.
                </p>

                <p>
                  Scheduled as a{" "}
                  <strong className="font-semibold text-teal-700">
                    two-day global webinar conference on {conference.dates}
                  </strong>
                  , the summit will bring together leading researchers,
                  clinicians, cardiologists, diabetologists, and healthcare
                  leaders worldwide.
                </p>

                <p>
                  {conference.about.overview}
                </p>

                <div className="rounded-2xl border-l-4 border-teal-600 bg-slate-50 p-6">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-teal-700">
                    Theme Insight
                  </span>
                  <p className="font-medium text-slate-800">
                    The conference theme,{" "}
                    <strong className="font-bold text-slate-950">“{conference.tagline}”</strong>
                    , highlights cutting-edge research, digital health, and
                    precision medicine.
                  </p>
                </div>

                <p>
                  Participants will gain valuable insights into preventive
                  cardiology, metabolic health, healthcare analytics, and
                  emerging treatment strategies.
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      <section className="relative overflow-hidden border-y border-slate-200 bg-gradient-to-r from-blue-50 via-sky-50 to-teal-50 py-16 sm:py-20">
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-10">
              <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-[23px] bg-teal-600" />
              <span className={PILL_CLASS}>Conference Theme</span>
              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl">
                Advancing Innovation and Integrated Care in{" "}
                <span className="text-teal-600">
                  Diabetes and Cardiometabolic Health
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                {conference.about.focus}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Section className="border-b border-slate-200 bg-gradient-to-r from-blue-50 via-sky-50 to-teal-50 py-16 text-slate-900 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <div className="text-center">
              <span className={PILL_CLASS}>Scientific Program</span>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">
                Learn. Share.{" "}
                <span className="text-teal-600">Connect.</span>
              </h2>
            </div>
          </Reveal>

          <Stagger className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            {SCIENTIFIC_PROGRAM.map((item, idx) => {
              const theme = PROGRAM_ACCENTS[idx % PROGRAM_ACCENTS.length]!;
              const IconComponent = item.Icon;

              return (
                <StaggerItem key={item.title}>
                  <Card
                    className={`group relative flex h-full items-start gap-4 overflow-hidden rounded-3xl border-2 bg-gradient-to-b ${theme.bgLight} p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 ${theme.border} ${theme.glow} sm:p-6`}
                  >
                    <div
                      className={`absolute left-0 top-0 h-1.5 w-full rounded-t-[23px] ${theme.accentBar}`}
                    />

                    <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className={`h-5 w-5 ${theme.iconColor}`} />
                    </div>

                    <div className="min-w-0 w-full">
                      <div className="flex items-start gap-2">
                        <h3
                          className={`text-base font-bold leading-snug transition-colors ${theme.title}`}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Section>

      <Section className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-r from-blue-50 via-sky-50 to-teal-50 py-16 text-slate-900 sm:py-20">
        <Reveal>
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
            <span className={PILL_CLASS}>Join Us</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
              A global platform for{" "}
              <span className="text-teal-600">
                knowledge, collaboration & innovation.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
              {conference.about.overview}
            </p>
            <div className="mt-9">
              <ButtonLink
                to={conferencePath(conference.id, "/registration")}
                size="lg"
                className="rounded-full bg-teal-600 px-8 py-4 text-base font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-teal-700 hover:shadow-lg"
              >
                Register for the Conference
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
