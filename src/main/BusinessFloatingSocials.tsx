import { useEffect, useState } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/data/business";

export default function BusinessFloatingSocials() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setShow(p > 0.10 && p < 0.90);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  if (!show) return null;
  return (
    <div className="business-floating-socials" aria-label="Quick contact">
      <a href={`https://wa.me/${BUSINESS.phoneRaw}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle /></a>
      <a href={`tel:${BUSINESS.phoneRaw}`} aria-label="Call"><Phone /></a>
      <a href={`mailto:${BUSINESS.email}`} aria-label="Email"><Mail /></a>
    </div>
  );
}
