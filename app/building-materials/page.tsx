import type { Metadata } from "next";
import { SEO_METADATA } from "../data/company";
import BuildingClient from "./BuildingClient";

export const metadata: Metadata = {
  title: SEO_METADATA.buildingMaterials.title,
  description: SEO_METADATA.buildingMaterials.description,
  openGraph: { title: SEO_METADATA.buildingMaterials.title, description: SEO_METADATA.buildingMaterials.description },
};

export default function BuildingMaterialsPage() {
  return <BuildingClient />;
}
