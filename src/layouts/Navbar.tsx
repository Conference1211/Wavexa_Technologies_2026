import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui-kit";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const MAIN_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Submit Abstract", to: "/submit-abstract" },
  { label: "Contact", to: "/contact" },
] as const;

const CONFERENCE_LINKS = [
  {
    label: "Upcoming Conferences",
    to: "/conferences/upcoming",
    description: "Explore upcoming Wavexa conferences and events.",
  },
  /*
  {
    label: "Previous Conferences",
    to: "/conferences/previous",
    description: "Explore our previous conferences and editions.",
  },
  */
] as const;



const PROGRAMME_LINKS = [
  /*
  {
    label: "Speakers",
    to: "/speakers",
    description: "Meet healthcare experts and industry voices.",
  },
  */
  {
    label: "Schedule",
    to: "/schedule",
    description: "View sessions, activities and the conference agenda.",
  },
] as const;

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left [background-image:var(--gradient-brand)]"
    />
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [conferenceOpen, setConferenceOpen] = React.useState(false);
  const [programmeOpen, setProgrammeOpen] = React.useState(false);

  const [mobileConferenceOpen, setMobileConferenceOpen] =
    React.useState(false);

  const [mobileProgrammeOpen, setMobileProgrammeOpen] =
    React.useState(false);

  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
    setConferenceOpen(false);
    setProgrammeOpen(false);
    setMobileConferenceOpen(false);
    setMobileProgrammeOpen(false);
  }, [pathname]);

  const isConferenceActive =
    pathname.startsWith("/conferences");

  const isProgrammeActive =
    pathname.startsWith("/speakers") ||
    pathname.startsWith("/schedule");

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(
  "fixed inset-x-0 top-0 z-50 px-3 transition-all duration-500 sm:px-4",
  scrolled ? "py-2.5" : "py-5",
)}
      >
        <div
  className={cn(
    "mx-auto grid w-full max-w-[1250px] grid-cols-[auto_1fr] items-center gap-3 rounded-full px-4 py-2.5 transition-all duration-500 lg:grid-cols-[auto_minmax(0,1fr)_auto]",
    scrolled
      ? "glass-strong shadow-[var(--shadow-soft)]"
      : "border border-transparent",
  )}
