import type { Metadata } from "next";
import { SEO_METADATA } from "../data/company";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: SEO_METADATA.contact.title,
  description: SEO_METADATA.contact.description,
  openGraph: { title: SEO_METADATA.contact.title, description: SEO_METADATA.contact.description },
};

export default function ContactPage() {
  return <ContactClient />;
}
