import { Outlet, useLocation, useParams } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { ConferenceProvider } from "@/context/ConferenceContext";
import { getConference } from "@/data/conferences";
import Navbar from "./ConferenceNavbar";
import Footer from "./ConferenceFooter";
import { PageTransition } from "@/layouts/Loader";

export function ConferenceRoute() {
  const { conferenceId } = useParams();
  const conference = getConference(conferenceId);
  if (!conference) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-6 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">404</p>
          <h1 className="mt-3 text-3xl font-bold">Conference not found</h1>
          <p className="mt-3 text-muted-foreground">The conference link you opened is not valid.</p>
        </div>
      </div>
    );
  }
  return <ConferenceProvider><Outlet /></ConferenceProvider>;
}

export default function ConferenceShell() {
  const { pathname } = useLocation();
  return (
    <ThemeProvider>
      <Navbar />
      <main className="min-h-screen"><PageTransition routeKey={pathname}><Outlet /></PageTransition></main>
      <Footer />
    </ThemeProvider>
  );
}
