
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import MainNavbar from "./MainNavbar";
import MainFooter from "./MainFooter";
import BusinessFloatingSocials from "./BusinessFloatingSocials";

export default function MainShell() {
  const { pathname } = useLocation();

  return (
    <div className="business-site">
      <MainNavbar />

      <main>
        <motion.div
          key={pathname}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Outlet />
        </motion.div>
      </main>

      <BusinessFloatingSocials />
      <MainFooter />
    </div>
  );
}
