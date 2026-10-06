"use client";

import { CATEGORIES } from "../data/company";
import { CategoryPageTemplate } from "../components/CategoryPageTemplate";

const category = CATEGORIES.find((c) => c.slug === "building-materials")!;

export default function BuildingClient() {
  return (
    <CategoryPageTemplate
      category={category}
      overviewHeading="International sourcing for commercial building material requirements"
      overviewContent={[
        "The building materials sector covers a broad range of products used in commercial and residential construction, infrastructure projects, and architectural applications. Hxrao Overseas supports B2B sourcing and trade for building material requirements — connecting businesses with suitable supply routes for their construction and project needs.",
        "We work with procurement teams, contractors, and project-based buyers who have specific material requirements. Our focus is on understanding the product specification, quantity, project timeline, and destination logistics to coordinate an effective sourcing response.",
        "From structural materials and finishing products to specialised construction supplies, each building material enquiry is assessed based on the specific requirement. We coordinate sourcing, commercial terms, documentation, and logistics to support the buyer through the trade process.",
      ]}
      buyerFields={[
        "Material or product type",
        "Specification or standard",
        "Required quantity",
        "Project location / destination",
        "Delivery timeline",
        "Additional project requirements",
      ]}
      faqs={[
        {
          question: "What types of building materials does Hxrao Overseas trade?",
          answer: "We handle trade enquiries across construction materials, architectural materials, and commercial building supplies. Specific products depend on sourcing availability and your project requirements. Share your material specification for a relevant assessment.",
        },
        {
          question: "Can Hxrao Overseas support project-based building material procurement?",
          answer: "Yes. We work with businesses and procurement teams on project-based requirements. Share your material list, quantities, project location, and timeline for a comprehensive assessment of sourcing options.",
        },
        {
          question: "Does Hxrao Overseas manufacture building materials?",
          answer: "No. Hxrao Overseas is a sourcing and trading company. We coordinate commercial transactions between buyers and suppliers of building materials — we do not operate manufacturing facilities.",
        },
        {
          question: "How does Hxrao Overseas handle building material quality?",
          answer: "Quality assurance for building materials typically involves agreed standards, product certifications, and where applicable, third-party inspection. We coordinate these arrangements as part of the trade process based on the buyer's requirements.",
        },
        {
          question: "What documentation is involved in building material trade?",
          answer: "Documentation varies by product type and destination. It may include commercial invoices, packing lists, certificates of origin, product test reports, and applicable import documentation. We coordinate relevant documentation throughout the trade process.",
        },
        {
          question: "Can Hxrao Overseas source specialised architectural materials?",
          answer: "We welcome enquiries for specialised architectural and construction materials. Share the product details, specification, and quantity, and we will assess whether suitable sourcing options are available for your requirement.",
        },
      ]}
    />
  );
}
