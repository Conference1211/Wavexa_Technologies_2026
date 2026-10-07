import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Code2, Gauge, Layout, Megaphone, Search, Smartphone, Sparkles, Target, Users, WandSparkles, ClipboardCheck, PenTool, Rocket, Settings2 } from "lucide-react";
import { Link } from "react-router-dom";
import { DATA } from "@/data/businessServices";


export default function Services() {
  const { service } = useParams();
  const data = service ? DATA[service as keyof typeof DATA] : undefined;

  if (!data) {
    return (
      <div className="business-section">
        <div className="business-container">
          <h1>Service not found</h1>
        </div>
      </div>
    );
  }

  const Icon = data.icon;

  const cardIcons = [Target, Layout, Gauge, Settings2, Sparkles, Check, Users, WandSparkles];

  return (
    <div className="business-page business-service-page">
      <section
        className="business-service-hero business-service-hero--refined"
        
      >
        <div className="business-service-hero-glow" />
        <div className="business-container business-service-hero-inner">
          <div className="business-service-hero-copy">
            <span className="business-eyebrow">{data.kicker}</span>
            <h1>{data.title}</h1>
            <p>{data.intro}</p>
            <div className="business-service-hero-rule" />
          </div>
          <div className="business-service-hero-badge" aria-hidden="true"><span className="business-card-mark" /></div>
        </div>
      </section>

      <section className="business-section business-service-overview">
        <div className="business-container">
          <div className="business-service-intro business-service-intro--centered">
            <div className="business-service-intro-heading">
              <span className="business-kicker">BUILT AROUND YOUR NEEDS</span>
              <h2>Ideas, design and technology — brought together with purpose.</h2>
            </div>
            <div className="business-service-intro-copy">
              {data.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>

          <div className="business-stat-grid business-service-stats">
            {data.stats.map((s, i) => (
              <motion.article
                key={s}
                className="business-service-stat-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                whileHover={{ y: -7 }}
              >
                <span className="business-service-stat-mark" aria-hidden="true" />
                <p>{s}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="business-section business-service-feature-section">
        <div className="business-container">
          <div className="business-section-heading business-section-heading--centered">
            <div>
              <span className="business-kicker">OUR SERVICES INCLUDE</span>
              <h2>Everything you need, designed to work beautifully together.</h2>
            </div>
          </div>

          <div className="business-feature-grid business-service-feature-grid">
            {data.cards.map(([title, text], i) => {
              const CardIcon = cardIcons[i % cardIcons.length];
              return (
                <motion.article
                  key={title}
                  className="business-service-feature-card"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.42, delay: (i % 4) * 0.06 }}
                  whileHover={{ y: -9, rotate: i % 2 ? 0.25 : -0.25 }}
                >
                  <span className="business-service-feature-mark" aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <span className="business-service-feature-arrow"><ArrowRight /></span>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="business-section business-service-process-section">
        <div className="business-container">
          <div className="business-section-heading business-section-heading--centered">
            <div>
              <span className="business-kicker">OUR PROCESS</span>
              <h2>A clear, thoughtful journey from first idea to final result.</h2>
            </div>
          </div>

          <div className="business-process-grid business-service-process-grid">
            {data.process.map((title, i) => {
              const StepIcon = [Search, PenTool, Code2, ClipboardCheck, Rocket, Settings2][i] || Check;
              return (
                <motion.article
                  key={title}
                  className="business-service-process-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                  whileHover={{ y: -7 }}
                >
                  <span className="business-process-mark" aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{data.processText[i]}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="business-home-cta business-service-cta">
        <div className="business-container business-cta-inner">
          <div>
            <span className="business-kicker">READY WHEN YOU ARE</span>
            <h2>Let's turn your next idea into something people can use.</h2>
          </div>
          <Link className="business-btn business-btn-dark" to="/business/contact">
            Start a Conversation <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
