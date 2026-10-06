// ─────────────────────────────────────────────────────────────
// Centralized company data – update once, propagate everywhere
// Fields marked "PLACEHOLDER" should be replaced with real data
// ─────────────────────────────────────────────────────────────

export const COMPANY = {
  name: "Hxrao Overseas",
  shortName: "Hxrao",
  tagline: "Import Export & Global Sourcing",
  description:
    "Hxrao Overseas connects businesses with dependable sourcing and international trade solutions across healthcare & chemicals, recyclable materials, metals and building materials.",

  // Contact – replace placeholders with real values
  phone: "", // PLACEHOLDER – add real phone
  whatsapp: "", // PLACEHOLDER – add real WhatsApp number
  email: "", // PLACEHOLDER – add real business email
  address: "", // PLACEHOLDER – add registered/business address

  // Social – only show when real profiles are supplied
  socials: {
    linkedin: "", // PLACEHOLDER
    instagram: "", // PLACEHOLDER
    twitter: "", // PLACEHOLDER
  },

  // Legal/business
  registrationInfo: "", // PLACEHOLDER
  certifications: [] as string[], // PLACEHOLDER – add only verified
  countriesServed: [] as string[], // PLACEHOLDER – add only verified
  yearsInBusiness: "", // PLACEHOLDER
  logo: "", // PLACEHOLDER – path to official logo asset

  // Production URL
  url: "https://hxraooverseas.com", // PLACEHOLDER – update to real URL
} as const;

export type Category = {
  number: string;
  eyebrow: string;
  title: string;
  slug: string;
  href: string;
  description: string;
  heroDescription: string;
  seoKeyword: string;
  badge: string;
  h1: string;
  subcategories: string[];
  imageAlt: string;
};

