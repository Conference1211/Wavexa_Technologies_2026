import amaraImage from "@/assets/amara-okonkwo.png";
import eliasImage from "@/assets/elias-vandermeer.png";
import meilinImage from "@/assets/mei-lin-chen.png";
import rafaelImage from "@/assets/rafael-duarte.png";
import sanaImage from "@/assets/sana-al-rashid.png";

export const CONFERENCE = {
  name: "Global Summit on Diabetes, Cardiology & Cardiometabolic Health",
  tagline:
    "Advancing Innovation and Integrated Care in Diabetes and Cardiometabolic Health",
  edition: "2026",
  dates: "09–10 December 2026",
  startISO: "2026-12-09T09:00:00Z",
  venue: "Webinar",
  email: "info@wavexaglobal.com",
  phone: "+91 94403 88379",
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },

  { label: "About", to: "/about" },

  // { label: "Speakers", to: "/speakers" },

  { label: "Tracks", to: "/tracks" },

  { label: "Schedule", to: "/schedule" },

  // { label: "Sponsors", to: "/sponsors" },

  { label: "Submit Abstract", to: "/submit-abstract" },

  { label: "FAQ", to: "/faq" },

  { label: "Contact", to: "/contact" },
] as const;
/* =========================================================
   STATS
========================================================= */

export const STATS = [
  { value: 2, suffix: "", label: "Conference Days" },
  { value: 15, suffix: "", label: "Scientific Tracks" },
  { value: 2026, suffix: "", label: "Conference Edition" },
  { value: 1, suffix: "", label: "Global Webinar" },
];

/* =========================================================
   WHY ATTEND
========================================================= */

export const WHY_ATTEND = [
  {
    title: "Scientific Excellence",
    body:
      "Explore current research, clinical developments and emerging approaches across diabetes, cardiology and cardiometabolic health.",
    icon: "Microscope",
  },
  {
    title: "Expert Insights",
    body:
      "Gain valuable perspectives from clinicians, researchers and healthcare professionals working across diabetes, cardiovascular and metabolic medicine.",
    icon: "BrainCircuit",
  },
  {
    title: "Emerging Therapies",
    body:
      "Discover innovative therapeutic strategies, new technologies and evolving approaches to diabetes and cardiovascular care.",
    icon: "FlaskConical",
  },
  {
    title: "Digital Health & AI",
    body:
      "Explore the role of artificial intelligence, digital health, remote monitoring and data-driven technologies in modern cardiometabolic care.",
    icon: "Cpu",
  },
  {
    title: "Global Collaboration",
    body:
      "Connect with an international scientific community and exchange knowledge across disciplines, institutions and healthcare systems.",
    icon: "Globe2",
  },
  {
    title: "Patient-Centered Care",
    body:
      "Discover integrated approaches focused on prevention, early detection, treatment, long-term management and better patient outcomes.",
    icon: "HeartPulse",
  },
];

/* =========================================================
   SPEAKERS
========================================================= */

