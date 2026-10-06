"use client";

import { CATEGORIES } from "../data/company";
import { CategoryPageTemplate } from "../components/CategoryPageTemplate";

const category = CATEGORIES.find((c) => c.slug === "copper-steel")!;

export default function MetalsClient() {
  return (
    <CategoryPageTemplate
      category={category}
      overviewHeading="Industrial metal sourcing for copper and steel requirements"
      overviewContent={[
        "Copper and steel are fundamental industrial metals used across manufacturing, construction, electrical, and infrastructure sectors. Hxrao Overseas supports B2B sourcing and international trade for copper and steel requirements — working with businesses that need reliable supply coordination for their commercial operations.",
        "Our approach to metal trading focuses on understanding the buyer's specific material requirements, including product form, grade, quantity, and delivery logistics. We then work to identify suitable sourcing options and coordinate the trade process from commercial agreement through to shipment.",
        "Whether the requirement is for copper cathodes, copper wire, steel coils, structural steel, or other metal products, each enquiry is assessed individually. We coordinate with sourcing partners and manage trade documentation to support smooth transaction execution.",
      ]}
      buyerFields={[
        "Metal type (copper / steel)",
        "Product form and grade",
        "Required quantity",
        "Destination country / port",
        "Delivery timeline",
        "Additional specifications",
      ]}
      faqs={[
        {
          question: "What copper and steel products does Hxrao Overseas trade?",
          answer: "We handle enquiries across various copper and steel product forms. Specific products depend on available sourcing and your commercial requirements. Share your product specification, grade, and quantity for a relevant assessment.",
        },
        {
          question: "Does Hxrao Overseas manufacture copper or steel products?",
          answer: "No. Hxrao Overseas is a sourcing and trading company. We connect buyer requirements with suitable supply sources and coordinate the trade process — we do not operate manufacturing or processing facilities.",
        },
        {
          question: "How does Hxrao Overseas verify metal quality?",
          answer: "Quality verification is typically managed through mill test certificates, third-party inspection, and agreed quality standards between the buyer and supplier. We coordinate these arrangements as part of the transaction process.",
        },
        {
          question: "Can Hxrao Overseas handle large volume metal enquiries?",
          answer: "Yes. We work with commercial-scale metal enquiries. Share your volume requirement, product specification, and delivery details for an assessment of available sourcing options.",
        },
        {
          question: "What is the typical process for a copper or steel trade enquiry?",
          answer: "The process begins with your product requirement and specification. We assess sourcing options, discuss commercial terms, coordinate documentation, and manage logistics through to delivery at the agreed destination.",
        },
      ]}
    />
  );
}
