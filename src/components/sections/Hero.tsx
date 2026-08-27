import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  MapPin,
  Sparkles,
  Ticket,
  Users2,
  Activity,
} from "lucide-react";
import { ButtonLink, Container, Counter, Badge } from "@/components/ui-kit";
import {
  Particles,
  FloatingShapes,
  DnaHelix,
  Aurora,
  NetworkLines,
  useCountdown,
} from "@/components/visuals";
import { CONFERENCE, STATS } from "@/constants/conference";

const WORDS = ["Healthcare,", "Innovation,", "Research,", "Future Medicine"];

const GLASS_CARDS = [
  {
    icon: Users2,
    title: "Featured Speaker",
    body: "Dr. Amara Okonkwo — Genomic Medicine",
    className: "left-0 top-6 w-64",
    delay: 1.1,
    depth: 26,
  },
  {
    icon: CalendarDays,
    title: "Day 02 · 09:00",
    body: "Tele-Surgery at Continental Range",
    className: "right-2 top-1/3 w-60",
    delay: 1.25,
    depth: -34,
  },
  {
    icon: Activity,
    title: "Clinical AI Track",
    body: "22 sessions · live model governance",
    className: "left-8 bottom-8 w-64",
    delay: 1.4,
    depth: 18,
  },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const mx = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative flex min-h-screen items-center overflow-hidden veil pt-32 pb-20"
    >
      <Aurora />
      <FloatingShapes />
      <NetworkLines />
      <Particles />
      <div aria-hidden className="noise pointer-events-none absolute inset-0" />

      <Container className="relative">
        <motion.div
          style={{ y, opacity }}
          className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]"
        >
          {/* ------------------------------- Left column ------------------------------ */}
          <div className="relative max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="glass-strong inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Live · Registration open
              </span>
              <Badge tone="gold">{CONFERENCE.edition}</Badge>
            </motion.div>

            <h1 className="mt-7 font-display text-[clamp(2.6rem,6.4vw,5.2rem)] leading-[0.98] font-semibold tracking-tight">
              <span className="block text-muted-foreground/80">Connecting</span>
              {WORDS.map((w, i) => (
                <motion.span
                  key={w}
                  className="block"
                  initial={{ opacity: 0, y: 44, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.32 + i * 0.13, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                >
                  {i === WORDS.length - 1 ? <span className="text-gradient italic">{w}</span> : w}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.8 }}
              className="mt-7 max-w-xl text-[17px] leading-relaxed text-muted-foreground"
            >
              Four days in Geneva where clinicians, researchers, founders and regulators from fifty
              countries decide what medicine looks like next — evidence first, keynotes second.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <ButtonLink to="/registration" size="lg" className="group">
                Register Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink to="/submit-abstract" size="lg" variant="gold" className="group">
                Submit Abstract
                <FileText className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink to="/tracks" size="lg" variant="outline">
                Explore Conference
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-accent" /> {CONFERENCE.dates}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" /> {CONFERENCE.venue}, {CONFERENCE.city}
              </span>
              <span className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-gold" /> Early bird until 30 June
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gold" /> Limited to 5,000 seats
              </span>
            </motion.div>

            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.1, duration: 0.7 }}
                  whileHover={{ y: -6 }}
                  className="glass gradient-border rounded-2xl px-4 py-5"
                >
                  <p className="numeric text-3xl font-bold tracking-tight sm:text-4xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ------------------------------ Right column ------------------------------ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden h-[34rem] lg:block"
          >
            <motion.div
              style={{ x: useTransform(mx, (v) => v * -30), y: useTransform(my, (v) => v * -24) }}
              className="absolute inset-0 grid place-items-center"
            >
              <div className="glass-strong gradient-border relative h-[30rem] w-[22rem] overflow-hidden rounded-[2.5rem]">
                <div aria-hidden className="absolute inset-0 veil opacity-90" />
                <div className="absolute inset-0 p-6 opacity-90">
                  <DnaHelix />
                </div>
              </div>
            </motion.div>

            {GLASS_CARDS.map((c) => (
              <FloatCard key={c.title} card={c} mx={mx} my={my} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function FloatCard({
  card,
  mx,
  my,
}: {
  card: (typeof GLASS_CARDS)[number];
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const x = useTransform(mx, (v) => v * card.depth);
  const y = useTransform(my, (v) => v * card.depth);
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: card.delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ x, y }}
      className={`absolute ${card.className}`}
    >
      <motion.div
        whileHover={{ y: -6 }}
        className="glass-strong gradient-border float-slow rounded-2xl p-4 shadow-[var(--shadow-soft)]"
      >
        <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <Icon className="h-3.5 w-3.5 text-accent" /> {card.title}
        </span>
        <p className="mt-2 font-heading text-[15px] leading-snug font-semibold">{card.body}</p>
      </motion.div>
    </motion.div>
  );
}

export function Countdown() {
  const { ready, days, hours, minutes, seconds } = useCountdown(CONFERENCE.startISO);
  const parts = [
    { v: days, l: "Days" },
    { v: hours, l: "Hours" },
    { v: minutes, l: "Minutes" },
    { v: seconds, l: "Seconds" },
  ];

  return (
    <div className="glass-strong gradient-border grid grid-cols-2 gap-4 rounded-[2rem] p-7 sm:grid-cols-4 sm:p-9">
      {parts.map((p) => (
        <div key={p.l} className="text-center">
          <p className="numeric text-4xl font-bold tracking-tight text-gradient sm:text-6xl">
            {ready ? String(p.v).padStart(2, "0") : "--"}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            {p.l}
          </p>
        </div>
      ))}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  body,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  body: string;
}) {
  return (
    <section
      className="
        relative
        flex
        h-[360px]
        items-center
        overflow-hidden
        veil

        sm:h-[400px]

        lg:h-[600px]
      "
    >
      <Aurora />

      <FloatingShapes />

      <Particles className="opacity-60" />

      <div
        aria-hidden
        className="noise pointer-events-none absolute inset-0"
      />

      <Container className="relative">
        <motion.div
          initial={{
            opacity: 0,
            y: 26,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-3xl"
        >
          <Badge>{eyebrow}</Badge>

          <h1
            className="
              mt-6
              font-display
              text-[clamp(2.4rem,5.4vw,4.2rem)]
              font-semibold
              leading-[1.02]
              tracking-tight
              text-balance
            "
          >
            {title}{" "}

            {accent ? (
              <span className="text-gradient italic">
                {accent}
              </span>
            ) : null}
          </h1>

          <p
            className="
              mt-5
              max-w-2xl
              text-[17px]
              leading-relaxed
              text-muted-foreground
            "
          >
            {body}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}