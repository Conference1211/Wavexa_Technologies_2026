import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoVideo from "@/assets/logovideo.mp4";
import { BUSINESS_SERVICES as services } from "@/data/business";


function WavexaLogo({ mobile = false }: { mobile?: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.playbackRate = 1.2;
    video.play().catch(() => undefined);
    return () => video.pause();
  }, []);

  return (
    <div className={`business-logo business-logo-conference ${mobile ? "business-logo-mobile" : ""}`}>
      <div className="business-logo-video">
        <video
          ref={videoRef}
          src={logoVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="Wavexa animated logo"
        />
      </div>
      <div className="business-logo-copy">
        <strong>WAVEXA</strong>
      </div>
    </div>
  );
}

export default function MainNavbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const active = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <header className="business-navbar">
      <div className="business-nav-inner">
        <Link to="/" className="business-nav-brand" aria-label="Wavexa Technologies home">
          <WavexaLogo />
        </Link>

        <nav className="business-nav-links" aria-label="Business navigation">
          <Link className={active("/") ? "is-active" : ""} to="/">Home</Link>
          <Link className={active("/business/about") ? "is-active" : ""} to="/business/about">About</Link>
          <div className="business-nav-dropdown" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className={location.pathname.startsWith("/business/services") ? "is-active" : ""} onClick={() => setServicesOpen((v) => !v)} type="button">
              Services <ChevronDown size={15} />
            </button>
            {servicesOpen && (
              <div className="business-services-menu">
                {services.map(([label, path]) => (
  <Link
    key={path}
    to={path}
    target="_blank"
    rel="noopener noreferrer"
  >
    {label}
  </Link>
))}
              </div>
            )}
          </div>
          <Link className={active("/business/technologies") ? "is-active" : ""} to="/business/technologies">Technologies</Link>
          <Link className={active("/business/contact") ? "is-active" : ""} to="/business/contact">Contact Us</Link>
        </nav>

        <button className="business-menu-button" type="button" aria-label="Open navigation" onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
  <div className="business-mobile-menu">
    <Link to="/">Home</Link>
    <Link to="/business/about">About</Link>

    <button
      type="button"
      onClick={() => setServicesOpen((v) => !v)}
    >
      Services <ChevronDown size={16} />
    </button>

    {servicesOpen &&
      services.map(([label, path]) => (
        <Link
  className="business-mobile-service"
  key={path}
  to={path}
  target="_blank"
  rel="noopener noreferrer"
>
  {label}
</Link>
      ))}

    <Link to="/business/technologies">Technologies</Link>
    <Link to="/business/contact">Contact Us</Link>
  </div>
)}
    </header>
  );
}
