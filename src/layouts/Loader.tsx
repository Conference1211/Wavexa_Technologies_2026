
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import logoVideo from "@/assets/video.webm";

/* =========================================================
   LOADER
========================================================= */

export function Loader() {
  const [isVisible, setIsVisible] = React.useState(true);

  const closeLoader = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="wavexa-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed
            inset-0
            z-[99999]
            flex
            h-[100dvh]
            w-[100vw]
            items-center
            justify-center
            overflow-hidden
            bg-black
          "
        >
          <video
            src={logoVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={closeLoader}
            onError={closeLoader}
            className="
              block
              h-auto
              w-auto
              max-h-[80dvh]
              max-w-[90vw]
              object-contain
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================
   PAGE TRANSITION
========================================================= */

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
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
