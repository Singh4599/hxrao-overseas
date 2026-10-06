import type { Metadata } from "next";
import { SEO_METADATA } from "../data/company";
import ScrapClient from "./ScrapClient";

export const metadata: Metadata = {
  title: SEO_METADATA.aluminiumPlasticScrap.title,
  description: SEO_METADATA.aluminiumPlasticScrap.description,
  openGraph: { title: SEO_METADATA.aluminiumPlasticScrap.title, description: SEO_METADATA.aluminiumPlasticScrap.description },
};

export default function AluminiumPlasticScrapPage() {
  return <ScrapClient />;
}