export const SPEAKERS = [
  {
    name: "Dr. Amara Okonkwo",
    role: "Diabetes & Cardiometabolic Medicine",
    org: "International Faculty",
    country: "Nigeria",
    track: "Diabetes Management",
    initials: "AO",
    image: amaraImage,
    bio: "International healthcare professional contributing expertise to diabetes, metabolic health and integrated approaches to chronic disease management.",
  },
  {
    name: "Prof. Elias Vandermeer",
    role: "Cardiology & Cardiometabolic Health",
    org: "International Faculty",
    country: "Switzerland",
    track: "Cardiology",
    initials: "EV",
    image: eliasImage,
    bio: "International faculty member contributing clinical and scientific perspectives in cardiovascular and cardiometabolic health.",
  },
  {
    name: "Dr. Mei-Lin Chen",
    role: "Digital Health & Clinical Innovation",
    org: "International Faculty",
    country: "Singapore",
    track: "Digital Health",
    initials: "MC",
    image: meilinImage,
    bio: "International healthcare professional focusing on digital innovation, technology-enabled care and emerging approaches in healthcare delivery.",
  },
  {
    name: "Dr. Rafael Duarte",
    role: "Health Economics & Integrated Care",
    org: "International Faculty",
    country: "Brazil",
    track: "Cardiometabolic Health",
    initials: "RD",
    image: rafaelImage,
    bio: "International faculty member with an interest in healthcare systems, health economics and improving access to evidence-based care.",
  },
  {
    name: "Dr. Sana Al-Rashid",
    role: "Diabetes & Preventive Medicine",
    org: "International Faculty",
    country: "UAE",
    track: "Preventive Medicine",
    initials: "SA",
    image: sanaImage,
    bio: "International healthcare professional contributing perspectives on diabetes prevention, metabolic health and innovative approaches to patient care.",
  },
  {
    name: "Prof. Ingrid Halvorsen",
    role: "Digital Epidemiology & Public Health",
    org: "International Faculty",
    country: "Sweden",
    track: "Public Health",
    initials: "IH",
    bio: "International faculty member working across digital health, epidemiology and population-level approaches to chronic disease prevention.",
  },
  {
    name: "Dr. Kwame Mensah",
    role: "Integrated Healthcare",
    org: "International Faculty",
    country: "Ghana",
    track: "Health Systems",
    initials: "KM",
    bio: "International healthcare professional contributing to discussions on integrated care and healthcare delivery.",
  },
  {
    name: "Dr. Yuki Tanaka",
    role: "Medical Technology & Innovation",
    org: "International Faculty",
    country: "Japan",
    track: "Emerging Technologies",
    initials: "YT",
    bio: "International researcher contributing perspectives on emerging medical technologies and innovation in healthcare.",
  },
  {
    name: "Dr. Helena Fischer",
    role: "Regulatory Science & Healthcare",
    org: "International Faculty",
    country: "Germany",
    track: "Healthcare Innovation",
    initials: "HF",
    bio: "International healthcare professional contributing expertise in healthcare innovation, regulation and responsible adoption of emerging technologies.",
  },
  {
    name: "Dr. Priya Raghunathan",
    role: "Clinical Research",
    org: "International Faculty",
    country: "India",
    track: "Clinical Research",
    initials: "PR",
    bio: "International clinical researcher contributing perspectives on clinical studies, evidence generation and improving patient outcomes.",
  },
  {
    name: "Dr. Lucas Moreau",
    role: "Regenerative Medicine",
    org: "International Faculty",
    country: "France",
    track: "Stem Cell Therapy",
    initials: "LM",
    bio: "International researcher contributing to discussions around regenerative medicine and emerging therapeutic approaches.",
  },
  {
    name: "Dr. Anna Kovalenko",
    role: "Health Data & Digital Systems",
    org: "International Faculty",
    country: "Estonia",
    track: "Digital Health",
    initials: "AK",
    bio: "International healthcare professional contributing perspectives on health data, digital systems and technology-enabled healthcare.",
  },
];

/* =========================================================
   TRACKS
========================================================= */

