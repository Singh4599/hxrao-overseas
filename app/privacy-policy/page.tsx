import type { Metadata } from "next";
import Link from "next/link";
import { SEO_METADATA, COMPANY } from "../data/company";

export const metadata: Metadata = {
  title: SEO_METADATA.privacyPolicy.title,
  description: SEO_METADATA.privacyPolicy.description,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Simple header */}
      <section
        className="flex items-center justify-center"
        style={{ minHeight: "340px", paddingTop: "var(--navbar-height)", background: "var(--text)" }}
      >
        <div className="container text-center py-16">
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 48px)",
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            Privacy Policy
          </h1>
          <p className="mt-3" style={{ color: "rgba(255,255,255,0.6)", fontSize: "18px" }}>
            How {COMPANY.name} handles your data and enquiry information.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div
            className="p-8 md:p-12 rounded-[24px]"
            style={{ background: "var(--white)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}
          >
            <div className="prose-content">
              <h2>Introduction</h2>
              <p>
                {COMPANY.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects the privacy of visitors to our website. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information.
              </p>

              <h2>Information We Collect</h2>
              <p>We may collect the following information when you interact with our website:</p>
              <ul>
                <li><strong>Contact information</strong> — name, email address, phone number, company name, and country, provided through our enquiry forms.</li>
                <li><strong>Trade enquiry details</strong> — product category, material specification, quantity, destination, and requirement details submitted through our RFQ or contact forms.</li>
                <li><strong>Technical information</strong> — browser type, device information, IP address, and pages visited, collected automatically through standard web technologies.</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>Information collected is used for the following purposes:</p>
              <ul>
                <li>To respond to your trade enquiry or business communication.</li>
                <li>To coordinate sourcing, documentation, and logistics related to your requirement.</li>
                <li>To improve our website functionality and user experience.</li>
                <li>To comply with applicable legal obligations.</li>
              </ul>

              <h2>Data Sharing</h2>
              <p>
                We do not sell your personal information. We may share information with trusted business partners involved in fulfilling your trade enquiry, or where required by law.
              </p>

              <h2>Data Security</h2>
              <p>
                We implement reasonable security measures to protect the information you provide. However, no method of internet transmission or electronic storage is completely secure.
              </p>

              <h2>Your Rights</h2>
              <p>
                You may request access to, correction of, or deletion of your personal information by contacting us. We will respond to such requests in accordance with applicable data protection laws.
              </p>

              <h2>Cookies</h2>
              <p>
                Our website may use cookies and similar technologies for functionality and analytics purposes. You can control cookie preferences through your browser settings.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
              </p>

              <h2>Contact</h2>
              <p>
                For privacy-related enquiries, please use our{" "}
                <Link href="/contact" style={{ color: "var(--blue)" }}>
                  contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
