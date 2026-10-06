"use client";

import { CATEGORIES } from "../data/company";
import { CategoryPageTemplate } from "../components/CategoryPageTemplate";

const category = CATEGORIES.find((c) => c.slug === "healthcare-chemicals")!;

export default function HealthcareClient() {
  return (
    <CategoryPageTemplate
      category={category}
      overviewHeading="B2B sourcing for healthcare and chemical trade requirements"
      overviewContent={[
        "The healthcare and chemicals sector requires careful coordination between supply and demand. Hxrao Overseas supports businesses with B2B sourcing and international trade for healthcare supplies and industrial chemical requirements — connecting buyers with appropriate sourcing routes across international markets.",
        "Our role in this category is focused on understanding the commercial requirement, coordinating with suitable supply sources, and managing the trade documentation and logistics process. We work with businesses that have established product specifications and regulatory clarity for their requirements.",
        "Whether the requirement involves healthcare consumables, industrial chemical raw materials, or specialised chemical products, we approach each enquiry with attention to the specific details that matter for safe and compliant international trade.",
      ]}
      buyerFields={[
        "Product or material name",
        "Specification or grade",
        "Required quantity",
        "Destination country / port",
        "Packaging preference",
        "Additional commercial requirements",
      ]}
      faqs={[
        {
          question: "What types of healthcare and chemical products does Hxrao Overseas handle?",
          answer: "We handle trade enquiries across healthcare supplies, industrial chemicals, and chemical raw materials. The specific products within each category depend on the buyer's requirement and available sourcing. Please share your product details for a relevant response.",
        },
        {
          question: "Does Hxrao Overseas manufacture healthcare or chemical products?",
          answer: "No. Hxrao Overseas is a B2B sourcing and trading company, not a manufacturer. We connect commercial requirements with suitable sourcing routes and coordinate the trade process on behalf of our clients.",
        },
        {
          question: "How do I share a healthcare or chemical trade requirement?",
          answer: "You can share your requirement through our contact form or RFQ modal. Include the product name, specification, quantity, destination, and any packaging or compliance details relevant to your requirement.",
        },
        {
          question: "Does Hxrao Overseas handle regulatory documentation?",
          answer: "We coordinate relevant trade documentation as part of the transaction process. However, product-specific regulatory approvals, certifications, and compliance remain the responsibility of the respective buyer and supplier as applicable.",
        },
        {
          question: "Can Hxrao Overseas source specific chemical raw materials?",
          answer: "We welcome enquiries for specific chemical raw materials. Share the product name, CAS number if available, grade, quantity, and destination, and we will assess whether a suitable sourcing route is available.",
        },
      ]}
    />
  );
}
