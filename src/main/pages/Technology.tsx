import { motion } from "framer-motion";
import { ArrowRight, Braces, Database, Globe2, HeartPulse, Palette, Smartphone, ServerCog } from "lucide-react";
import { Link } from "react-router-dom";
import technologyHero from "@/assets/business-design-reference.png";
import { techs } from "@/data/business";


export default function Technology(){
  return <div className="business-page business-tech-page">
    <section className="business-inner-hero business-tech-hero"><div className="business-container"><span className="business-eyebrow">TECHNOLOGY</span><h1>Powering innovation with practical technology choices.</h1><p>Our team brings deep expertise across leading technologies including PHP, Python, Angular, Java, and more.</p></div></section>
    <section className="business-section"><div className="business-container"><div className="business-section-heading"><div><span className="business-kicker">OUR TECHNOLOGY STACK</span><h2>Technology that supports the way your business works.</h2></div></div><div className="business-tech-grid">{techs.map(([title,text,Icon])=><motion.article whileHover={{y:-7}} key={title}><span className="business-card-mark" aria-hidden="true" /><h3>{title}</h3><p>{text}</p></motion.article>)}</div></div></section>
    <section className="business-section business-soft-section"><div className="business-container business-tech-story"><div><span className="business-kicker">FROM CONCEPT TO COMPLETION</span><h2>One partner across the digital journey.</h2></div><div><p>Wavexa delivers high-quality, affordable software development services to businesses of all sizes across the globe — spanning software development, web development, database administration, and creative design.</p><p>We combine technical expertise with a clear understanding of business needs so the technology supports real-world outcomes.</p><Link className="business-btn business-btn-dark" to="/business/contact">Discuss Your Project <ArrowRight /></Link></div></div></section>
  </div>;
}
