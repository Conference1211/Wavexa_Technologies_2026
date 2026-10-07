import {
  CalendarDays,
  Code2,
  Smartphone,
  Megaphone,
  ShieldCheck,
  Globe2,
  Rocket,
  Headphones,
  UsersRound,
  Crosshair,
  HeartPulse,
  Database,
  Palette,
  Braces,
  ServerCog,
  type LucideIcon,
} from "lucide-react";
import homeHero from "@/assets/business-home-hero.jpg";
import webDesignHero from "@/assets/web-design-hero.jpg";
import mobileHero from "@/assets/mobile-app-hero.jpg";
import digitalHero from "@/assets/digital-marketing-hero.jpg";

export const BUSINESS = {
  name: "Wavexa Technologies",
  email: "info@wavexaglobal.com",
  phone: "+91-9440657981",
  phoneRaw: "9440657981",
  address: "5th Floor, Kalinga Nagar, MDV, VTZ- 530018",
  website: "wavexaglobal.com",
};

export const BUSINESS_SERVICES = [
  ["Conferences", "/business/services/conference"],
  ["Web Designing", "/business/services/web-designing"],
  ["Mobile App Development", "/business/services/mobile-app-development"],
  ["Digital Marketing", "/business/services/digital-marketing"],
] as const;

export const BUSINESS_NAV = [
  ["Home", "/"],
  ["About", "/business/about"],
  ["Technologies", "/business/technologies"],
  ["Contact Us", "/business/contact"],
] as const;

export const industries = [
  ["IT Services", "We deliver responsive, high-performing IT solutions — including database management, cloud computing, and software support — helping businesses and enterprises grow worldwide."],
  ["Banking & Financial Services", "With 8+ years of industry expertise, Wavexa has supported accountants and financial firms with data storage, evaluation, extraction, and more."],
  ["Healthcare", "Using leading tools and technologies, Wavexa delivers healthcare solutions that help organizations extend care to remote areas — especially during emergencies and critical situations."],
  ["Travel", "Wavexa builds web and mobile solutions for airlines, hotels, and travel agencies, equipped with modern, user-focused features."],
  ["Telecommunication", "Telecom demands fast, up-to-date communication systems. Wavexa helps telecom companies stay ahead with the latest tools and technologies."],
  ["Retail", "In today's competitive market, retail success depends on efficiency and mobility — powered by Wavexa's next-generation retail and mobility solutions."],
  ["E-commerce", "Wavexa builds online marketplaces with seamless shopping experiences — featuring polished UI/UX design, thoughtful color schemes, and engaging visuals."],
];

export const services = [
  {title:"Conferences", path:"/business/services/conference", icon:CalendarDays, image:homeHero, text:"We organize and manage global conferences, bringing together industry leaders, experts and innovators."},
  {title:"Web Designing", path:"/business/services/web-designing", icon:Code2, image:webDesignHero, text:"We create responsive, modern and user-friendly websites that help your brand stand out and grow."},
  {title:"Mobile App Development", path:"/business/services/mobile-app-development", icon:Smartphone, image:mobileHero, text:"We build high-performance mobile applications tailored to your business needs."},
  {title:"Digital Marketing", path:"/business/services/digital-marketing", icon:Megaphone, image:digitalHero, text:"We help you reach your audience, boost engagement and grow your business online."},
];

export const reasons: [string, string, LucideIcon][] = [
  ["Guaranteed Service Quality", "Client satisfaction always comes first at Wavexa.", ShieldCheck],
  ["Trusted by Clients Worldwide", "We're proud to be recognized and trusted clients across the globe.", Globe2],
  ["A Future-Ready Technology Partner", "Partner with Wavexa for lasting support across today's most in-demand IT services.", Rocket],
  ["Reliable Technical Support", "Our support system is built for flexibility, adapting to your business's needs.", Headphones],
];

export const expertise: [string, string, LucideIcon][] = [
  ["Mobile App Development", "We bring deep expertise across native and cross-platform technologies, building high-performing mobile apps for businesses worldwide.", UsersRound],
  ["Web Application Development", "Our creative web design and development solutions help you run your business more effectively and deliver real value to your users.", Crosshair],
  ["Healthcare IT Solutions", "We combine healthcare industry knowledge with advanced technology to build secure, reliable IT solutions that improve patient care and streamline medical operations.", ShieldCheck],
];

export const techs: [string, string, LucideIcon][] = [
  ["PHP", "Flexible server-side development for dependable business applications.", Braces],
  ["Python", "Powerful development foundations for automation, data and modern services.", Braces],
  ["Angular", "Structured front-end experiences for scalable, interactive web products.", Globe2],
  ["Java", "Robust application engineering for dependable enterprise environments.", ServerCog],
  ["Mobile App Development", "Native and cross-platform application experiences for businesses worldwide.", Smartphone],
  ["Web Application Development", "Creative web design and development solutions that deliver real value to users.", Globe2],
  ["Healthcare IT Solutions", "Secure, reliable technology designed to improve patient care and streamline operations.", HeartPulse],
  ["Database Administration", "Reliable data foundations supporting availability, performance and continuity.", Database],
  ["Creative Design", "Thoughtful visual systems that help products and brands communicate clearly.", Palette],
];
