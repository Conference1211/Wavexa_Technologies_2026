import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useConference } from "@/context/ConferenceContext";

import posterDiabetes from "@/assets/3.png";
import posterCardiology from "@/assets/4.png";
import posterCardiometabolic from "@/assets/5.png";
import posterSeven from "@/assets/7.png";
import posterMetabolic from "@/assets/6.png";


const defaultPosters = [posterDiabetes, posterCardiology, posterCardiometabolic, posterSeven, posterMetabolic];

const defaultPosterTitles = ["Diabetes conference poster", "Cardiology conference poster", "Cardiometabolic Health conference poster", "Seven Key Insights conference poster", "Metabolic Health conference poster"];

export function PosterSlider() {
  const conference = useConference();
  const posters = conference.gallery.length > 0 ? conference.gallery.map((item: { image?: string }) => item.image).filter(Boolean) as string[] : [conference.image];
  const posterTitles = conference.gallery.length > 0 ? conference.gallery.map((item: { title?: string }) => item.title ?? conference.name) : [conference.name];
  const activePosterSet = conference.id === "global-summit-on-diabetes-cardiology-and-cardiometabolic-health" ? defaultPosters : posters;
  const activeTitles = conference.id === "global-summit-on-diabetes-cardiology-and-cardiometabolic-health" ? defaultPosterTitles : posterTitles;
  const [active, setActive] = useState(0);

  useEffect(() => {
  if (activePosterSet.length <= 1) return;

  const timer = window.setInterval(() => {
    setActive((current) => (current + 1) % activePosterSet.length);
  }, 5000);

  return () => window.clearInterval(timer);
}, [activePosterSet.length]);

  const previous = () => {
    setActive((current) =>
      current === 0 ? activePosterSet.length - 1 : current - 1
    );
  };

  const next = () => {
    setActive((current) => (current + 1) % activePosterSet.length);
  };

  return (
    <section className="relative overflow-hidden bg-background py-6 sm:py-8">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">

          {/* POSTER */}
          <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">

  {/* POSTER */}
  <div className="relative aspect-[16/6] w-full sm:aspect-[16/6]">
    <img
      src={activePosterSet[active]}
      alt={activeTitles[active]}
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div>

  {/* PREVIOUS */}
  <button
    type="button"
    onClick={previous}
    aria-label="Previous poster"
    className="
      absolute
      left-2
      top-1/2
      flex
      h-9
      w-9
      -translate-y-1/2
      items-center
      justify-center
      rounded-full
      border
      border-white/40
      bg-white/80
      text-foreground
      shadow-md
      backdrop-blur-md
      transition
      hover:bg-white
      sm:left-5
      sm:h-10
      sm:w-10
    "
  >
    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
  </button>

  {/* NEXT */}
  <button
    type="button"
    onClick={next}
    aria-label="Next poster"
    className="
      absolute
      right-2
      top-1/2
      flex
      h-9
      w-9
      -translate-y-1/2
      items-center
      justify-center
      rounded-full
      border
      border-white/40
      bg-white/80
      text-foreground
      shadow-md
      backdrop-blur-md
      transition
      hover:bg-white
      sm:right-5
      sm:h-10
      sm:w-10
    "
  >
    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
  </button>

  {/* DOTS */}
  <div
    className="
      flex
      items-center
      justify-center
      gap-2
      bg-card
      px-3
      py-3
      sm:absolute
      sm:bottom-4
      sm:left-1/2
      sm:-translate-x-1/2
      sm:rounded-full
      sm:bg-white/80
      sm:px-3
      sm:py-2
      sm:shadow-sm
      sm:backdrop-blur-md
    "
  >
    {activePosterSet.map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setActive(index)}
        aria-label={`Show poster ${index + 1}`}
        className={`h-2 rounded-full transition-all ${
          active === index
            ? "w-7 bg-primary"
            : "w-2 bg-foreground/30 hover:bg-foreground/50"
        }`}
      />
    ))}
  </div>

</div>
        </div>

      </div>
    </section>
  );
}