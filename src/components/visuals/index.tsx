import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const r = (n: number) => Math.round(n * 1000) / 1000;

const SEEDS = Array.from({ length: 34 }, (_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 12345.6789;
  const c = Math.sin(i * 4.271) * 9876.54321;
  return {
    left: r(Math.abs(a % 1) * 100),
    top: r(Math.abs(b % 1) * 100),
    size: r(2 + Math.abs(c % 1) * 5),
    dur: r(9 + Math.abs(a % 1) * 14),
    delay: r(Math.abs(b % 1) * 8),
    drift: r((Math.abs(c % 1) - 0.5) * 90),
  };
});

export function Particles({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {SEEDS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-accent/45 blur-[0.5px]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{ y: [0, -140, 0], x: [0, p.drift, 0], opacity: [0, 0.85, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function FloatingShapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="float-slow absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/25 blur-[110px]" />
      <div
        className="float-slow absolute top-1/3 -right-28 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[120px]"
        style={{ animationDelay: "2.5s" }}
      />
      <div
        className="float-slow absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-secondary/20 blur-[110px]"
        style={{ animationDelay: "4.5s" }}
      />
    </div>
  );
}

export function DnaHelix({ className }: { className?: string }) {
  const rungs = Array.from({ length: 16 }, (_, i) => i);
  return (
    <svg viewBox="0 0 200 520" className={cn("h-full w-full", className)} aria-hidden>
      <defs>
        <linearGradient id="dna-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {[0, 1].map((s) => (
        <motion.path
          key={s}
          d={`M100 0 ${rungs
            .map((i) => {
              const y = i * 34;
              const x = r(100 + Math.sin((i / 3) * Math.PI + s * Math.PI) * 64);
              return `L${x} ${y}`;
            })
            .join(" ")}`}
          fill="none"
          stroke="url(#dna-grad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.3 + s * 0.2, ease: "easeInOut" }}
        />
      ))}
      {rungs.map((i) => {
        const y = i * 34;
        const x1 = r(100 + Math.sin((i / 3) * Math.PI) * 64);
        const x2 = r(100 + Math.sin((i / 3) * Math.PI + Math.PI) * 64);
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y}
            x2={x2}
            y2={y}
            stroke="url(#dna-grad)"
            strokeWidth="1.2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: 3.6, delay: i * 0.12, repeat: Infinity }}
          />
        );
      })}
    </svg>
  );
}

export function useCountdown(targetISO: string) {
  const target = React.useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(0, target - (now ?? target));
  return {
    ready: now !== null,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        className="absolute -top-1/3 left-1/2 h-[70rem] w-[70rem] -translate-x-1/2 rounded-full opacity-[0.5] blur-[130px]"
        style={{ backgroundImage: "var(--gradient-brand)" }}
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{
          rotate: { duration: 68, repeat: Infinity, ease: "linear" },
          scale: { duration: 16, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute bottom-[-30%] right-[-10%] h-[46rem] w-[46rem] rounded-full opacity-40 blur-[140px]"
        style={{ backgroundImage: "var(--gradient-gold)" }}
        animate={{ x: [0, -70, 0], y: [0, 50, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

const NODES = Array.from({ length: 18 }, (_, i) => ({
  x: r(6 + ((Math.abs(Math.sin(i * 33.7) * 1000) % 1000) / 1000) * 88),
  y: r(6 + ((Math.abs(Math.cos(i * 17.3) * 1000) % 1000) / 1000) * 88),
}));

export function NetworkLines({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]", className)}
    >
      {NODES.map((n, i) => {
        const m = NODES[(i + 5) % NODES.length]!;
        return (
          <motion.line
            key={`l${i}`}
            x1={n.x}
            y1={n.y}
            x2={m.x}
            y2={m.y}
            stroke="var(--accent)"
            strokeWidth="0.12"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.05, 0.4, 0.05] }}
            transition={{ duration: 6, delay: i * 0.25, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
      {NODES.map((n, i) => (
        <motion.circle
          key={`c${i}`}
          cx={n.x}
          cy={n.y}
          r="0.35"
          fill="var(--primary)"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 4.5, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}
