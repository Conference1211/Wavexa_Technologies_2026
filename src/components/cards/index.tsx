import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ArrowUpRight, Globe2, Linkedin, X } from "lucide-react";
import { Card, Badge } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

export function SpeakerCard({
  speaker,
  index = 0,
}: {
  speaker: {
    name: string;
    role: string;
    org: string;
    country: string;
    track: string;
    initials: string;
    image?: string;
    bio: string;   
  };
  index?: number;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Card className="group p-0">
      <div className="relative aspect-[4/3.2] overflow-hidden">
        {speaker.image ? (
  <motion.img
    src={speaker.image}
    alt={speaker.name}
    className="
      absolute
      left-1/2
      top-0
      h-full
      w-[115%]
      max-w-none
      -translate-x-1/2
      object-cover
      object-[center_20%]
    "
    whileHover={{
      scale: 1.04,
    }}
    transition={{
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    }}
  />
) : (
  <motion.div
    className="absolute inset-0 [background-image:var(--gradient-brand)] opacity-90"
    style={{
      backgroundSize: "220% 220%",
      backgroundPosition: `${(index * 23) % 100}% 40%`,
    }}
    whileHover={{ scale: 1.06 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    <span className="absolute inset-0 grid place-items-center font-display text-6xl font-semibold text-primary-foreground/95">
      {speaker.initials}
    </span>
  </motion.div>
)}

<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
          <Badge tone="gold" className="glass-strong border-0">
            {speaker.track}
          </Badge>
          <span className="glass-strong flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] text-foreground">
            <Globe2 className="h-3 w-3" /> {speaker.country}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold tracking-tight">{speaker.name}</h3>
        <p className="mt-1 text-sm text-accent">{speaker.role}</p>
        <p className="text-sm text-muted-foreground">{speaker.org}</p>
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="glass rounded-full px-4 py-2 text-xs font-button uppercase tracking-[0.16em] transition-colors hover:bg-muted/70"
          >
            Biography
          </button>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${speaker.name} on LinkedIn`}
            className="grid h-9 w-9 place-items-center rounded-full [background-image:var(--gradient-brand)] text-primary-foreground transition-transform hover:scale-110"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-100 grid place-items-center bg-[oklch(0.16_0.026_252)]/70 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong gradient-border relative w-full max-w-lg rounded-3xl p-8"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close biography"
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-muted/70 transition-colors hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
              <Badge tone="gold">{speaker.track}</Badge>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
                {speaker.name}
              </h3>
              <p className="mt-1 text-sm text-accent">{speaker.role}</p>
              <p className="text-sm text-muted-foreground">
                {speaker.org} · {speaker.country}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{speaker.bio}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Card>
  );
}

export function SponsorCard({ name, tier }: { name: string; tier: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className="glass gradient-border group flex items-center gap-4 rounded-2xl px-5 py-5"
    >
      <span
        className={cn(
          "grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-sm font-bold",
          tier === "Diamond" || tier === "Platinum"
            ? "[background-image:var(--gradient-brand)] text-primary-foreground"
            : tier === "Gold"
              ? "[background-image:var(--gradient-gold)] text-[oklch(0.2_0.03_252)]"
              : "bg-muted text-muted-foreground",
        )}
      >
        {initials}
      </span>
      <div className="min-w-0">
        <p className="truncate font-heading text-lg font-semibold">{name}</p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{tier}</p>
      </div>
      <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}

export function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <Card className="flex h-full flex-col">
      <Quote className="h-7 w-7 text-accent/70" />
      <p className="mt-5 flex-1 font-heading text-[22px] leading-snug text-foreground/90">
        "{quote}"
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
        <span className="grid h-10 w-10 place-items-center rounded-full [background-image:var(--gradient-brand)] text-xs font-semibold text-primary-foreground">
          {name
            .split(" ")
            .slice(-2)
            .map((w) => w[0])
            .join("")}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{name}</p>
          <p className="truncate text-xs text-muted-foreground">{role}</p>
        </div>
        <span className="ml-auto flex gap-0.5 text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-current" />
          ))}
        </span>
      </div>
    </Card>
  );
}
