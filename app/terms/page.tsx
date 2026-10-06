import type { Metadata } from "next";
import Link from "next/link";
import { SEO_METADATA, COMPANY } from "../data/company";

export const metadata: Metadata = {
  title: SEO_METADATA.terms.title,
  description: SEO_METADATA.terms.description,
};

export default function TermsPage() {
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
            Terms &amp; Conditions
          </h1>
          <p className="mt-3" style={{ color: "rgba(255,255,255,0.6)", fontSize: "18px" }}>
            Terms of use for the {COMPANY.name} website.
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
              <h2>Acceptance of Terms</h2>
              <p>
                By accessing and using the {COMPANY.name} website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website.
              </p>

              <h2>Website Use</h2>
              <p>
                This website is provided for informational purposes and to facilitate trade enquiries. The content on this website does not constitute a binding offer, quotation, or contract for the supply of goods or services.
              </p>

              <h2>Trade Enquiries</h2>
              <p>
                Enquiries submitted through our website forms are initial expressions of interest. Any commercial transaction will be subject to separate written agreement between the parties, including terms of sale, pricing, delivery, and payment.
              </p>

              <h2>Accuracy of Information</h2>
              <p>
                While we make reasonable efforts to ensure the accuracy of information on this website, {COMPANY.name} does not warrant that all information is complete, current, or error-free. Product availability, specifications, and pricing are subject to change without notice.
              </p>

              <h2>Intellectual Property</h2>
              <p>
                All content on this website, including text, images, design elements, and branding, is the property of {COMPANY.name} or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written consent.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                {COMPANY.name} shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on information contained herein.
              </p>

              <h2>External Links</h2>
              <p>
                This website may contain links to third-party websites. {COMPANY.name} is not responsible for the content, privacy practices, or availability of external websites.
              </p>

              <h2>Governing Law</h2>
              <p>
                These Terms and Conditions shall be governed by and construed in accordance with applicable laws. Any disputes arising from the use of this website shall be subject to the jurisdiction of the appropriate courts.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                {COMPANY.name} reserves the right to modify these Terms and Conditions at any time. Changes will be effective upon posting to this page.
              </p>

              <h2>Contact</h2>
              <p>
                For any questions regarding these terms, please visit our{" "}
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
