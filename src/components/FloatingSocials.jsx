import React, { useState, useEffect } from "react";

import whatsappIcon from "@/assets/whatsapp (1).png";
import phoneIcon from "@/assets/phone-call.png";
import googleIcon from "@/assets/google.png";
import { BUSINESS } from "@/data/business";

export default function FloatingSocials() {
  const [activeSocial, setActiveSocial] = useState(null);

  const socialLinks = [
    { name: "WhatsApp", icon: whatsappIcon, url: `https://wa.me/${BUSINESS.phoneRaw}` },
    { name: "Call", icon: phoneIcon, url: `tel:${BUSINESS.phoneRaw}` },
    { name: "Gmail", icon: googleIcon, url: `mailto:${BUSINESS.email}` },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) return;

      const scrollProgress = scrollTop / docHeight;

      // Hide near top (Navbar area) or bottom (Footer area)
      if (scrollProgress < 0.10 || scrollProgress > 0.90) {
        setActiveSocial(null);
        return;
      }

      // Cycle WhatsApp -> Call -> Gmail in middle section
      const middleProgress = (scrollProgress - 0.10) / 0.80;
      const index = Math.min(
        Math.floor(middleProgress * socialLinks.length),
        socialLinks.length - 1
      );

      setActiveSocial(socialLinks[index]);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!activeSocial) return null;

  return (
    <div className="fixed right-6 top-1/2 z-50 -translate-y-1/2">
      <a
        key={activeSocial.name}
        href={activeSocial.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={activeSocial.name}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white p-3 shadow-2xl ring-2 ring-primary/20 transition-all duration-300 ease-out hover:scale-110"
      >
        <img
          src={activeSocial.icon}
          alt={activeSocial.name}
          className="h-full w-full object-contain"
        />
      </a>
    </div>
  );
}