export const TRACKS = [
  {
    title: "Artificial Intelligence and Digital Health in Cardiometabolic Care",
    icon: "BrainCircuit",
    sessions: 10,
    body: "Artificial Intelligence (AI) and Digital Health are revolutionizing the prevention, diagnosis, treatment, and management of cardiometabolic diseases. This track will explore the latest innovations in AI-driven healthcare, machine learning applications, predictive analytics, digital therapeutics, and clinical decision support systems that are enhancing patient outcomes and transforming healthcare delivery.\n\nThe session will highlight advancements in AI-assisted diagnostics, wearable health technologies, remote patient monitoring, digital biomarkers, personalized medicine, healthcare automation, and data-driven approaches for managing diabetes, cardiovascular diseases, obesity, and related metabolic disorders.",
    subTracks: [
      "Artificial Intelligence in Diabetes and Cardiology",
      "Machine Learning for Disease Prediction",
      "Digital Therapeutics and Virtual Care",
      "Remote Patient Monitoring and Wearable Devices",
      "Clinical Decision Support Systems",
      "Digital Biomarkers and Precision Medicine",
      "Healthcare Data Analytics and Big Data",
      "Mobile Health (mHealth) Applications",
      "AI-Powered Medical Imaging and Diagnostics",
      "Future Trends in Digital Cardiometabolic Healthcare",
    ],
  },

  {
    title: "Diabetes Management and Emerging Therapies",
    icon: "Activity",
    sessions: 10,
    body: "Diabetes continues to be one of the most significant global health challenges, requiring innovative approaches to prevention, diagnosis, treatment, and long-term disease management. This track focuses on the latest scientific advancements, clinical practices, and emerging therapeutic strategies that are transforming diabetes care and improving patient outcomes.\n\nThe session will provide a platform for healthcare professionals, researchers, clinicians, and industry experts to discuss breakthroughs in diabetes treatment, next-generation insulin therapies, continuous glucose monitoring technologies, precision medicine, digital diabetes management, and patient-centered care models.",
    subTracks: [
      "Continuous Glucose Monitoring (CGM) Systems",
      "Precision Medicine in Diabetes Care",
      "Digital Health Solutions for Diabetes Management",
      "Lifestyle Interventions and Diabetes Prevention",
      "Patient Engagement and Self-Management Strategies",
    ],
  },

  {
    title: "Cardiovascular Disease and Preventive Cardiology",
    icon: "HeartPulse",
    sessions: 10,
    body: "This track focuses on the latest advancements in cardiovascular disease prevention, risk assessment, and evidence-based treatment strategies. It provides a platform to explore innovative approaches for reducing cardiovascular risk, promoting heart health, and improving patient outcomes through early detection, preventive cardiology, lifestyle interventions, and emerging therapeutic solutions. Researchers, clinicians, and healthcare professionals are invited to share their expertise and recent developments in cardiovascular care.",
    subTracks: [
      "Cardiovascular Risk Assessment and Prevention",
      "Preventive Cardiology and Lifestyle Medicine",
      "Advances in Cardiovascular Therapeutics",
      "Cardiac Rehabilitation and Patient Care",
      "Digital Health in Cardiovascular Medicine",
      "Cardiometabolic Risk Management",
      "Future Innovations in Cardiovascular Care",
    ],
  },

  {
    title: "Obesity, Metabolic Health and Lifestyle Medicine",
    icon: "Scale",
    sessions: 10,
    body: "This track focuses on the growing impact of obesity and metabolic disorders on global health and their close association with diabetes, cardiovascular disease, and other chronic conditions. The session will highlight evidence-based approaches in lifestyle medicine, nutrition, physical activity, behavioral interventions, and innovative weight-management strategies aimed at improving metabolic health and long-term patient outcomes.",
  },

  {
    title: "Precision Medicine and Personalized Healthcare",
    icon: "Dna",
    sessions: 10,
    body: "This track explores the evolving role of precision medicine and personalized healthcare in improving the prevention, diagnosis, and treatment of chronic diseases. It highlights advancements in genomics, biomarkers, data-driven healthcare, and individualized treatment approaches that enable clinicians to deliver more targeted, effective, and patient-centered care. The session will showcase innovative research and emerging technologies that are shaping the future of personalized medicine and transforming healthcare outcomes.",
    subTracks: [
      "Precision Medicine in Diabetes and Cardiovascular Care",
      "Genomics and Personalized Therapeutics",
      "Biomarkers and Predictive Diagnostics",
      "Pharmacogenomics and Drug Response",
      "AI-Driven Personalized Healthcare",
      "Data Analytics and Clinical Decision Support",
      "Digital Health and Personalized Patient Care",
      "Emerging Technologies in Precision Medicine",
      "Future Directions in Personalized Healthcare",
    ],
  },

  {
    title: "Women's Cardiometabolic Health",
    icon: "Heart",
    sessions: 10,
    body: "This track focuses on the unique cardiometabolic health challenges faced by women across different stages of life. It highlights the prevention, diagnosis, and management of diabetes, cardiovascular disease, obesity, metabolic disorders, and related risk factors in women. The session will explore gender-specific health considerations, hormonal influences, pregnancy-related metabolic conditions, and innovative approaches to improving cardiovascular and metabolic health outcomes for women worldwide.",
    subTracks: [
      "Cardiovascular Disease in Women",
      "Diabetes and Women's Health",
      "Pregnancy and Gestational Diabetes",
      "Polycystic Ovary Syndrome (PCOS) and Metabolic Health",
      "Menopause and Cardiometabolic Risk",
      "Obesity and Weight Management in Women",
      "Preventive Cardiology for Women",
      "Lifestyle Medicine and Women's Wellness",
      "Gender-Specific Risk Factors and Diagnostics",
      "Innovations in Women's Cardiometabolic Care",
    ],
  },

  {
    title: "Advances in Type 1 and Type 2 Diabetes Management",
    icon: "Activity",
    sessions: 10,
    body: "This track focuses on the latest advancements in the prevention, diagnosis, treatment, and long-term management of Type 1 and Type 2 diabetes. It provides a platform to discuss innovative therapeutic approaches, emerging technologies, personalized treatment strategies, and evidence-based clinical practices aimed at improving glycemic control, reducing complications, and enhancing patient outcomes. The session will highlight recent developments that are transforming diabetes care and supporting better quality of life for individuals living with diabetes.",
    subTracks: [
      "Advances in Type 1 and Type 2 Diabetes Care",
      "Innovative Antidiabetic Therapies",
      "Insulin Therapy and Emerging Technologies",
      "Continuous Glucose Monitoring (CGM)",
      "Diabetes Prevention and Early Intervention",
      "Personalized Diabetes Management",
      "Digital Health Solutions for Diabetes Care",
      "Diabetes Complications and Risk Reduction",
      "Patient Education and Self-Management",
      "Future Trends in Diabetes Treatment",
    ],
  },

  {
    title: "Novel Antidiabetic Therapies and Drug Development",
    icon: "FlaskConical",
    sessions: 10,
    body: "This session highlights the latest breakthroughs in antidiabetic drug discovery, innovative treatment approaches, and emerging therapeutic strategies for diabetes management. It focuses on advancements in pharmacological research, next-generation medications, combination therapies, and precision treatment approaches designed to improve glycemic control and reduce diabetes-related complications.",
    subTracks: [
      "Emerging Antidiabetic Medications",
      "GLP-1 Receptor Agonists and Novel Therapeutics",
      "Precision Medicine in Diabetes Treatment",
      "Combination Drug Therapies",
      "Drug Discovery and Clinical Development",
      "Innovative Insulin Therapies",
      "Cardiometabolic Benefits of Antidiabetic Agents",
      "Translational Research in Diabetes Care",
      "Future Directions in Diabetes Drug Development",
      "Clinical Trials and Therapeutic Innovations",
    ],
  },

  {
    title: "Insulin Innovations and Smart Insulin Technologies",
    icon: "Syringe",
    sessions: 10,
    body: "This session focuses on the latest advancements in insulin therapies and emerging technologies that are transforming diabetes management. It will explore next-generation insulin formulations, smart insulin delivery systems, insulin pumps, continuous glucose monitoring integration, and automated insulin management solutions designed to enhance treatment precision and patient outcomes. Participants will gain insights into innovative research, technological developments, and future trends that are improving the safety, effectiveness, and convenience of insulin therapy for individuals living with diabetes.",
    subTracks: [
      "Next-Generation Insulin Therapies",
      "Smart Insulin and Glucose-Responsive Insulin",
      "Advanced Insulin Delivery Systems",
      "Insulin Pumps and Closed-Loop Technologies",
      "Continuous Glucose Monitoring (CGM) Integration",
      "Artificial Pancreas Systems",
      "Digital Innovations in Insulin Management",
      "Personalized Insulin Therapy",
      "Emerging Research in Diabetes Technology",
      "Future Perspectives in Insulin Care",
    ],
  },

  {
    title: "Early Detection and Risk Reduction Strategies",
    icon: "SearchCheck",
    sessions: 10,
    body: "Early identification of risk factors plays a crucial role in preventing diabetes, cardiovascular diseases, and other cardiometabolic disorders. This session focuses on innovative screening approaches, predictive risk assessment tools, preventive healthcare strategies, and evidence-based interventions that support early diagnosis and disease prevention. It provides a platform to discuss emerging research, clinical best practices, and population health initiatives aimed at reducing disease burden, improving patient outcomes, and promoting long-term cardiovascular and metabolic health.",
    subTracks: [
      "Early Screening and Risk Assessment",
      "Cardiovascular Risk Prediction Models",
      "Diabetes Prevention Strategies",
      "Preventive Healthcare and Population Health",
      "Lifestyle Interventions and Risk Reduction",
      "Biomarkers for Early Disease Detection",
      "Community-Based Prevention Programs",
    ],
  },

  {
    title: "Hypertension and Heart Disease Management",
    icon: "HeartPulse",
    sessions: 10,
    body: "Hypertension remains one of the most significant risk factors for cardiovascular disease and a major contributor to global morbidity and mortality. This session focuses on the latest advances in the prevention, diagnosis, and management of hypertension and heart disease, highlighting evidence-based clinical practices, innovative treatment approaches, and patient-centered care strategies. Discussions will explore risk factor control, cardiovascular prevention, emerging therapies, and integrated approaches aimed at improving heart health and reducing the burden of cardiovascular complications.",
    subTracks: [
      "Hypertension Prevention and Management",
      "Coronary Artery Disease",
      "Heart Failure Management",
      "Evidence-Based Cardiovascular Therapies",
      "Blood Pressure Monitoring and Control",
    ],
  },

  {
    title: "Stem Cell Therapy",
    icon: "Microscope",
    sessions: 10,
    body: "Stem cell therapy represents a promising frontier in regenerative medicine, offering innovative approaches for the treatment and management of diabetes and related metabolic disorders. By harnessing the regenerative potential of stem cells, researchers are exploring strategies to restore pancreatic function, regenerate insulin-producing beta cells, and repair damaged tissues affected by chronic disease.\n\nThis session will highlight the latest advancements in stem cell research, translational medicine, tissue engineering, and emerging clinical applications.",
    subTracks: [
      "Stem Cell Biology and Regenerative Medicine",
      "Beta Cell Regeneration and Replacement Therapy",
      "Cell-Based Therapeutic Approaches",
      "Pancreatic Tissue Regeneration",
      "Tissue Engineering and Biomaterials",
      "Clinical Applications of Stem Cell Therapy",
    ],
  },

  {
    title: "Diabetes & Metabolic Disorders",
    icon: "Activity",
    sessions: 10,
    body: "Diabetes and metabolic disorders continue to pose significant global health challenges, impacting millions of individuals worldwide. This session will focus on the latest research, clinical advancements, and innovative strategies for the prevention, diagnosis, and management of diabetes and associated metabolic conditions. Discussions will explore the underlying mechanisms of metabolic dysfunction, emerging therapeutic approaches, and evidence-based interventions aimed at improving patient outcomes and overall metabolic health.",
    subTracks: [
      "Metabolic Pathways and Energy Regulation",
      "Insulin Resistance and Glucose Metabolism",
      "Metabolic Syndrome",
      "Lipid Metabolism and Dyslipidemia",
      "Hormonal Regulation and Endocrine Disorders",
      "Emerging Therapies for Metabolic Disorders",
    ],
  },

  {
    title: "Cardiac Surgery",
    icon: "HeartPulse",
    sessions: 10,
    body: "The Cardiac Surgery session delivers a focused, high-impact program on contemporary surgical innovations, refined procedural techniques, and evidence-based perioperative management for complex cardiovascular disease. Attendees will gain expertise in preoperative planning, intraoperative strategies, and postoperative care, while presenters can share clinical outcomes and surgical research.",
    subTracks: [
      "Coronary Artery Bypass Surgery",
      "Valve Repair and Replacement",
      "Minimally Invasive Cardiac Surgery",
      "Perioperative Management",
      "Surgical Outcomes and Innovations",
    ],
  },

  {
    title: "Case Reports & Clinical Case Studies – Diabetes and Cardiology",
    icon: "FileText",
    sessions: 10,
    body: "This track invites unique, challenging, and clinically significant case reports and case studies in Diabetes and Cardiology. It provides a platform to share real-world clinical experiences, diagnostic challenges, treatment approaches, innovative therapies, complications, and patient outcomes. Submissions may highlight diabetes-related complications, complex cardiovascular conditions, diabetes–cardiac comorbidities, novel interventions, and multidisciplinary approaches, with emphasis on practical clinical insights and lessons for improved patient care.",
  },
];

