import { motion } from "framer-motion";
import { ArrowRight, Crosshair, Lightbulb, ShieldCheck, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import aboutHero from "@/assets/business-design-reference.png";
import { expertise } from "@/data/business";


export default function About() {
  return <div className="business-page business-about-page">
    <section className="business-inner-hero business-about-hero"><div className="business-container"><span className="business-eyebrow">ABOUT WAVEXA</span><h1>Technology with a clear purpose.</h1><p>We deliver high-quality, affordable software development services to large and medium-sized businesses across the globe.</p></div></section>
    <section className="business-section"><div className="business-container"><div className="business-story-grid"><div><span className="business-kicker">WHO WE ARE</span><h2>Built to transform businesses through technology.</h2></div><div><p>Wavexa Technologies is an IT & Healthcare services company with a proven track record of transforming businesses through innovative, affordable software solutions.</p><p>Our mission is to combine speed, quality, and affordability to deliver IT & Healthcare Solutions that truly move our clients' businesses forward.</p></div></div>
      <div className="business-vision-grid"><motion.article whileHover={{y:-6}}><span className="business-card-mark" aria-hidden="true" /><h3>Our Vision</h3><p>Our vision is to redefine IT consulting through quality-driven solutions that help businesses stay ahead in a constantly changing digital landscape.</p></motion.article><motion.article whileHover={{y:-6}}><span className="business-card-mark" aria-hidden="true" /><h3>Our Mission</h3><p>Our mission is to combine speed, quality, and affordability to deliver IT & Healthcare Solutions that truly move our clients' businesses forward.</p></motion.article></div>
    </div></section>
    <section className="business-section business-soft-section"><div className="business-container"><div className="business-section-heading"><div><span className="business-kicker">OUR EXPERTISE</span><h2>Experience across modern technology disciplines.</h2></div></div><div className="business-expertise-grid">{expertise.map(([title,text,Icon])=><motion.article whileHover={{y:-7}} key={title}><span className="business-card-mark" aria-hidden="true" /><h3>{title}</h3><p>{text}</p></motion.article>)}</div></div></section>
    <section className="business-section"><div className="business-container business-management"><div><span className="business-kicker">OUR TEAM & MANAGEMENT</span><h2>Highly Professional Staff</h2></div><div><p>Our management team is made up of experienced professionals who've spent years building deep technical expertise and industry know-how.</p><p>Our friendly, responsive support team works closely with clients to deliver real value — helping us collaborate on better ideas and apply industry best practices.</p><Link className="business-btn business-btn-dark" to="/business/contact">Talk to Wavexa <ArrowRight /></Link></div></div></section>
  </div>;
}