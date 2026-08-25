import { Helmet } from "@/components/Seo";
import { PageHero } from "@/components/sections/Hero";
import { Section, Reveal, ButtonLink } from "@/components/ui-kit";
import { FaqAccordion } from "@/components/forms";
import { FAQS } from "@/constants/conference";

export default function FAQ() {
  const faqJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });

  return (
    <>
      <Helmet>
        <title>FAQ — Wavexa Technologies 2026</title>
        <meta
          name="description"
          content="Passes, CME credits, remote access, scholarships, refunds and visa letters — answers to the most common Wavexa Technologies 2026 questions."
        />
        <meta property="og:title" content="FAQ — Wavexa Technologies 2026" />
        <meta property="og:description" content="Everything delegates ask before booking Geneva." />
        <meta property="og:url" content="/faq" />
        <link rel="canonical" href="/faq" />
        <script type="application/ld+json">{faqJsonLd}</script>
      </Helmet>

      <PageHero
        eyebrow="FAQ"
        title="Answers before"
        accent="you book"
        body="If something is missing here, the programme team replies to every email within one working day."
      />
      <Section className="pt-0">
        <Reveal className="mx-auto max-w-3xl">
          <FaqAccordion items={FAQS} />
        </Reveal>
        <Reveal className="mt-12 text-center">
          <ButtonLink to="/contact" variant="outline" size="lg">
            Still have a question?
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