/* =========================================================
   SCHEDULE
========================================================= */

export const SCHEDULE = [
  {
    day: "Day 01",
    date: "09 Dec 2026",
    theme: "Diabetes & Cardiometabolic Health",
    items: [
      {
        time: "09:00",
        title: "Opening & Welcome",
        speaker: "Conference Faculty",
        type: "Opening",
      },
      {
        time: "09:30",
        title: "Opening Keynote: Advancing Integrated Cardiometabolic Care",
        speaker: "Expert Faculty",
        type: "Keynote",
      },
      {
        time: "11:00",
        title: "Diabetes Management and Emerging Therapies",
        speaker: "Invited Faculty",
        type: "Session",
      },
      {
        time: "12:30",
        title: "Continuous Glucose Monitoring & Digital Diabetes Care",
        speaker: "Invited Faculty",
        type: "Session",
      },
      {
        time: "14:00",
        title: "Obesity, Metabolic Health & Lifestyle Medicine",
        speaker: "Invited Faculty",
        type: "Session",
      },
      {
        time: "15:30",
        title: "Early Detection & Risk Reduction Strategies",
        speaker: "Conference Faculty",
        type: "Panel",
      },
      {
        time: "17:00",
        title: "Research & Clinical Case Presentations",
        speaker: "Selected Presenters",
        type: "Abstract",
      },
    ],
  },

  {
    day: "Day 02",
    date: "10 Dec 2026",
    theme: "Cardiology, Innovation & Future Healthcare",
    items: [
      {
        time: "09:00",
        title: "Day Two Welcome",
        speaker: "Conference Faculty",
        type: "Opening",
      },
      {
        time: "09:30",
        title: "Cardiovascular Disease & Preventive Cardiology",
        speaker: "Invited Faculty",
        type: "Keynote",
      },
      {
        time: "11:00",
        title: "Hypertension & Heart Disease Management",
        speaker: "Invited Faculty",
        type: "Session",
      },
      {
        time: "12:30",
        title: "Women's Cardiometabolic Health",
        speaker: "Invited Faculty",
        type: "Session",
      },
      {
        time: "14:00",
        title: "AI & Digital Health in Cardiometabolic Care",
        speaker: "Expert Faculty",
        type: "Panel",
      },
      {
        time: "15:30",
        title: "Precision Medicine, Emerging Therapies & Innovation",
        speaker: "Conference Faculty",
        type: "Session",
      },
      {
        time: "17:00",
        title: "Closing Session & Conference Highlights",
        speaker: "Conference Faculty",
        type: "Closing",
      },
    ],
  },
];

