import amaraImage from "@/assets/amara-okonkwo.png";
import eliasImage from "@/assets/elias-vandermeer.png";
import meilinImage from "@/assets/mei-lin-chen.png";
import rafaelImage from "@/assets/rafael-duarte.png";
import sanaImage from "@/assets/sana-al-rashid.png";
export const CONFERENCE = {
  name: "Wavexa Technologies",
  tagline: "Connecting Healthcare, Innovation & Future Medicine",
  edition: "2026 World Edition",
  dates: "02–03 December 2026",
  startISO: "2026-10-12T09:00:00Z",
  city: "Geneva, Switzerland",
  venue: "Webinar",
  email: "hello@Wavexa.Technologies",
  phone: "+41 22 555 0184",
  address: "Quai Wilson 41, 1201 Geneva, Switzerland",
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Speakers", to: "/speakers" },
  { label: "Tracks", to: "/tracks" },
  { label: "Schedule", to: "/schedule" },
  { label: "Sponsors", to: "/sponsors" },
  { label: "Submit Abstract", to: "/submit-abstract" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;

export const STATS = [
  { value: 5000, suffix: "+", label: "Attendees" },
  { value: 200, suffix: "+", label: "Speakers" },
  { value: 50, suffix: "+", label: "Countries" },
  { value: 100, suffix: "+", label: "Sessions" },
];

export const WHY_ATTEND = [
  {
    title: "Frontier Research",
    body: "First-look presentations from labs shaping precision oncology, gene editing and longevity science.",
    icon: "Microscope",
  },
  {
    title: "Clinical AI in Practice",
    body: "Working deployments, not demos — hospital systems running diagnostic models at national scale.",
    icon: "BrainCircuit",
  },
  {
    title: "Curated Networking",
    body: "Matchmaking that pairs clinicians, founders and investors by intent, not by badge colour.",
    icon: "Users",
  },
  {
    title: "Policy & Access",
    body: "Ministers, regulators and payers debating the frameworks that decide who benefits first.",
    icon: "Scale",
  },
  {
    title: "Investment Floor",
    body: "€1.4B of committed health-tech capital in the room across four days of private sessions.",
    icon: "TrendingUp",
  },
  {
    title: "Hands-on Labs",
    body: "Small-format surgical robotics, imaging and bioinformatics workshops with real equipment.",
    icon: "FlaskConical",
  },
];

export const SPEAKERS = [
  {
    name: "Dr. Amara Okonkwo",
    role: "Director of Genomic Medicine",
    org: "Lagos Institute of Health",
    country: "Nigeria",
    track: "Genomics",
    initials: "AO",
    image: amaraImage,
    bio: "Leads Africa's largest population genomics programme, sequencing 500,000 genomes to close the ancestry gap in precision medicine.",
  },
  {
    name: "Prof. Elias Vandermeer",
    role: "Chair of Clinical AI",
    org: "ETH Zürich",
    country: "Switzerland",
    track: "Clinical AI",
    initials: "EV",
    image: eliasImage,
    bio: "Built the diagnostic model now triaging 40% of Swiss emergency radiology, with published non-inferiority to senior consultants.",
  },
  {
    name: "Dr. Mei-Lin Chen",
    role: "Head of Surgical Robotics",
    org: "Singapore General",
    country: "Singapore",
    track: "MedTech",
    initials: "MC",
    image: meilinImage,
    bio: "Performed the first fully tele-operated hepatic resection across a 2,400 km link with sub-40ms latency.",
  },
  {
    name: "Dr. Rafael Duarte",
    role: "Technologies Health Economist",
    org: "World Health Forum",
    country: "Brazil",
    track: "Policy",
    initials: "RD",
    image: rafaelImage,
    bio: "Architect of the tiered-pricing framework that brought CAR-T therapy to six middle-income health systems.",
  },
  {
    name: "Dr. Sana Al-Rashid",
    role: "Founder & CEO",
    org: "Vitalis Bio",
    country: "UAE",
    track: "Biotech",
    initials: "SA",
    image: sanaImage,
    bio: "Taking a first-in-class senolytic into Phase III after a decade mapping cellular ageing pathways.",
  },
  {
    name: "Prof. Ingrid Halvorsen",
    role: "Professor of Digital Epidemiology",
    org: "Karolinska Institutet",
    country: "Sweden",
    track: "Public Health",
    initials: "IH",
    bio: "Runs the Nordic wastewater surveillance network that gave Europe 11 days of early warning in the last outbreak.",
  },
  {
    name: "Dr. Kwame Mensah",
    role: "Chief Medical Officer",
    org: "Continental Care Group",
    country: "Ghana",
    track: "Health Systems",
    initials: "KM",
    bio: "Scaled a 300-clinic primary care network built entirely on offline-first digital records.",
  },
  {
    name: "Dr. Yuki Tanaka",
    role: "Principal Investigator",
    org: "RIKEN Center",
    country: "Japan",
    track: "Neurotech",
    initials: "YT",
    bio: "Developing closed-loop neural interfaces restoring fine motor control after spinal injury.",
  },
  {
    name: "Dr. Helena Fischer",
    role: "Director of Regulatory Science",
    org: "European Medicines Agency",
    country: "Germany",
    track: "Policy",
    initials: "HF",
    bio: "Drafting the adaptive approval pathway for continuously-learning medical algorithms.",
  },
  {
    name: "Dr. Priya Raghunathan",
    role: "Director of Clinical Trials",
    org: "All India Institute of Medical Sciences",
    country: "India",
    track: "Clinical AI",
    initials: "PR",
    bio: "Runs the world's largest decentralised trial network, enrolling 120,000 participants across 19 states.",
  },
  {
    name: "Dr. Lucas Moreau",
    role: "Head of Regenerative Engineering",
    org: "Institut Pasteur",
    country: "France",
    track: "Longevity",
    initials: "LM",
    bio: "Printed the first vascularised liver tissue to survive 90 days in a large-animal model.",
  },
  {
    name: "Dr. Anna Kovalenko",
    role: "Chief Data Officer",
    org: "Nordic Health Cloud",
    country: "Estonia",
    track: "Health Systems",
    initials: "AK",
    bio: "Built the cross-border record exchange now serving 14 million patients with patient-held consent.",
  },
];


export const TRACKS = [
  {
    title: "Artificial Intelligence and Digital Health in Cardiometabolic Care",
    icon: "BrainCircuit",
    sessions: 10,
    body: "Artificial Intelligence (AI) and Digital Health are transforming the prevention, diagnosis, treatment, and management of cardiometabolic diseases. This track explores machine learning, predictive analytics, digital therapeutics, wearable technologies, remote patient monitoring, digital biomarkers, clinical decision support systems, healthcare automation, and data-driven approaches that are improving patient outcomes and reshaping modern healthcare delivery.",
  },

  {
    title: "Diabetes Management and Emerging Therapies",
    icon: "Activity",
    sessions: 10,
    body: "Diabetes remains a major global health challenge requiring innovative approaches to prevention, diagnosis, treatment, and long-term disease management. This track focuses on emerging therapies, next-generation insulin technologies, continuous glucose monitoring, precision medicine, digital diabetes care, personalized treatment strategies, and patient-centered care models designed to improve glycemic control and long-term clinical outcomes.",
  },

  {
    title: "Cardiovascular Disease and Preventive Cardiology",
    icon: "HeartPulse",
    sessions: 10,
    body: "This track explores the latest advances in cardiovascular disease prevention, early detection, risk assessment, and evidence-based treatment strategies. Topics include preventive cardiology, cardiovascular risk reduction, lifestyle interventions, cardiac rehabilitation, cardiometabolic risk management, innovative therapeutics, and integrated approaches aimed at improving heart health and reducing the global burden of cardiovascular disease.",
  },

  {
    title: "Obesity, Metabolic Health and Lifestyle Medicine",
    icon: "Scale",
    sessions: 10,
    body: "Obesity and metabolic disorders are closely associated with diabetes, cardiovascular disease, and several other chronic health conditions. This track examines evidence-based approaches in nutrition, physical activity, behavioral medicine, lifestyle interventions, weight management, metabolic health optimization, and emerging therapies designed to support sustainable weight reduction and improve long-term health outcomes.",
  },

  {
    title: "Precision Medicine and Personalized Healthcare",
    icon: "Dna",
    sessions: 10,
    body: "Precision medicine is enabling healthcare professionals to develop more individualized approaches to disease prevention, diagnosis, and treatment. This track explores genomics, biomarkers, pharmacogenomics, predictive diagnostics, artificial intelligence, clinical decision support, individualized therapies, and data-driven healthcare strategies that can improve treatment effectiveness and optimize outcomes for patients with complex chronic diseases.",
  },

  {
    title: "Women's Cardiometabolic Health",
    icon: "Heart",
    sessions: 10,
    body: "Women experience unique cardiometabolic health challenges throughout different stages of life. This track addresses cardiovascular disease, diabetes, gestational diabetes, polycystic ovary syndrome (PCOS), obesity, menopause-related metabolic changes, hormonal influences, lifestyle factors, and gender-specific risk assessment, with a focus on prevention, early intervention, personalized care, and improving long-term health outcomes for women.",
  },

  {
    title: "Advances in Type 1 and Type 2 Diabetes Management",
    icon: "Activity",
    sessions: 10,
    body: "This track highlights recent advances in the management of both Type 1 and Type 2 diabetes, covering innovative treatment strategies, insulin delivery technologies, continuous glucose monitoring, automated diabetes management, personalized treatment approaches, prevention of complications, patient education, and self-management strategies. The session aims to explore practical and emerging approaches for improving diabetes outcomes and quality of life.",
  },

  {
    title: "Novel Antidiabetic Therapies and Drug Development",
    icon: "FlaskConical",
    sessions: 10,
    body: "This track focuses on emerging pharmacological therapies and innovations in antidiabetic drug development. Topics include novel drug targets, GLP-1 receptor agonists, combination therapies, next-generation diabetes medications, innovative insulin formulations, clinical trials, drug discovery, mechanisms of action, safety considerations, and future therapeutic directions aimed at addressing unmet needs in diabetes treatment.",
  },

  {
    title: "Insulin Innovations and Smart Insulin Technologies",
    icon: "Syringe",
    sessions: 10,
    body: "Advances in insulin technology are creating new possibilities for more precise and personalized diabetes management. This track explores next-generation insulin formulations, glucose-responsive and smart insulin technologies, insulin pumps, automated insulin delivery, closed-loop systems, artificial pancreas technologies, continuous glucose monitoring integration, and innovative approaches designed to improve glycemic control while reducing the burden of diabetes management.",
  },

  {
    title: "Early Detection and Risk Reduction Strategies",
    icon: "SearchCheck",
    sessions: 10,
    body: "Early identification of cardiometabolic risk can play an important role in preventing disease progression and reducing long-term complications. This track explores innovative screening methods, predictive risk assessment, biomarkers, early diagnostic approaches, cardiovascular risk prediction, diabetes prevention, lifestyle interventions, population-based strategies, and preventive healthcare models designed to identify high-risk individuals and support timely intervention.",
  },

  {
    title: "Hypertension and Heart Disease Management",
    icon: "HeartPulse",
    sessions: 10,
    body: "Hypertension and heart disease remain major contributors to cardiovascular morbidity and mortality worldwide. This track examines advances in blood pressure management, coronary artery disease, heart failure, cardiovascular risk assessment, evidence-based pharmacological therapies, lifestyle interventions, preventive strategies, and integrated care models aimed at improving blood pressure control, reducing cardiovascular events, and promoting better long-term heart health.",
  },

  {
    title: "Stem Cell Therapy",
    icon: "Microscope",
    sessions: 10,
    body: "Stem cell research is opening new possibilities in regenerative medicine and the treatment of complex diseases. This track explores stem cell biology, beta-cell regeneration, cell-based therapies, pancreatic tissue regeneration, tissue engineering, biomaterials, regenerative approaches, translational research, and emerging clinical applications of stem cell therapy, with a focus on future opportunities and challenges in regenerative healthcare.",
  },

  {
    title: "Diabetes & Metabolic Disorders",
    icon: "Activity",
    sessions: 10,
    body: "This track covers current research and clinical advances in diabetes and metabolic disorders, including insulin resistance, glucose metabolism, metabolic syndrome, dyslipidemia, lipid metabolism, hormonal regulation, obesity-related metabolic conditions, and emerging therapeutic approaches. The session provides a platform for exploring new scientific insights, clinical strategies, and integrated approaches to improving metabolic health and reducing disease complications.",
  },

  {
    title: "Cardiac Surgery",
    icon: "HeartPulse",
    sessions: 10,
    body: "This track focuses on contemporary advances in cardiac surgery and innovative approaches to the treatment of cardiovascular conditions. Topics include coronary artery bypass surgery, valve repair and replacement, minimally invasive cardiac procedures, advanced surgical techniques, perioperative management, surgical outcomes, patient safety, recovery strategies, and emerging technologies that are improving the quality and effectiveness of modern cardiac surgical care.",
  },

  {
    title: "Case Reports & Clinical Case Studies – Diabetes and Cardiology",
    icon: "FileText",
    sessions: 10,
    body: "This track provides a platform for presenting unique, challenging, and clinically significant cases in diabetes and cardiology. Discussions may include diagnostic challenges, unusual presentations, treatment decisions, complications, novel interventions, multidisciplinary approaches, patient outcomes, and valuable clinical lessons, offering healthcare professionals an opportunity to share real-world experiences and insights that can contribute to improved patient care.",
  },
];


export const SCHEDULE = [
  {
    day: "Day 01",
    date: "Mon 12 Oct",
    theme: "Foundations",
    items: [
      {
        time: "08:30",
        title: "Registration & Welcome Lounge",
        speaker: "Palais Lumière Atrium",
        type: "Networking",
      },
      {
        time: "10:00",
        title: "Opening Keynote: Medicine After Scale",
        speaker: "Dr. Amara Okonkwo",
        type: "Keynote",
      },
      {
        time: "11:30",
        title: "Panel: Who Owns the Clinical Model?",
        speaker: "Prof. Elias Vandermeer",
        type: "Panel",
      },
      {
        time: "14:00",
        title: "Workshop: Genomic Data Pipelines",
        speaker: "Dr. Sana Al-Rashid",
        type: "Lab",
      },
      {
        time: "18:30",
        title: "Opening Reception on Lake Geneva",
        speaker: "All delegates",
        type: "Social",
      },
    ],
  },
  {
    day: "Day 02",
    date: "Tue 13 Oct",
    theme: "Frontier",
    items: [
      {
        time: "09:00",
        title: "Keynote: Tele-Surgery at Continental Range",
        speaker: "Dr. Mei-Lin Chen",
        type: "Keynote",
      },
      {
        time: "10:45",
        title: "Deep Dive: Closed-Loop Neural Interfaces",
        speaker: "Dr. Yuki Tanaka",
        type: "Session",
      },
      {
        time: "13:30",
        title: "Investor Floor: Health-Tech Capital",
        speaker: "Private track",
        type: "Summit",
      },
      {
        time: "16:00",
        title: "Live Lab: Robotic Suturing Clinic",
        speaker: "MedTech faculty",
        type: "Lab",
      },
      { time: "20:00", title: "Gold Circle Dinner", speaker: "Invitation only", type: "Social" },
    ],
  },
  {
    day: "Day 03",
    date: "Wed 14 Oct",
    theme: "Systems",
    items: [
      {
        time: "09:00",
        title: "Keynote: Building Care Without Bandwidth",
        speaker: "Dr. Kwame Mensah",
        type: "Keynote",
      },
      {
        time: "11:00",
        title: "Regulating Algorithms That Keep Learning",
        speaker: "Dr. Helena Fischer",
        type: "Panel",
      },
      {
        time: "13:30",
        title: "Surveillance Networks & Early Warning",
        speaker: "Prof. Ingrid Halvorsen",
        type: "Session",
      },
      {
        time: "15:30",
        title: "Roundtables: Payers Meet Founders",
        speaker: "Curated matchmaking",
        type: "Networking",
      },
      { time: "19:00", title: "Wavexa Awards Night", speaker: "Grand Hall", type: "Social" },
    ],
  },
  {
    day: "Day 04",
    date: "Thu 15 Oct",
    theme: "Futures",
    items: [
      {
        time: "09:30",
        title: "Access Economics for Frontier Therapy",
        speaker: "Dr. Rafael Duarte",
        type: "Session",
      },
      {
        time: "11:15",
        title: "Longevity: Evidence vs Expectation",
        speaker: "Dr. Sana Al-Rashid",
        type: "Panel",
      },
      {
        time: "13:00",
        title: "Startup Finals: 12 Companies, 6 Minutes",
        speaker: "Pitch stage",
        type: "Summit",
      },
      {
        time: "15:30",
        title: "Closing Keynote & Geneva Declaration",
        speaker: "Programme committee",
        type: "Keynote",
      },
    ],
  },
];

export const SPONSOR_TIERS = [
  { tier: "Platinum", names: ["Medivance", "Helios Health", "Novara Bio", "Corvus Labs"] },
  {
    tier: "Gold",
    names: ["Atlas Imaging", "NeuroForm", "Kite Diagnostics", "Solace Care", "BioMatrix"],
  },
  {
    tier: "Silver",
    names: [
      "Lumen Genomics",
      "Vantage Robotics",
      "Cadence Health",
      "Orbit Pharma",
      "Verity Scan",
      "Halcyon Med",
    ],
  },
  {
    tier: "Community",
    names: [
      "Geneva Health Trust",
      "OpenTrials",
      "The Lancet Digital",
      "WHF",
      "MedEd Alliance",
      "CarePath",
      "Nordic Bio",
      "Aster Fund",
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "The only conference where the person questioning your methodology from the third row turns out to be the reviewer of your next paper. That density is impossible to fake.",
    name: "Dr. Laura Bianchi",
    role: "Head of Cardiology, Ospedale San Raffaele",
  },
  {
    quote:
      "We signed two hospital pilots in the corridor between sessions. Wavexa put the buyers, the regulators and the clinicians on the same floor.",
    name: "Tomás Rivera",
    role: "Co-founder, Corvus Labs",
  },
  {
    quote:
      "It reframed how our ministry thinks about procurement for AI diagnostics. We left with a policy draft, not a tote bag.",
    name: "Dr. Nadia Haddad",
    role: "Advisor, Ministry of Health",
  },
  {
    quote:
      "Four days, sixty conversations, and a collaboration that became a multi-centre trial across three continents.",
    name: "Prof. Daniel Osei",
    role: "Principal Investigator, Accra Medical",
  },
];

export const FAQS = [
  {
    q: "What is included in a delegate pass?",
    a: "Full access to all four days, every keynote and track session, the investor floor, catered lunches, the opening reception and on-demand session recordings for twelve months.",
  },
  {
    q: "Can I attend remotely?",
    a: "Yes. The Digital Pass streams all main-stage and track content live in HD with captioning in eight languages, plus moderated Q&A and virtual matchmaking.",
  },
  {
    q: "Are CME credits available?",
    a: "Wavexa Technologies 2026 is accredited for up to 26 European CME credits, transferable to AMA PRA Category 1 for delegates practising in the United States.",
  },
  {
    q: "Do you offer scholarships?",
    a: "We reserve 400 fully-funded places for clinicians, researchers and students from low- and middle-income countries. Applications close 30 June 2026.",
  },
  {
    q: "What is the refund policy?",
    a: "Full refund up to 60 days before the event, 50% up to 30 days. Passes are name-transferable at no cost until 48 hours before opening.",
  },
  {
    q: "Is there a visa invitation letter?",
    a: "Registered delegates can request an official Swiss visa support letter from their dashboard immediately after payment confirmation.",
  },
  {
    q: "How do I apply to speak?",
    a: "The call for abstracts opens in January 2026. Submissions are double-blind reviewed by the programme committee within six weeks.",
  },
];

export const TICKETS = [
  {
    name: "Early Bird Registration",
    date: "On or Before Sep 09, 2025",
    tag: "Academic",
    featured: false,
    color: "soft",
    options: [
      {
        name: "Speaker Registration",
        price: 599,
      },
      {
        name: "Delegate Registration / Listener",
        price: 449,
      },
      {
        name: "Poster Presentation",
        price: 649,
      },
      {
        name: "Package A (Registration + 2 Nights Accommodation)",
        price: 1099,
      },
      {
        name: "Package B (Registration + 3 Nights Accommodation)",
        price: 1199,
      },
      {
        name: "Special Issue Publication",
        price: 1599,
      },
      {
        name: "Regular Issue Publication",
        price: 1899,
      },
    ],
  },

  {
    name: "Normal Registration",
    date: "On or Before Dec 09, 2025",
    tag: "Academic",
    featured: false,
    color: "medium",
    options: [
      {
        name: "Speaker Registration",
        price: 612,
      },
      {
        name: "Delegate Registration / Listener",
        price: 549,
      },
      {
        name: "Poster Presentation",
        price: 749,
      },
      {
        name: "Package A (Registration + 2 Nights Accommodation)",
        price: 1199,
      },
      {
        name: "Package B (Registration + 3 Nights Accommodation)",
        price: 1299,
      },
      {
        name: "Special Issue Publication",
        price: 1699,
      },
      {
        name: "Regular Issue Publication",
        price: 1999,
      },
    ],
  },

  {
    name: "Final Registration",
    date: "On or Before Sep 07, 2026",
    tag: "Academic",
    featured: true,
    color: "strong",
    options: [
      {
        name: "Speaker Registration",
        price: 669,
      },
      {
        name: "Delegate Registration / Listener",
        price: 649,
      },
      {
        name: "Poster Presentation",
        price: 849,
      },
      {
        name: "Package A (Registration + 2 Nights Accommodation)",
        price: 1299,
      },
      {
        name: "Package B (Registration + 3 Nights Accommodation)",
        price: 1399,
      },
      {
        name: "Special Issue Publication",
        price: 1799,
      },
      {
        name: "Regular Issue Publication",
        price: 2099,
      },
    ],
  },
];

export const GALLERY = [
  { title: "Main Stage Opening", year: "2025", span: "lg" },
  { title: "Surgical Robotics Lab", year: "2025", span: "sm" },
  { title: "Investor Floor", year: "2025", span: "sm" },
  { title: "Lakeside Reception", year: "2024", span: "sm" },
  { title: "Genomics Roundtable", year: "2024", span: "lg" },
  { title: "Awards Night", year: "2024", span: "sm" },
  { title: "Poster Walk", year: "2023", span: "sm" },
  { title: "Closing Declaration", year: "2023", span: "sm" },
];

export const VENUE_FEATURES = [
  {
    title: "6 Stages",
    body: "From a 4,000-seat main auditorium to intimate 60-seat lab theatres.",
  },
  {
    title: "Lakefront Setting",
    body: "Twelve minutes from Geneva Cornavin, facing the Jet d'Eau across the water.",
  },
  {
    title: "Carbon Neutral",
    body: "Certified operations, hydro-powered, with a fully plant-forward catering programme.",
  },
  {
    title: "Full Accessibility",
    body: "Step-free throughout, hearing loops on every stage, quiet rooms on each level.",
  },
];

export const ABSTRACT_CATEGORIES = [
  {
    title: "Clinical AI & Decision Support",
    icon: "BrainCircuit",
    body: "Validation studies, prospective trials and real-world deployment evidence for clinical models.",
  },
  {
    title: "Genomics & Precision Medicine",
    icon: "Dna",
    body: "Population sequencing, polygenic risk, pharmacogenomics and ancestry-equitable methods.",
  },
  {
    title: "MedTech & Robotics",
    icon: "Bot",
    body: "Devices, tele-operation, haptics, implantables and human-factors engineering.",
  },
  {
    title: "Longevity & Regenerative Science",
    icon: "HeartPulse",
    body: "Senolytics, organoids, tissue engineering and biomarkers of biological age.",
  },
  {
    title: "Digital Health Systems",
    icon: "Network",
    body: "Interoperability, virtual wards, offline-first records and implementation science.",
  },
  {
    title: "Policy, Equity & Access",
    icon: "Scale",
    body: "Health economics, reimbursement, trial diversity and Technologies access frameworks.",
  },
];

export const ABSTRACT_DATES = [
  { date: "12 Jan 2026", label: "Call for papers opens", note: "Portal and templates published." },
  { date: "31 Mar 2026", label: "Submission deadline", note: "23:59 CET, no extensions." },
  {
    date: "15 May 2026",
    label: "Peer review complete",
    note: "Double-blind, three reviewers per abstract.",
  },
  {
    date: "01 Jun 2026",
    label: "Decisions released",
    note: "Oral, poster or rapid-fire allocation.",
  },
  {
    date: "30 Jun 2026",
    label: "Camera-ready due",
    note: "Final files and presenter registration.",
  },
  { date: "12 Oct 2026", label: "Presentation in Geneva", note: "Six stages across four days." },
];

export const ABSTRACT_PROCESS = [
  {
    step: "01",
    title: "Submit",
    body: "Structured abstract of up to 400 words with methods, results and conclusions.",
  },
  {
    step: "02",
    title: "Screen",
    body: "Programme committee checks scope, ethics approval and data availability.",
  },
  {
    step: "03",
    title: "Review",
    body: "Three independent reviewers score novelty, rigour and clinical relevance.",
  },
  {
    step: "04",
    title: "Decide",
    body: "Chairs moderate discrepancies and allocate format across the six tracks.",
  },
  {
    step: "05",
    title: "Present",
    body: "Accepted work goes on stage, with recordings archived for twelve months.",
  },
];

export const ABSTRACT_BENEFITS = [
  {
    title: "Indexed Proceedings",
    body: "Accepted abstracts are published with a citable DOI in the Wavexa proceedings.",
  },
  {
    title: "Presenter Rate",
    body: "Lead presenters receive a 40% reduction on the delegate pass.",
  },
  {
    title: "Mentored Rehearsal",
    body: "First-time presenters get a rehearsal slot with a programme committee mentor.",
  },
  {
    title: "Media Reach",
    body: "Selected work is briefed to accredited science press ahead of the opening keynote.",
  },
];

export const ABSTRACT_AWARDS = [
  {
    name: "Geneva Prize for Clinical Impact",
    value: "CHF 25,000",
    body: "Awarded to the study most likely to change practice within two years.",
  },
  {
    name: "Young Investigator Award",
    value: "CHF 10,000",
    body: "For a first or second-year researcher presenting independent work.",
  },
  {
    name: "Technologies Equity Award",
    value: "CHF 10,000",
    body: "Recognising research that widens access in low- and middle-income settings.",
  },
];

export const ABSTRACT_GUIDELINES = [
  "Maximum 400 words, structured as Background, Methods, Results, Conclusion.",
  "One table or figure permitted; supply as PNG or PDF under 5 MB.",
  "Anonymise the manuscript — no author, institution or funder names in the body.",
  "State ethics approval reference and trial registration where applicable.",
  "Only unpublished work, or work published after 1 January 2026, is eligible.",
  "Presenting author must register by 30 June 2026 to retain the slot.",
];
