import type { Metadata } from "next";
import { SEO_METADATA } from "../data/company";
import HealthcareClient from "./HealthcareClient";

export const metadata: Metadata = {
  title: SEO_METADATA.healthcareChemicals.title,
  description: SEO_METADATA.healthcareChemicals.description,
  openGraph: { title: SEO_METADATA.healthcareChemicals.title, description: SEO_METADATA.healthcareChemicals.description },
};

export default function HealthcareChemicalsPage() {
  return <HealthcareClient />;
}