/* =========================================================
   SPONSORS
========================================================= */

export const SPONSOR_TIERS = [
  {
    tier: "Platinum",
    names: [],
  },
  {
    tier: "Gold",
    names: [],
  },
  {
    tier: "Silver",
    names: [],
  },
  {
    tier: "Community",
    names: [],
  },
];

/* =========================================================
   TESTIMONIALS
========================================================= */

export const TESTIMONIALS = [];

/* =========================================================
   FAQS
========================================================= */

export const FAQS = [
  {
    q: "When is the Global Summit 2026?",
    a: "The Global Summit on Diabetes, Cardiology & Cardiometabolic Health will take place on 09-10 December 2026.",
  },
  {
    q: "Is the conference online?",
    a: "Yes. The 2026 Global Summit will be conducted as an international webinar, allowing participants to join online from anywhere.",
  },
  {
    q: "Who can attend the conference?",
    a: "The conference is designed for clinicians, researchers, healthcare professionals, academics, students and other professionals interested in diabetes, cardiology and cardiometabolic health.",
  },
  {
    q: "What scientific areas will be covered?",
    a: "The programme covers 15 scientific tracks spanning diabetes, cardiovascular health, cardiometabolic medicine, obesity, emerging therapies, digital health, artificial intelligence, precision medicine and related areas.",
  },
  {
    q: "Can I submit an abstract?",
    a: "Yes. Researchers, clinicians and healthcare professionals can submit original scientific work under the relevant conference track.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Certificate availability and eligibility will be communicated to registered participants according to the official conference participation guidelines.",
  },
  {
    q: "How will I join the webinar?",
    a: "Registered participants will receive online access details and joining instructions before the conference.",
  },
  {
    q: "Can international participants attend?",
    a: "Yes. As an online international webinar, participants can join from different countries without travelling to a physical venue.",
  },
];

