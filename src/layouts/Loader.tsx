import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";

export function Loader() {
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const id = window.setTimeout(() => setDone(true), 1700);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] grid place-items-center bg-background"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 veil" />
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo className="scale-[1.6]" />
            </motion.div>
            <div className="h-px w-56 overflow-hidden bg-border">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full [background-image:var(--gradient-brand)]"
              />
            </div>
            <p className="numeric text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
               2026
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function PageTransition({
  children,
  routeKey,
}: {
  children: React.ReactNode;
  routeKey: string;
}) {
  return (
    <motion.div
      key={routeKey}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
