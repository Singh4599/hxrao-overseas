import type { Metadata } from "next";
import { SEO_METADATA } from "../data/company";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: SEO_METADATA.about.title,
  description: SEO_METADATA.about.description,
  openGraph: {
    title: SEO_METADATA.about.title,
    description: SEO_METADATA.about.description,
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
