import { Link, useParams } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  ArrowUpRight,
} from "lucide-react";
import logoVideo from "@/assets/logo1.webm";
import { Container } from "@/components/ui-kit";
import {
  conferencePath,
  DEFAULT_CONFERENCE_ID,
  getConference,
} from "@/data/conferences";
import { BUSINESS } from "@/data/business";

export default function Footer() {
  const { conferenceId } = useParams();

  const conference =
    getConference(conferenceId) ?? getConference(DEFAULT_CONFERENCE_ID)!;

  const withConference = (path: string) =>
    conferenceId ? conferencePath(conferenceId, path) : path;

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "#",
      hoverStyle:
        "hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "#",
      hoverStyle:
        "hover:border-pink-500 hover:text-pink-400 hover:bg-pink-500/20 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "#",
      hoverStyle:
        "hover:border-sky-600 hover:text-sky-500 hover:bg-sky-600/20 hover:shadow-[0_0_15px_rgba(2,132,199,0.3)]",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "#",
      hoverStyle:
        "hover:border-sky-400 hover:text-sky-300 hover:bg-sky-400/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "#",
      hoverStyle:
        "hover:border-red-500 hover:text-red-400 hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-emerald-500/30 bg-[#071918] pt-16 pb-10 text-emerald-50">
      {/* Background Lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[45rem] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[120px]" />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-5 lg:col-span-4">
            <div className="flex items-center gap-4">
              <video
                src={logoVideo}
                autoPlay
                loop
                muted
                playsInline
                className="h-20 w-auto object-contain"
                aria-label="Wavexa logo"
              />

              <span
                className="
                  text-[17px]
                  font-extrabold
                  tracking-[0.18em]
                  text-white
                  sm:text-[21px]
                "
              >
                WAVEXA
              </span>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-emerald-100/80">
              {conference.tagline}. Two days where medicine, technology and
              policy meet.
            </p>

            {/* Social Links - Hidden but code kept */}
            {/*
            <div className="flex gap-2.5 pt-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className={`relative grid h-10 w-10 place-items-center rounded-xl border border-emerald-500/20 bg-[#0c2624] text-emerald-200/80 transition-all duration-300 hover:-translate-y-1 ${item.hoverStyle}`}
                  >
                    <Icon className="h-4 w-4 transition-transform hover:scale-110" />
                  </a>
                );
              })}
            </div>
            */}
          </div>

          {/* Nav Links */}
          <div className="grid grid-cols-2 gap-6 lg:col-span-4">
            
            {/* Explore */}
            <div>
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-300">
                <span className="h-2 w-2 rounded-full bg-teal-300" />
                Explore
              </h3>

              <ul className="mt-5 space-y-3 text-sm font-medium text-emerald-100/80">
                <li>
                  <Link
                    to="/conference-home"
                    className="inline-block transition-all hover:translate-x-1 hover:text-teal-200"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to={withConference("/about")}
                    className="inline-block transition-all hover:translate-x-1 hover:text-teal-200"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    to={withConference("/tracks")}
                    className="inline-block transition-all hover:translate-x-1 hover:text-teal-200"
                  >
                    Tracks
                  </Link>
                </li>

                <li>
                  <Link
                    to={withConference("/schedule")}
                    className="inline-block transition-all hover:translate-x-1 hover:text-teal-200"
                  >
                    Schedule
                  </Link>
                </li>

                <li>
                  <Link
                    to={withConference("/submit-abstract")}
                    className="inline-block transition-all hover:translate-x-1 hover:text-teal-200"
                  >
                    Submit Abstract
                  </Link>
                </li>

                <li>
                  <Link
                    to={withConference("/faq")}
                    className="inline-block transition-all hover:translate-x-1 hover:text-teal-200"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Attend */}
            <div>
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-300">
                <span className="h-2 w-2 rounded-full bg-teal-300" />
                Attend
              </h3>

              <ul className="mt-5 space-y-3 text-sm font-medium text-emerald-100/80">
                <li>
                  <Link
                    to={withConference("/about")}
                    className="inline-block transition-all hover:translate-x-1 hover:text-teal-200"
                  >
                    Conference
                  </Link>
                </li>

                <li>
                  <Link
                    to={withConference("/registration")}
                    className="inline-block transition-all hover:translate-x-1 hover:text-teal-200"
                  >
                    Registration
                  </Link>
                </li>

                <li>
                  <Link
                    to={withConference("/contact")}
                    className="inline-block transition-all hover:translate-x-1 hover:text-teal-200"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Box */}
          <div className="rounded-2xl border border-emerald-500/30 bg-[#0b2120] p-6 shadow-xl backdrop-blur-xl lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Reach Us
            </h3>

            <ul className="mt-4 space-y-3.5 text-sm text-emerald-100/90">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />

                <div className="text-xs leading-relaxed text-emerald-100/90">
                  <div>{BUSINESS.address}</div>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-emerald-400" />

                <a
                  href={`mailto:${conference.email}`}
                  className="text-xs text-emerald-100/90 transition-colors duration-200 hover:text-emerald-300"
                >
                  {conference.email}
                </a>
              </li>

             
            </ul>

            <Link
              to={withConference("/registration")}
              className="mt-6 flex items-center justify-between rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-4 py-2.5 text-xs font-semibold text-emerald-200 transition-all duration-300 hover:bg-emerald-500/30 hover:text-white"
            >
              <span>Secure your seat</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-emerald-900/60 pt-6 text-xs text-emerald-300/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {conference.name}.{" "}
            {conference.edition}.
          </p>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-[#0c2624] px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <span className="text-[11px] font-semibold uppercase text-emerald-200">
              {conference.dates}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}