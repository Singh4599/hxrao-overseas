import Link from "next/link";
import { COMPANY, CATEGORIES } from "../data/company";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Categories",
    links: CATEGORIES.map((c) => ({ label: c.title, href: c.href })),
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative"
      style={{ background: "var(--footer-bg)", padding: "80px 0 40px" }}
    >
      <div className="container">
        {/* Floating card */}
        <div
          className="p-8 md:p-10 lg:px-16 lg:py-10"
          style={{
            background: "var(--white)",
            borderRadius: "var(--radius-footer)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Brand column */}
            <div className="lg:flex-[1.8] flex flex-col gap-5">
              <Link href="/" className="no-underline flex items-center gap-[5px]">
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "24px",
                    color: "var(--text)",
                  }}
                >
                  Hxrao
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 400,
                    fontSize: "24px",
                    color: "var(--muted)",
                  }}
                >
                  Overseas
                </span>
              </Link>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  maxWidth: "320px",
                }}
              >
                {COMPANY.description}
              </p>
              <Link
                href="/contact"
                className="btn btn-primary"
                style={{
                  width: "fit-content",
                  fontSize: "16px",
                  padding: "11px 24px",
                }}
              >
                Send an Enquiry
              </Link>
            </div>

            {/* Link columns */}
            <div className="lg:flex-[2.2] grid grid-cols-2 md:grid-cols-3 gap-8">
              {footerColumns.map((col) => (
                <div key={col.title}>
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "var(--text)",
                      marginBottom: "16px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {col.title}
                  </h4>
                  <ul className="list-none p-0 m-0 flex flex-col gap-3">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="no-underline text-[16px] hover:text-blue transition-colors duration-200"
                          style={{ color: "var(--muted)" }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between mt-8 px-4 gap-3"
          style={{ color: "#777777", fontSize: "15px" }}
        >
          <p>
            © {year} {COMPANY.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