export const CATEGORIES: Category[] = [
  {
    number: "01",
    eyebrow: "HEALTHCARE & CHEMICALS",
    title: "Healthcare & Chemicals",
    slug: "healthcare-chemicals",
    href: "/healthcare-chemicals",
    description:
      "B2B sourcing and trade solutions for healthcare and chemical requirements.",
    heroDescription:
      "B2B sourcing and international trade support for healthcare and chemical requirements.",
    seoKeyword: "healthcare and chemicals import export",
    badge: "HEALTHCARE & CHEMICALS",
    h1: "Healthcare & Chemical Trade Solutions",
    subcategories: [
      "Healthcare Supplies",
      "Industrial Chemicals",
      "Chemical Raw Materials",
      "Special Requirement Enquiries",
    ],
    imageAlt:
      "Professional laboratory and industrial chemical supply environment",
  },
  {
    number: "02",
    eyebrow: "RECYCLABLE MATERIALS",
    title: "Aluminium & Plastic Scrap",
    slug: "aluminium-plastic-scrap",
    href: "/aluminium-plastic-scrap",
    description:
      "Commercial sourcing and trade of recyclable aluminium and plastic material categories.",
    heroDescription:
      "Commercial sourcing and trade coordination for aluminium and plastic recyclable material requirements.",
    seoKeyword: "aluminium scrap and plastic scrap import export",
    badge: "RECYCLABLE MATERIALS",
    h1: "Aluminium & Plastic Scrap Trading",
    subcategories: [
      "Aluminium Scrap",
      "Plastic Scrap",
      "Recyclable Material Requirements",
      "Bulk Trade Enquiries",
    ],
    imageAlt:
      "Organized aluminium and plastic recycling materials in industrial setting",
  },
  {
    number: "03",
    eyebrow: "INDUSTRIAL METALS",
    title: "Copper & Steel",
    slug: "copper-steel",
    href: "/copper-steel",
    description:
      "Industrial metal sourcing and trade solutions for commercial requirements.",
    heroDescription:
      "Commercial sourcing and international trade support for copper and steel requirements.",
    seoKeyword: "copper and steel import export",
    badge: "INDUSTRIAL METALS",
    h1: "Copper & Steel Trade Solutions",
    subcategories: [
      "Copper Materials",
      "Steel Materials",
      "Industrial Metal Requirements",
      "Bulk Trade Enquiries",
    ],
    imageAlt:
      "Premium copper coils and organized steel inventory in warehouse",
  },
  {
    number: "04",
    eyebrow: "CONSTRUCTION SUPPLY",
    title: "Building Materials",
    slug: "building-materials",
    href: "/building-materials",
    description:
      "Sourcing and international trade support for commercial building material requirements.",
    heroDescription:
      "B2B sourcing and international trade coordination for commercial building material requirements.",
    seoKeyword: "building materials import export",
    badge: "BUILDING MATERIALS",
    h1: "Building Material Sourcing & Trade",
    subcategories: [
      "Construction Materials",
      "Architectural Materials",
      "Commercial Supply Requirements",
      "Project-Based Enquiries",
    ],
    imageAlt:
      "Modern building material inventory and architectural supplies",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Categories", href: "#", isDropdown: true },
  { label: "Contact", href: "/contact" },
] as const;

export const TRADE_PROCESS_STEPS = [
  {
    number: "01",
    title: "Share Requirement",
    description:
      "Begin with the product category, specification, quantity and destination.",
  },
  {
    number: "02",
    title: "Product & Source Review",
    description:
      "Identify suitable sourcing routes and evaluate the commercial requirement.",
  },
  {
    number: "03",
    title: "Commercial Discussion",
    description:
      "Align on pricing, terms and conditions for the agreed trade transaction.",
  },
  {
    number: "04",
    title: "Documentation",
    description:
      "Coordinate relevant trade documentation based on the transaction and requirements.",
  },
  {
    number: "05",
    title: "Logistics Coordination",
    description:
      "Support agreed logistics and shipment coordination through the trade process.",
  },
] as const;

export const SEO_METADATA = {
  home: {
    title: "Hxrao Overseas | Import Export & Global Sourcing",
    description:
      "Hxrao Overseas provides B2B import-export and global sourcing solutions across healthcare & chemicals, aluminium & plastic scrap, copper & steel, and building materials.",
  },
  about: {
    title: "About Hxrao Overseas | International Trade & Sourcing",
    description:
      "Learn about Hxrao Overseas — a modern B2B sourcing and international trade company connecting businesses across healthcare, metals, recyclable materials and construction supply categories.",
  },
  contact: {
    title: "Contact Hxrao Overseas | Trade Enquiries",
    description:
      "Start a trade enquiry with Hxrao Overseas. Share your product requirement, quantity and destination to begin a business conversation.",
  },
  healthcareChemicals: {
    title: "Healthcare & Chemicals Import Export | Hxrao Overseas",
    description:
      "B2B sourcing and international trade solutions for healthcare and chemical requirements. Contact Hxrao Overseas with your trade enquiry.",
  },
  aluminiumPlasticScrap: {
    title: "Aluminium & Plastic Scrap Trading | Hxrao Overseas",
    description:
      "Commercial sourcing and trade coordination for aluminium and plastic recyclable material requirements. Start your enquiry with Hxrao Overseas.",
  },
  copperSteel: {
    title: "Copper & Steel Import Export | Hxrao Overseas",
    description:
      "Industrial metal sourcing and international trade support for copper and steel requirements. Contact Hxrao Overseas for a trade enquiry.",
  },
  buildingMaterials: {
    title: "Building Materials Import Export | Hxrao Overseas",
    description:
      "B2B sourcing and international trade coordination for commercial building material requirements. Start your enquiry with Hxrao Overseas.",
  },
  privacyPolicy: {
    title: "Privacy Policy | Hxrao Overseas",
    description:
      "Read the privacy policy of Hxrao Overseas — how we handle your data and business enquiry information.",
  },
  terms: {
    title: "Terms & Conditions | Hxrao Overseas",
    description:
      "Review the terms and conditions for using the Hxrao Overseas website and trade enquiry services.",
  },
} as const;
