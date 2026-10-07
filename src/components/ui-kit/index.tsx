import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  useMotionValueEvent,
  animate,
} from "framer-motion";
import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/* ---------------------------------- Button --------------------------------- */

export const buttonStyles = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-full font-button font-medium tracking-tight transition-[transform,box-shadow,background,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "text-primary-foreground shadow-[var(--shadow-soft)] [background-image:var(--gradient-brand)] [background-size:180%_180%] hover:[background-position:100%_50%] hover:shadow-[var(--shadow-lift)]",
        gold: "text-[oklch(0.2_0.03_252)] [background-image:var(--gradient-gold)] shadow-[var(--shadow-soft)]",
        outline: "gradient-border bg-transparent text-foreground hover:bg-muted/60",
        ghost: "text-foreground/80 hover:bg-muted/70 hover:text-foreground",
        glass: "glass text-foreground hover:bg-surface-strong",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <Magnetic>
      <button className={cn(buttonStyles({ variant, size }), className)} {...props} />
    </Magnetic>
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  to,
  children,
}: VariantProps<typeof buttonStyles> & {
  className?: string;
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Magnetic>
      <Link to={to} className={cn(buttonStyles({ variant, size }), className)}>
        {children}
      </Link>
    </Magnetic>
  );
}

/* -------------------------------- Magnetic --------------------------------- */

export function Magnetic({
  children,
  strength = 14,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });

  return (
    <motion.span
      style={{ x, y, display: "inline-flex" }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
        y.set(((e.clientY - r.top) / r.height - 0.5) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------ Layout pieces ------------------------------ */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  className,
  children,
  id,
  veil = false,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  veil?: boolean;
}) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", veil && "veil", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Badge({
  children,
  className,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "gold" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em]",
        tone === "brand" && "border-primary/25 bg-primary/8 text-primary",
        tone === "gold" && "border-gold/35 bg-gold/10 text-gold",
        tone === "muted" && "border-border bg-muted/60 text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Heading({
  eyebrow,
  title,
  accent,
  body,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Badge className="mb-5">{eyebrow}</Badge> : null}

      <h2
  className="
    mx-auto
    max-w-[640px]
    text-4xl
    font-bold
    leading-tight
    tracking-[-0.035em]
    text-foreground
    text-balance
    sm:text-4xl
  "
>
        {title}{" "}
        {accent ? (
  <span className="text-teal-600">
    {accent}
  </span>
) : null}
      </h2>

      {body ? (
        <p
          className={cn(
            "mt-5 text-[17px] leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}

/* -------------------------------- Animation -------------------------------- */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------- Card ----------------------------------- */

export function Card({
  children,
  className,
  lift = true,
}: {
  children: React.ReactNode;
  className?: string;
  lift?: boolean;
}) {
  return (
    <motion.div
      whileHover={lift ? { y: -8 } : {}}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "gradient-border glass relative overflow-hidden rounded-3xl p-7 shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------- Counter --------------------------------- */

export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = React.useState(0);

  useMotionValueEvent(mv, "change", (v) => setDisplay(Math.round(v)));

  React.useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
      return () => controls.stop();
    }
    return undefined;
  }, [inView, mv, value]);

  return (
    <span ref={ref} className={cn("numeric tabular-nums", className)}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}