import type { Metadata } from "next";
import { SEO_METADATA } from "../data/company";
import MetalsClient from "./MetalsClient";

export const metadata: Metadata = {
  title: SEO_METADATA.copperSteel.title,
  description: SEO_METADATA.copperSteel.description,
  openGraph: { title: SEO_METADATA.copperSteel.title, description: SEO_METADATA.copperSteel.description },
};

export default function CopperSteelPage() {
  return <MetalsClient />;
}