/* =========================================================
   TICKETS
========================================================= */

export const TICKETS = [
  {
    category: "Academic",
    options: [
      {
        name: "Speaker",
        prices: {
          earlyBird: {
            EUR: 149,
            USD: 159,
            GBP: 129,
          },
          standard: {
            EUR: 169,
            USD: 179,
            GBP: 145,
          },
          final: {
            EUR: 189,
            USD: 199,
            GBP: 159,
          },
        },
      },
      {
        name: "Delegate",
        prices: {
          earlyBird: {
            EUR: 79,
            USD: 85,
            GBP: 69,
          },
          standard: {
            EUR: 89,
            USD: 95,
            GBP: 79,
          },
          final: {
            EUR: 99,
            USD: 109,
            GBP: 89,
          },
        },
      },
      {
        name: "Workshop Presenter",
        prices: {
          earlyBird: {
            EUR: 179,
            USD: 195,
            GBP: 149,
          },
          standard: {
            EUR: 199,
            USD: 215,
            GBP: 169,
          },
          final: {
            EUR: 219,
            USD: 235,
            GBP: 185,
          },
        },
      },
    ],
  },

  {
    category: "Industry",
    options: [
      {
        name: "Exhibitor",
        prices: {
          earlyBird: {
            EUR: 299,
            USD: 325,
            GBP: 259,
          },
          standard: {
            EUR: 349,
            USD: 375,
            GBP: 299,
          },
          final: {
            EUR: 399,
            USD: 425,
            GBP: 339,
          },
        },
      },
      {
        name: "Speaker",
        prices: {
          earlyBird: {
            EUR: 199,
            USD: 215,
            GBP: 169,
          },
          standard: {
            EUR: 229,
            USD: 245,
            GBP: 195,
          },
          final: {
            EUR: 259,
            USD: 279,
            GBP: 219,
          },
        },
      },
      {
        name: "Delegate",
        prices: {
          earlyBird: {
            EUR: 129,
            USD: 139,
            GBP: 109,
          },
          standard: {
            EUR: 149,
            USD: 159,
            GBP: 125,
          },
          final: {
            EUR: 169,
            USD: 179,
            GBP: 139,
          },
        },
      },
    ],
  },

  {
    category: "Student",
    options: [
      {
        name: "Speaker",
        prices: {
          earlyBird: {
            EUR: 69,
            USD: 75,
            GBP: 59,
          },
          standard: {
            EUR: 79,
            USD: 85,
            GBP: 69,
          },
          final: {
            EUR: 89,
            USD: 95,
            GBP: 75,
          },
        },
      },
      {
        name: "Delegate",
        prices: {
          earlyBird: {
            EUR: 39,
            USD: 45,
            GBP: 35,
          },
          standard: {
            EUR: 49,
            USD: 55,
            GBP: 45,
          },
          final: {
            EUR: 59,
            USD: 65,
            GBP: 49,
          },
        },
      },
    ],
  },

  {
    category: "Add-on",
    options: [
      {
        name: "e-Poster",
        prices: {
          earlyBird: {
            EUR: 49,
            USD: 55,
            GBP: 45,
          },
          standard: {
            EUR: 59,
            USD: 65,
            GBP: 49,
          },
          final: {
            EUR: 69,
            USD: 75,
            GBP: 59,
          },
        },
      },
      {
        name: "Video Presentation",
        prices: {
          earlyBird: {
            EUR: 59,
            USD: 65,
            GBP: 49,
          },
          standard: {
            EUR: 69,
            USD: 75,
            GBP: 59,
          },
          final: {
            EUR: 79,
            USD: 85,
            GBP: 69,
          },
        },
      },
    ],
  },
];

