import { Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "@/layouts/RootLayout";
import ScrollToTop from "@/components/ScrollToTop";
import { DEFAULT_CONFERENCE_ID } from "@/data/conferences";

import MainShell from "@/main/MainShell";
import BusinessHome from "@/main/pages/Home";
import BusinessAbout from "@/main/pages/About";
import BusinessServices from "@/main/pages/Services";
import ConferenceService from "@/main/pages/ConferenceService";
import Technology from "@/main/pages/Technology";
import BusinessContact from "@/main/pages/Contact";
import Legal from "@/main/pages/Legal";

import ConferenceShell, { ConferenceRoute } from "@/main/ConferenceShell";
import ConferenceHome from "@/pages/Home";
import ConferenceAbout from "@/pages/About";
import Speakers from "@/pages/Speakers";
import Tracks from "@/pages/Tracks";
import Schedule from "@/pages/Schedule";
import Sponsors from "@/pages/Sponsors";
import Registration from "@/pages/Registration";
import SubmitAbstract from "@/pages/SubmitAbstract";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import UpcomingConferences from "@/pages/UpcomingConferences";
import PreviousConferences from "@/pages/PreviousConferences";
import InfectiousDiseases from "@/pages/InfectiousDiseases";
import NeurologyNeuroscience from "@/pages/NeurologyNeuroscience";
import COPDAndLungHealth from "@/pages/COPDAndLungHealth";
import WomenHealthGynecology from "@/pages/WomenHealthGynecology";
import NanoscienceNanotechnology from "@/pages/NanoscienceNanotechnology";

export default function App() {
  return <ErrorBoundary><ScrollToTop /><Routes>
    <Route element={<MainShell />}>
      <Route path="/" element={<BusinessHome />} />
      <Route path="/business/about" element={<BusinessAbout />} />
      <Route path="/business/services/conference" element={<ConferenceService />} />
      <Route path="/business/services/:service" element={<BusinessServices />} />
      <Route path="/business/technologies" element={<Technology />} />
      <Route path="/business/contact" element={<BusinessContact />} />
      <Route path="/business/privacy-policy" element={<Legal type="privacy" />} />
      <Route path="/business/terms-conditions" element={<Legal type="terms" />} />
    </Route>

    <Route element={<ConferenceShell />}>
      <Route path="/conferences/:conferenceId" element={<ConferenceRoute />}>
        <Route index element={<ConferenceHome />} />
        <Route path="about" element={<ConferenceAbout />} />
        <Route path="speakers" element={<Speakers />} />
        <Route path="tracks" element={<Tracks />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="sponsors" element={<Sponsors />} />
        <Route path="registration" element={<Registration />} />
        <Route path="submit-abstract" element={<SubmitAbstract />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="/conference-home" element={<Navigate to={`/conferences/${DEFAULT_CONFERENCE_ID}`} replace />} />
      <Route path="/about" element={<Navigate to={`/conferences/${DEFAULT_CONFERENCE_ID}/about`} replace />} />
      <Route path="/speakers" element={<Navigate to={`/conferences/${DEFAULT_CONFERENCE_ID}/speakers`} replace />} />
      <Route path="/tracks" element={<Navigate to={`/conferences/${DEFAULT_CONFERENCE_ID}/tracks`} replace />} />
      <Route path="/schedule" element={<Navigate to={`/conferences/${DEFAULT_CONFERENCE_ID}/schedule`} replace />} />
      <Route path="/sponsors" element={<Navigate to={`/conferences/${DEFAULT_CONFERENCE_ID}/sponsors`} replace />} />
      <Route path="/registration" element={<Navigate to={`/conferences/${DEFAULT_CONFERENCE_ID}/registration`} replace />} />
      <Route path="/submit-abstract" element={<Navigate to={`/conferences/${DEFAULT_CONFERENCE_ID}/submit-abstract`} replace />} />
      <Route path="/faq" element={<Navigate to={`/conferences/${DEFAULT_CONFERENCE_ID}/faq`} replace />} />
      <Route path="/contact" element={<Navigate to={`/conferences/${DEFAULT_CONFERENCE_ID}/contact`} replace />} />
      <Route path="/conferences/upcoming" element={<UpcomingConferences />} />
      <Route path="/conferences/previous" element={<PreviousConferences />} />
      <Route path="/previous-conferences/international-congress-on-infectious-diseases" element={<InfectiousDiseases />} />
      <Route path="/previous-conferences/world-conference-on-neurology-and-neuroscience" element={<NeurologyNeuroscience />} />
      <Route path="/previous-conferences/international-conference-on-copd-and-lung-health" element={<COPDAndLungHealth />} />
      <Route path="/previous-conferences/world-health-congress-women-health-gynecology" element={<WomenHealthGynecology />} />
      <Route path="/previous-conferences/Technologies-summit-nanoscience-nanotechnology" element={<NanoscienceNanotechnology />} />
    </Route>
  </Routes></ErrorBoundary>;
}
