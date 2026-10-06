import type { Metadata } from "next";
import { Outfit, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { RFQModal } from "./components/RFQModal";
import { RFQProvider } from "./context/RFQContext";
import { COMPANY, SEO_METADATA } from "./data/company";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SEO_METADATA.home.title,
  description: SEO_METADATA.home.description,
  metadataBase: new URL(COMPANY.url),
  openGraph: {
    title: SEO_METADATA.home.title,
    description: SEO_METADATA.home.description,
    siteName: COMPANY.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_METADATA.home.title,
    description: SEO_METADATA.home.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${jakarta.variable}`}
    >
      <body>
        <RFQProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppButton />
          <RFQModal />
        </RFQProvider>
      </body>
    </html>
  );
}
