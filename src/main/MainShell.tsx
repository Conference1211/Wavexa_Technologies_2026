import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import MainNavbar from "./MainNavbar";
import MainFooter from "./MainFooter";
import BusinessLoader from "./BusinessLoader";
import BusinessFloatingSocials from "./BusinessFloatingSocials";

export default function MainShell() {
  const { pathname } = useLocation();
  return <div className="business-site"><BusinessLoader /><MainNavbar /><main><motion.div key={pathname} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.42,ease:[.22,1,.36,1]}}><Outlet /></motion.div></main><BusinessFloatingSocials /><MainFooter /></div>;
}
