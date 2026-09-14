import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Twitter,
  Youtube,
  ArrowUpRight,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui-kit";
import { CONFERENCE } from "@/constants/conference";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-muted/30 pt-20 pb-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          
          {/* Brand */}
          <div>
            <Logo />

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {CONFERENCE.tagline}. Two days where medicine, technology and
              policy meet.
            </p>

            <div className="mt-6 flex gap-2">
              {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-heading text-xl font-semibold">Explore</h3>

            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/tracks"
                  className="transition-colors hover:text-foreground"
                >
                  Tracks
                </Link>
              </li>

              <li>
                <Link
                  to="/schedule"
                  className="transition-colors hover:text-foreground"
                >
                  Schedule
                </Link>
              </li>
            </ul>
          </div>

          {/* Conferences */}
          <div>
            <h3 className="font-heading text-xl font-semibold">
              Conferences
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/conferences/upcoming"
                  className="transition-colors hover:text-foreground"
                >
                  Upcoming Conferences
                </Link>
              </li>

            

              <li>
                <Link
                  to="/submit-abstract"
                  className="transition-colors hover:text-foreground"
                >
                  Submit Abstract
                </Link>
              </li>

              <li>
                <Link
                  to="/registration"
                  className="transition-colors hover:text-foreground"
                >
                  Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Reach Us */}
          <div>
            <h3 className="font-heading text-xl font-semibold">Reach us</h3>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{CONFERENCE.venue}</span>
              </li>

              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />

                <a
                  href={`mailto:${CONFERENCE.email}`}
                  className="hover:text-foreground"
                >
                  {CONFERENCE.email}
                </a>
              </li>

              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />

                <a
                  href={`tel:${CONFERENCE.phone.replace(/\s/g, "")}`}
                  className="hover:text-foreground"
                >
                  {CONFERENCE.phone}
                </a>
              </li>
            </ul>

            <Link
              to="/registration"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-opacity hover:opacity-80"
            >
              Secure your seat
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {CONFERENCE.name}.{" "}
            {CONFERENCE.edition}.
          </p>

          <p className="numeric tracking-[0.18em] uppercase">
            {CONFERENCE.dates}
          </p>
        </div>
      </Container>
    </footer>
  );
}