>
          {/* LOGO */}
          <Link
            to="/"
            className="shrink-0"
            aria-label="Wavexa Technologies home"
          >
            <Logo />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center justify-center gap-0.5 lg:flex">
            {/* HOME */}
            <Link
              to="/"
              className={cn(
                "relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                pathname === "/"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Home

              {pathname === "/" ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-muted/80"
                  transition={{
                    type: "spring",
                    stiffness: 340,
                    damping: 30,
                  }}
                />
              ) : null}
            </Link>

            {/* ABOUT */}
            <Link
              to="/about"
              className={cn(
                "relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                pathname === "/about"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              About

              {pathname === "/about" ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-muted/80"
                  transition={{
                    type: "spring",
                    stiffness: 340,
                    damping: 30,
                  }}
                />
              ) : null}
            </Link>

            {/* TRACKS */}
<Link
  to="/tracks"
  className={cn(
    "relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
    pathname === "/tracks"
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground",
  )}
>
  Tracks

  {pathname === "/tracks" ? (
    <motion.span
      layoutId="nav-pill"
      className="absolute inset-0 -z-10 rounded-full bg-muted/80"
      transition={{
        type: "spring",
        stiffness: 340,
        damping: 30,
      }}
    />
  ) : null}
</Link>

{/* PROGRAMME DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setProgrammeOpen(true)}
              onMouseLeave={() => setProgrammeOpen(false)}
            >
              <button
                type="button"
                onClick={() =>
                  setProgrammeOpen((value) => !value)
                }
                className={cn(
                  "relative flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                  isProgrammeActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-expanded={programmeOpen}
                aria-haspopup="menu"
              >
                Programme

                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-300",
                    programmeOpen && "rotate-180",
                  )}
                />

                {isProgrammeActive ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-muted/80"
                    transition={{
                      type: "spring",
                      stiffness: 340,
                      damping: 30,
                    }}
                  />
                ) : null}
              </button>

              <AnimatePresence>
                {programmeOpen ? (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="absolute left-1/2 top-full mt-3 w-80 -translate-x-1/2 rounded-3xl glass-strong p-2 shadow-[var(--shadow-lift)]"
                  >
                    {PROGRAMME_LINKS.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={cn(
                          "group block rounded-2xl px-4 py-3.5 transition-colors",
                          pathname === item.to
                            ? "bg-muted/70"
                            : "hover:bg-muted/60",
                        )}
                      >
                        <div className="font-heading text-base font-semibold text-foreground">
                          {item.label}
                        </div>

                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {/* CONFERENCES DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setConferenceOpen(true)}
              onMouseLeave={() => setConferenceOpen(false)}
            >
              <button
                type="button"
                onClick={() =>
                  setConferenceOpen((value) => !value)
                }
                className={cn(
                  "relative flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                  isConferenceActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-expanded={conferenceOpen}
                aria-haspopup="menu"
              >
                Conferences

                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-300",
                    conferenceOpen && "rotate-180",
                  )}
                />

                {isConferenceActive ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-muted/80"
                    transition={{
                      type: "spring",
                      stiffness: 340,
                      damping: 30,
                    }}
                  />
                ) : null}
              </button>

              <AnimatePresence>
                {conferenceOpen ? (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="absolute left-1/2 top-full mt-3 w-80 -translate-x-1/2 rounded-3xl glass-strong p-2 shadow-[var(--shadow-lift)]"
                  >
                    {CONFERENCE_LINKS.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={cn(
                          "group block rounded-2xl px-4 py-3.5 transition-colors",
                          pathname === item.to
                            ? "bg-muted/70"
                            : "hover:bg-muted/60",
                        )}
                      >
                        <div className="font-heading text-base font-semibold text-foreground">
                          {item.label}
                        </div>

                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            

            

            {/* SUBMIT ABSTRACT */}
            <Link
              to="/submit-abstract"
              className={cn(
                "relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                pathname === "/submit-abstract"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Submit Abstract

              {pathname === "/submit-abstract" ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-muted/80"
                  transition={{
                    type: "spring",
                    stiffness: 340,
                    damping: 30,
                  }}
                />
              ) : null}
            </Link>

            {/* CONTACT */}
            <Link
              to="/contact"
              className={cn(
                "relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                pathname === "/contact"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Contact

              {pathname === "/contact" ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-muted/80"
                  transition={{
                    type: "spring",
                    stiffness: 340,
                    damping: 30,
                  }}
                />
              ) : null}
            </Link>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex shrink-0 items-center justify-self-end gap-2">
            {/* THEME TOGGLE */}
            <button
              onClick={toggle}
              aria-label="Toggle colour theme"
              className="grid h-10 w-10 place-items-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            {/* REGISTER */}
            <div className="hidden sm:block">
              <ButtonLink
                to="/registration"
                size="sm"
              >
                Register
              </ButtonLink>
            </div>

            {/* MOBILE MENU */}
            <button
              onClick={() => setOpen((value) => !value)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-border/70 lg:hidden"
            >
              {open ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE NAVIGATION */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{
              opacity: 0,
              y: -12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="fixed inset-x-4 top-24 z-50 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl glass-strong p-4 shadow-[var(--shadow-lift)] lg:hidden"
          >
            <div className="grid gap-1">
              {/* HOME */}
              <Link
                to="/"
                className={cn(
                  "rounded-2xl px-4 py-3 font-heading text-xl transition-colors",
                  pathname === "/"
                    ? "bg-muted/70 text-foreground"
                    : "text-foreground/80 hover:bg-muted/70 hover:text-foreground",
                )}
              >
                Home
              </Link>

              {/* ABOUT */}
              <Link
                to="/about"
                className={cn(
                  "rounded-2xl px-4 py-3 font-heading text-xl transition-colors",
                  pathname === "/about"
                    ? "bg-muted/70 text-foreground"
                    : "text-foreground/80 hover:bg-muted/70 hover:text-foreground",
                )}
              >
                About
              </Link>
              {/* MOBILE TRACKS */}
<Link
  to="/tracks"
  className={cn(
    "rounded-2xl px-4 py-3 font-heading text-xl transition-colors",
    pathname === "/tracks"
      ? "bg-muted/70 text-foreground"
      : "text-foreground/80 hover:bg-muted/70 hover:text-foreground",
  )}
>
  Tracks
</Link>

{/* MOBILE PROGRAMME */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setMobileProgrammeOpen(
                      (value) => !value,
                    )
                  }
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-4 py-3 font-heading text-xl transition-colors",
                    isProgrammeActive
                      ? "bg-muted/70 text-foreground"
                      : "text-foreground/80 hover:bg-muted/70 hover:text-foreground",
                  )}
                >
                  <span>Programme</span>

                  <ChevronDown
                    className={cn(
                      "h-5 w-5 transition-transform duration-300",
                      mobileProgrammeOpen &&
                        "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {mobileProgrammeOpen ? (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="ml-3 mt-1 grid gap-1 border-l border-border/60 pl-3">
                        {PROGRAMME_LINKS.map(
                          (item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              className={cn(
                                "rounded-xl px-4 py-3 text-sm transition-colors",
                                pathname === item.to
                                  ? "bg-muted/70 text-foreground"
                                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                              )}
                            >
                              {item.label}
                            </Link>
                          ),
                        )}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
              {/* MOBILE CONFERENCES */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setMobileConferenceOpen(
                      (value) => !value,
                    )
                  }
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-4 py-3 font-heading text-xl transition-colors",
                    isConferenceActive
                      ? "bg-muted/70 text-foreground"
                      : "text-foreground/80 hover:bg-muted/70 hover:text-foreground",
                  )}
                >
                  <span>Conferences</span>

                  <ChevronDown
                    className={cn(
                      "h-5 w-5 transition-transform duration-300",
                      mobileConferenceOpen &&
                        "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {mobileConferenceOpen ? (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="ml-3 mt-1 grid gap-1 border-l border-border/60 pl-3">
                        {CONFERENCE_LINKS.map(
                          (item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              className={cn(
                                "rounded-xl px-4 py-3 text-sm transition-colors",
                                pathname === item.to
                                  ? "bg-muted/70 text-foreground"
                                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                              )}
                            >
                              {item.label}
                            </Link>
                          ),
                        )}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

             

              

              {/* SUBMIT ABSTRACT */}
              <Link
                to="/submit-abstract"
                className={cn(
                  "rounded-2xl px-4 py-3 font-heading text-xl transition-colors",
                  pathname === "/submit-abstract"
                    ? "bg-muted/70 text-foreground"
                    : "text-foreground/80 hover:bg-muted/70 hover:text-foreground",
                )}
              >
                Submit Abstract
              </Link>

              {/* CONTACT */}
              <Link
                to="/contact"
                className={cn(
                  "rounded-2xl px-4 py-3 font-heading text-xl transition-colors",
                  pathname === "/contact"
                    ? "bg-muted/70 text-foreground"
                    : "text-foreground/80 hover:bg-muted/70 hover:text-foreground",
                )}
              >
                Contact
              </Link>

              {/* MOBILE REGISTER */}
              <Link
                to="/registration"
                className="mt-2 rounded-2xl px-4 py-3 text-center font-button text-sm text-primary-foreground [background-image:var(--gradient-brand)]"
              >
                Register Now
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}