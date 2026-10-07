import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  Globe2,
  Rocket,
  ShieldCheck,
  Code2,
  Smartphone,
  Megaphone,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import webDesignHero from "@/assets/web-design-hero.jpg";
import mobileHero from "@/assets/mobile-app-hero.jpg";
import businessHomeHealthcareTech from "@/assets/business-home-healthcare-tech.png";
import { industries, services, reasons } from "@/data/business";


export default function Home() {
  return <div className="business-page business-home-page">
    <section
  className="business-home-hero"
  style={{
    backgroundImage: `url(${businessHomeHealthcareTech})`,
  }}
>
  <div className="business-container business-home-hero-content">
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65 }}
      className="business-hero-copy"
    >
      <span className="business-eyebrow">
        INNOVATIVE IT & HEALTHCARE SOLUTIONS
      </span>

      <h1>
        Helping healthcare organizations run smarter with advanced IT &
        Healthcare Solutions and services
      </h1>

      <p>
        A step towards transforming and innovating every industry.
      </p>

      <div className="business-hero-actions">
        <Link
          className="business-btn business-btn-light"
          to="/business/services/conference"
        >
          Explore Services <ArrowRight />
        </Link>

        <Link
          className="business-text-link"
          to="/business/about"
        >
          Discover Wavexa <ArrowRight />
        </Link>
      </div>
    </motion.div>
  </div>
</section>

    <section className="business-section business-about-split">
      <div className="business-container business-two-col">
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="business-copy-block">
          <span className="business-kicker">ABOUT WAVEXA TECHNOLOGIES</span>
          <h2>About Wavexa Technologies :</h2>
          <p>Wavexa Technologies is an IT services company committed to transforming businesses through innovative, cost-effective software solutions.</p>
          <p>Our goal is to deliver end-to-end IT excellence — from initial project planning to flawless execution and ongoing development — consistently exceeding client expectations.</p>
          <p>Our team brings deep expertise across leading technologies including PHP, Python, Angular, Java, and more. It's the trust and satisfaction of our growing global clientele that drives us forward.</p>
          <p>We deliver high-quality, affordable software development services to businesses of all sizes across the globe — spanning software development, web development, database administration, and creative design, from concept to completion.</p>
          <Link className="business-btn business-btn-dark" to="/business/about">Know More <ArrowRight /></Link>
        </motion.div>
                <div className="business-reasons-grid">
          <h2>Why Choose Us?</h2>

          {reasons.map(([title, text, Icon]) => (
            <motion.article
              whileHover={{ y: -6 }}
              className="business-reason-card"
              key={title}
            >
              <span>
                <Icon />
              </span>

              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
        

    <section className="business-section business-industries-section">
      <div className="business-container"><div className="business-section-heading"><div><span className="business-kicker">OUR SERVICES</span><h2>Modernizing every industry with advanced IT & Healthcare Solutions and services</h2></div><Link to="/business/services/conference" className="business-outline-btn">View Services <ArrowRight /></Link></div>
        <div className="business-service-grid">{services.map((item) => {const Icon=item.icon; return <motion.article whileHover={{y:-9}} className="business-service-card" key={item.title}><div className="business-service-card-accent" aria-hidden="true" /><div className="business-service-card-body"><h3>{item.title}</h3><p>{item.text}</p><Link to={item.path}>Learn More <ArrowRight /></Link></div></motion.article>})}</div>
      </div>
    </section>

    <section className="business-section business-industry-strip"><div className="business-container"><div className="business-section-heading"><div><span className="business-kicker">INDUSTRY FOCUS</span><h2>Technology built around real-world business needs</h2></div></div><div className="business-industry-grid">{industries.map(([title,text])=><article className="business-industry-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="business-home-cta"><div className="business-container business-cta-inner"><div><span className="business-kicker">LET'S BUILD WHAT'S NEXT</span><h2>Ready to move your digital vision forward?</h2><p>From concept to completion, Wavexa brings speed, quality and affordability together.</p></div><Link to="/business/contact" className="business-btn business-btn-dark">Contact Us <ArrowRight /></Link></div></section>
  </div>;
}