export const REGISTRATION_DEADLINES = {
  earlyBird: "October 30, 2026",
  standard: "November 05, 2026",
  final: "November 30, 2026",
};
/* =========================================================
   GALLERY
========================================================= */

export const GALLERY = [];

/* =========================================================
   VIRTUAL EVENT FEATURES
========================================================= */

export const VENUE_FEATURES = [
  {
    title: "Global Online Access",
    body:
      "Join the international scientific programme online from anywhere in the world.",
  },
  {
    title: "Expert-Led Sessions",
    body:
      "Explore expert presentations and scientific discussions covering diabetes, cardiology and cardiometabolic health.",
  },
  {
    title: "Interactive Discussions",
    body:
      "Engage with speakers and fellow participants through scientific discussions and Q&A sessions.",
  },
  {
    title: "Two-Day Programme",
    body:
      "Experience a focused two-day scientific programme taking place on 09-10 December 2026.",
  },
];

/* =========================================================
   ABSTRACT CATEGORIES
========================================================= */

export const ABSTRACT_CATEGORIES = [
  {
    title: "Diabetes Management & Emerging Therapies",
    icon: "Activity",
    body:
      "Research covering diabetes prevention, treatment, emerging therapies, insulin innovation and long-term disease management.",
  },
  {
    title: "Cardiology & Cardiovascular Health",
    icon: "HeartPulse",
    body:
      "Clinical and research work related to cardiovascular disease, preventive cardiology, hypertension and heart disease management.",
  },
  {
    title: "Cardiometabolic Health",
    icon: "Scale",
    body:
      "Research addressing the relationship between diabetes, obesity, metabolic disorders and cardiovascular health.",
  },
  {
    title: "AI & Digital Health",
    icon: "BrainCircuit",
    body:
      "Artificial intelligence, digital therapeutics, remote monitoring, wearable technologies and data-driven healthcare.",
  },
  {
    title: "Precision & Personalized Medicine",
    icon: "Dna",
    body:
      "Genomics, biomarkers, personalized treatment strategies and emerging precision healthcare approaches.",
  },
  {
    title: "Clinical Innovation & Integrated Care",
    icon: "Heart",
    body:
      "Innovative clinical practices, multidisciplinary approaches, patient-centered care and integrated healthcare models.",
  },
];

