import { Routes, Route } from "react-router-dom";
import { RootLayout, NotFound, ErrorBoundary } from "@/layouts/RootLayout";
import ScrollToTop from "@/components/ScrollToTop";

import Home from "@/pages/Home";
import About from "@/pages/About";
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
import DentalOralHealth from "@/pages/DentalOralHealth";
import PsychiatryAndMentalHealth from "@/pages/PsychiatryAndMentalHealth";
import COPDAndLungsHealth from "@/pages/COPDAndLungsHealth";
import Cardiology from "@/pages/Cardiology";
import DiabetesAndPediatricEndocrinology from "@/pages/DiabetesAndPediatricEndocrinology";
import WomenHealthGynecology2027 from "@/pages/WomenHealthGynecology2027";

export default function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />

      <Routes>
        <Route element={<RootLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          {/* Conferences */}

          <Route
            path="/conferences/upcoming"
            element={<UpcomingConferences />}
          />

          <Route
            path="/conferences/previous"
            element={<PreviousConferences />}
          />

          {/* Previous Conference Details */}

          <Route
            path="/previous-conferences/international-congress-on-infectious-diseases"
            element={<InfectiousDiseases />}
          />

          <Route
            path="/previous-conferences/world-conference-on-neurology-and-neuroscience"
            element={<NeurologyNeuroscience />}
          />

          <Route
            path="/previous-conferences/international-conference-on-copd-and-lung-health"
            element={<COPDAndLungHealth />}
          />

          <Route
            path="/previous-conferences/world-health-congress-women-health-gynecology"
            element={<WomenHealthGynecology />}
          />

          <Route
            path="/previous-conferences/Technologies-summit-nanoscience-nanotechnology"
            element={<NanoscienceNanotechnology />}
          />
          <Route
  path="/upcoming-conferences/international-conference-on-dental-and-oral-health"
  element={<DentalOralHealth />}
/>
<Route
  path="/upcoming-conferences/international-conference-on-psychiatry-and-mental-health"
  element={<PsychiatryAndMentalHealth />}
/>
<Route
  path="/upcoming-conferences/international-conference-on-copd-and-lung-health"
  element={<COPDAndLungsHealth />}
/>
<Route
  path="/upcoming-conferences/international-conference-on-cardiology"
  element={<Cardiology />}
/>

<Route
  path="/upcoming-conferences/world-congress-on-diabetes-and-pediatric-endocrinology"
  element={<DiabetesAndPediatricEndocrinology />}
/>
<Route
  path="/upcoming-conferences/world-health-congress-on-women-health-and-gynecology"
  element={<WomenHealthGynecology2027 />}
/>

          {/* Main Pages */}

          <Route path="/speakers" element={<Speakers />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/submit-abstract" element={<SubmitAbstract />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />

          {/* 404 */}

          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </ErrorBoundary>
  );
}