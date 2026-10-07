import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import {
  Link,
  useLocation,
} from "react-router-dom";

import logoVideo from "@/assets/logovideo.mp4";

/* =========================================================
   NAVIGATION ITEMS
========================================================= */

const navItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Tracks",
    path: "/tracks",
  },
  {
    label: "Submit Abstract",
    path: "/submit-abstract",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];



const conferenceItems = [
  {
    label: "Upcoming Conferences",
    path: "/conferences/upcoming",
  },
];

/* =========================================================
   WAVEXA LOGO
========================================================= */

function WavexaLogo({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.playbackRate = 1.2;

    const playAnimation = async () => {
      try {
        await video.play();
      } catch {
        // Browser autoplay protection.
      }
    };

    playAnimation();

    return () => {
      video.pause();
    };
  }, []);

  return (
    <div
      className={`
        flex
        items-center
        ${mobile ? "gap-3" : "gap-4"}
      `}
    >
      {/* LOGO VIDEO */}

      <div
        className={`
          relative
          shrink-0
          overflow-hidden
          bg-transparent
          ${
            mobile
              ? "h-[52px] w-[52px]"
              : "h-[72px] w-[72px]"
          }
        `}
      >
        <video
          ref={videoRef}
          src={logoVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="Wavexa animated logo"
          className="
            absolute
            inset-0
            h-full
            w-full
            scale-[1.18]
            object-contain
          "
        />
      </div>

      {/* LOGO TEXT */}

      <div className="flex flex-col leading-none">
        <span
          className={`
            font-extrabold
            tracking-[0.18em]
            text-[#123f72]
            ${
              mobile
                ? "text-[17px]"
                : "text-[21px]"
            }
          `}
        >
          WAVEXA
        </span>

        
      </div>
    </div>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

export function Navbar() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  

  const [conferenceOpen, setConferenceOpen] =
    useState(false);

  const location = useLocation();

  /* =======================================================
     ACTIVE LINK
  ======================================================= */

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname === path;
  };

  const programActive =
    location.pathname.startsWith("/schedule");

  const conferenceActive =
    location.pathname.startsWith("/conferences");

  /* =======================================================
     CLOSE MOBILE MENU
  ======================================================= */

  const closeMobileMenu = () => {
  setMobileOpen(false);
  setConferenceOpen(false);
};

  /* =======================================================
     CLOSE MENUS WHEN ROUTE CHANGES
  ======================================================= */

  useEffect(() => {
  setMobileOpen(false);
  setConferenceOpen(false);
}, [location.pathname]);

  return (
    <header
  className="
    sticky
    top-0
    z-50
    w-full
    border-b
    border-[#dce8f3]
    bg-gradient-to-r
    from-[#f8fcff]
    via-white
    to-[#f2f9ff]
    shadow-[0_5px_24px_rgba(18,60,112,0.07)]
  "
>
      <nav
        className="
          mx-auto
          max-w-[1480px]
          px-5
          sm:px-8
          lg:px-10
          xl:px-12
        "
      >
        {/* =================================================
            MAIN NAVBAR ROW
        ================================================= */}

        <div
          className="
            flex
            min-h-[72px]
            items-center
            justify-between
            gap-6
          "
        >
          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            onClick={closeMobileMenu}
            aria-label="Wavexa Conferences Home"
            className="
              shrink-0
              transition-opacity
              duration-200
              hover:opacity-90
            "
          >
            <WavexaLogo />
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div
            className="
              hidden
              items-center
              gap-7
              xl:flex
            "
          >
            {/* HOME / ABOUT / TRACKS */}

            {navItems
              .slice(0, 3)
              .map((item) => {
                const active =
                  isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      relative
                      whitespace-nowrap
                      py-5
                      text-[15px]
                      font-semibold
                      transition-colors
                      duration-200
                      ${
                        active
                          ? "text-[#078ee9]"
                          : "text-[#29486c] hover:text-[#078ee9]"
                      }
                    `}
                  >
                    {item.label}

                    {active && (
                      <span
                        className="
                          absolute
                          -bottom-[-10px]
                          left-0
                          right-0
                          h-[2px]
                          rounded-full
                          bg-[#078ee9]
                        "
                      />
                    )}
                  </Link>
                );
              })}

            {/* =================================================
    PROGRAM
================================================= */}

{/* =================================================
    PROGRAM
================================================= */}

<Link
  to="/schedule"
  onClick={closeMobileMenu}
  className={`
    rounded-xl
    px-4
    py-3.5
    text-center
    text-[14px]
    font-semibold
    transition-all
    duration-200
    ${
      programActive
        ? "bg-[#124b8c] text-white"
        : "text-[#29486c] hover:bg-[#eef8ff] hover:text-[#078ee9]"
    }
  `}
>
  Program
</Link>

            {/* =================================================
                CONFERENCES DROPDOWN
            ================================================= */}

            <div className="relative">
              <button
                type="button"
                onClick={() => {
  setConferenceOpen(
    (value) => !value,
  );
}}
                className={`
                  relative
                  flex
                  items-center
                  gap-1.5
                  whitespace-nowrap
                  py-5
                  text-[15px]
                  font-semibold
                  transition-colors
                  duration-200
                  ${
                    conferenceActive
                      ? "text-[#078ee9]"
                      : "text-[#29486c] hover:text-[#078ee9]"
                  }
                `}
              >
                Conferences

                <ChevronDown
                  size={17}
                  className={`
                    transition-transform
                    duration-200
                    ${
                      conferenceOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />

                {conferenceActive && (
                  <span
                    className="
                      absolute
                      -bottom-[-10px]
                      left-0
                      right-0
                      h-[2px]
                      rounded-full
                      bg-[#078ee9]
                    "
                  />
                )}
              </button>

              {conferenceOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-[62px]
                    z-50
                    w-[255px]
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#dce8f3]
                    bg-white
                    p-2
                    shadow-[0_20px_55px_rgba(18,60,112,0.15)]
                  "
                >
                  {conferenceItems.map(
                    (item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() =>
                          setConferenceOpen(
                            false,
                          )
                        }
                        className="
                          block
                          rounded-xl
                          px-4
                          py-3.5
                          text-[14px]
                          font-medium
                          text-[#29486c]
                          transition-colors
                          duration-200
                          hover:bg-[#eef8ff]
                          hover:text-[#078ee9]
                        "
                      >
                        {item.label}
                      </Link>
                    ),
                  )}
                </div>
              )}
            </div>

            {/* =================================================
                SUBMIT ABSTRACT
            ================================================= */}

            {navItems
              .slice(3, 5)
              .map((item) => {
                const active =
                  isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      relative
                      whitespace-nowrap
                      py-5
                      text-[15px]
                      font-semibold
                      transition-colors
                      duration-200
                      ${
                        active
                          ? "text-[#078ee9]"
                          : "text-[#29486c] hover:text-[#078ee9]"
                      }
                    `}
                  >
                    {item.label}

                    {active && (
                      <span
                        className="
                          absolute
                          -bottom-[-10px]
                          left-0
                          right-0
                          h-[2px]
                          rounded-full
                          bg-[#078ee9]
                        "
                      />
                    )}
                  </Link>
                );
              })}
          </div>

          {/* =================================================
              REGISTER BUTTON
          ================================================= */}

          <Link
  to="/registration"
  className="
    hidden
    h-[50px]
    shrink-0
    items-center
    justify-center
    gap-3
    rounded-full
    bg-[#124b8c]
    px-7
    text-[14px]
    font-bold
    text-white
    shadow-[0_9px_25px_rgba(18,75,140,0.18)]
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:bg-[#0d3d76]
    xl:inline-flex
  "
>
  Register Now

  
</Link>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen(
                (value) => !value,
              )
            }
            aria-label={
              mobileOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-[#cdddea]
              bg-white
              text-[#124b8c]
              transition-all
              duration-200
              hover:border-[#078ee9]
              hover:bg-[#eef8ff]
              hover:text-[#078ee9]
              xl:hidden
            "
          >
            {mobileOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>

        {/* =================================================
            MOBILE NAVIGATION
        ================================================= */}

        {mobileOpen && (
          <div
            className="
              border-t
              border-[#e1edf6]
              py-5
              xl:hidden
            "
          >
            <div className="flex flex-col gap-1 text-center">

              {/* HOME / ABOUT / TRACKS */}

              {navItems
                .slice(0, 3)
                .map((item) => {
                  const active =
                    isActive(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMobileMenu}
                      className={`
  rounded-xl
  px-4
  py-3.5
  text-center
  text-[14px]
  font-semibold
                        ${
                          active
                            ? "bg-[#124b8c] text-white"
                            : "text-[#29486c] hover:bg-[#eef8ff] hover:text-[#078ee9]"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  );
                })}

              {/* =================================================
    PROGRAM MOBILE DROPDOWN
================================================= */}

{/* =================================================
    PROGRAM
================================================= */}

<Link
  to="/schedule"
  onClick={closeMobileMenu}
  className={`
    rounded-xl
    px-4
    py-3.5
    text-center
    text-[14px]
    font-semibold
    transition-all
    duration-200
    ${
      programActive
        ? "bg-[#124b8c] text-white"
        : "text-[#29486c] hover:bg-[#eef8ff] hover:text-[#078ee9]"
    }
  `}
>
  Program
</Link>

              {/* =================================================
    CONFERENCES MOBILE DROPDOWN
================================================= */}

<button
  type="button"
  onClick={() => {
  setConferenceOpen(
    (value) => !value,
  );
}}
  className={`
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    px-4
    py-3.5
    text-center
    text-[14px]
    font-semibold
    transition-all
    duration-200
    ${
      conferenceActive
        ? "bg-[#124b8c] text-white"
        : "text-[#29486c] hover:bg-[#eef8ff] hover:text-[#078ee9]"
    }
  `}
>
  <span>
    Conferences
  </span>

  <ChevronDown
    size={18}
    className={`
      transition-transform
      duration-200
      ${
        conferenceOpen
          ? "rotate-180"
          : ""
      }
    `}
  />
</button>

              {conferenceOpen && (
                <div
                  className="
                    ml-4
                    border-l-2
                    border-[#d8edf9]
                    pl-3
                  "
                >
                  {conferenceItems.map(
                    (item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeMobileMenu}
                        className="
                          block
                          rounded-xl
                          px-4
                          py-3
                          text-[14px]
                          font-medium
                          text-[#66809f]
                          transition-colors
                          duration-200
                          hover:bg-[#eef8ff]
                          hover:text-[#078ee9]
                        "
                      >
                        {item.label}
                      </Link>
                    ),
                  )}
                </div>
              )}

              {/* =================================================
                  SUBMIT ABSTRACT / CONTACT
              ================================================= */}

              {navItems
                .slice(3, 5)
                .map((item) => {
                  const active =
                    isActive(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMobileMenu}
                      className={`
                        rounded-xl
                        px-4
                        py-3.5
                        text-[14px]
                        font-semibold
                        ${
                          active
                            ? "bg-[#124b8c] text-white"
                            : "text-[#29486c] hover:bg-[#eef8ff] hover:text-[#078ee9]"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  );
                })}

              {/* =================================================
                  MOBILE REGISTER
              ================================================= */}

              <Link
                to="/registration"
                onClick={closeMobileMenu}
                className="
                  mt-3
                  flex
                  h-12
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-[#124b8c]
                  text-[14px]
                  font-bold
                  text-white
                  transition-all
                  duration-200
                  hover:bg-[#0d3d76]
                "
              >
                Register Now

                <span className="text-[18px]">
                  →
                </span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;