/* =========================================================
   ABSTRACT DATES
========================================================= */

export const ABSTRACT_DATES = [
  {
    date: "To Be Announced",
    label: "Call for abstracts opens",
    note: "Official submission portal and guidelines will be published.",
  },
  {
    date: "To Be Announced",
    label: "Abstract submission deadline",
    note: "Final deadline will be announced by the conference organizers.",
  },
  {
    date: "To Be Announced",
    label: "Scientific review",
    note: "Submitted abstracts will undergo scientific evaluation.",
  },
  {
    date: "To Be Announced",
    label: "Acceptance notification",
    note: "Authors will be informed about the outcome of the review.",
  },
  {
    date: "09-10 Dec 2026",
    label: "Online presentation",
    note: "Selected abstracts will be presented during the virtual scientific programme.",
  },
];

/* =========================================================
   ABSTRACT PROCESS
========================================================= */

export const ABSTRACT_PROCESS = [
  {
    step: "01",
    title: "Submit",
    body:
      "Prepare and submit your scientific abstract under the most relevant conference track.",
  },
  {
    step: "02",
    title: "Screen",
    body:
      "The submission will be checked for relevance, completeness and compliance with the conference guidelines.",
  },
  {
    step: "03",
    title: "Review",
    body:
      "Submitted abstracts will be evaluated through the conference scientific review process.",
  },
  {
    step: "04",
    title: "Decide",
    body:
      "Authors will receive an official notification regarding acceptance and presentation format.",
  },
  {
    step: "05",
    title: "Present",
    body:
      "Accepted research can be presented during the online scientific programme.",
  },
];

/* =========================================================
   ABSTRACT BENEFITS
========================================================= */

export const ABSTRACT_BENEFITS = [
  {
    title: "Global Scientific Exposure",
    body:
      "Share your research with an international audience interested in diabetes, cardiology and cardiometabolic health.",
  },
  {
    title: "Scientific Discussion",
    body:
      "Present your findings and participate in meaningful academic and clinical discussions.",
  },
  {
    title: "Professional Recognition",
    body:
      "Showcase your research and contribute to the scientific programme of the Global Summit 2026.",
  },
  {
    title: "Knowledge Exchange",
    body:
      "Exchange ideas and learn from researchers, clinicians and healthcare professionals across multiple disciplines.",
  },
];

/* =========================================================
   ABSTRACT AWARDS
========================================================= */

export const ABSTRACT_AWARDS = [];

/* =========================================================
   ABSTRACT GUIDELINES
========================================================= */

export const ABSTRACT_GUIDELINES = [
  "Abstracts should present original scientific, clinical or research work.",
  "Select the scientific track that best matches your submission.",
  "Use clear, concise and scientifically appropriate language.",
  "Include the title, authors, affiliations and abstract content as requested in the submission form.",
  "Ensure that submitted research follows applicable ethical and research standards.",
  "Accepted presenters will receive presentation instructions before the online conference.",
];