"use client";

import { CATEGORIES } from "../data/company";
import { CategoryPageTemplate } from "../components/CategoryPageTemplate";

const category = CATEGORIES.find((c) => c.slug === "aluminium-plastic-scrap")!;

export default function ScrapClient() {
  return (
    <CategoryPageTemplate
      category={category}
      overviewHeading="Commercial trading for aluminium and plastic recyclable materials"
      overviewContent={[
        "The recyclable materials market operates on volume, specification accuracy, and reliable logistics coordination. Hxrao Overseas supports businesses involved in the commercial trading of aluminium scrap and plastic scrap — connecting sourcing requirements with available supply across international routes.",
        "We work with buyers and procurement teams who have established material specifications and understand the commercial dynamics of recyclable material trading. Our role is to coordinate the sourcing, documentation, and logistics process for agreed transactions.",
        "Each scrap material enquiry is handled individually based on the specific material type, grade requirements, quantity, and destination logistics. We do not publish generic specifications — instead, we work with actual buyer requirements to identify suitable sourcing options.",
      ]}
      buyerFields={[
        "Material type (aluminium / plastic)",
        "Grade or specification",
        "Required quantity",
        "Destination country / port",
        "Preferred packaging or loading",
        "Additional commercial requirements",
      ]}
      faqs={[
        {
          question: "What types of aluminium and plastic scrap does Hxrao Overseas trade?",
          answer: "We handle trade enquiries across various aluminium and plastic scrap categories. The specific types and grades depend on market availability and your requirement. Share your material specification for a relevant response.",
        },
        {
          question: "Does Hxrao Overseas process or sort scrap materials?",
          answer: "No. Hxrao Overseas is a trading and sourcing company. We coordinate commercial transactions between buyers and suppliers of recyclable materials — we do not operate processing, sorting, or recycling facilities.",
        },
        {
          question: "How are scrap material specifications confirmed?",
          answer: "Material specifications are confirmed between the buyer and supplier as part of the commercial discussion. Hxrao Overseas coordinates this process and facilitates relevant documentation, but the technical specification agreement is between the trading parties.",
        },
        {
          question: "Can Hxrao Overseas handle bulk scrap material enquiries?",
          answer: "Yes, we welcome bulk commercial enquiries. Share the material type, approximate quantity, specification requirements, and destination, and we will assess suitable sourcing routes.",
        },
        {
          question: "What documentation is typically involved in scrap material trading?",
          answer: "Documentation varies by material type, origin, and destination. It may include commercial invoices, packing lists, certificates of origin, and any applicable import/export permits. We coordinate relevant documentation as part of the trade process.",
        },
        {
          question: "Does Hxrao Overseas provide material testing or certification?",
          answer: "We do not directly provide material testing. However, where required as part of a transaction, we can coordinate third-party inspection or testing arrangements between the buyer and supplier.",
        },
      ]}
    />
  );
}
