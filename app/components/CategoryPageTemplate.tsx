"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Category, CATEGORIES, TRADE_PROCESS_STEPS } from "../data/company";
import { useRFQ } from "../context/RFQContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const categoryImages: Record<string, string> = {
  "healthcare-chemicals": "/images/hero-healthcare.jpg",
  "aluminium-plastic-scrap": "/images/hero-scrap.jpg",
  "copper-steel": "/images/hero-metals.jpg",
  "building-materials": "/images/hero-building.jpg",
};

const subcatIcons = [
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
];

type CategoryPageTemplateProps = {
  category: Category;
  overviewHeading: string;
  overviewContent: string[];
  buyerFields: string[];
  faqs: { question: string; answer: string }[];
};

export function CategoryPageTemplate({
  category,
  overviewHeading,
  overviewContent,
  buyerFields,
  faqs,
}: CategoryPageTemplateProps) {
  const { openRFQ } = useRFQ();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeProcess, setActiveProcess] = useState(0);
  const otherCategories = CATEGORIES.filter((c) => c.slug !== category.slug);

  useScrollReveal();

  useEffect(() => {
    const el = document.getElementById("cat-process");
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let i = 0;
          const interval = setInterval(() => {
            setActiveProcess(i);
            i++;
            if (i >= TRADE_PROCESS_STEPS.length) clearInterval(interval);
          }, 600);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "max(75svh, 620px)" }}
      >
        <Image
          src={categoryImages[category.slug] || "/images/hero-home.jpg"}
          alt={category.imageAlt}
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.7) 50%, rgba(15,23,42,0.3) 100%)" }} />

        <div className="relative z-10 container pb-16 pt-32">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-[15px]" style={{ color: "rgba(255,255,255,0.6)" }}>
              <li><Link href="/" className="no-underline hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>Home</Link></li>
              <li>/</li>
              <li><span style={{ color: "rgba(255,255,255,0.6)" }}>Categories</span></li>
              <li>/</li>
              <li style={{ color: "white" }}>{category.title}</li>
            </ol>
          </nav>

          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-bold tracking-wider text-white mb-5"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(4px)" }}
          >
            {category.badge}
          </span>

          <h1 className="max-w-lg" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(36px, 6vw, 56px)", color: "white", letterSpacing: "-1.5px", lineHeight: 1.05 }}>
            {category.h1}
          </h1>
          <p className="mt-5 max-w-lg" style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.65 }}>
            {category.heroDescription}
          </p>

          <div className="flex flex-wrap gap-3 mt-7">
            <button className="btn btn-primary" onClick={() => openRFQ(category.title)}>
              Request a Quote
            </button>
            <Link href="/contact" className="btn btn-secondary-dark">
              Contact Hxrao
            </Link>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="lg:flex-1 reveal">
              <p className="section-label">CATEGORY OVERVIEW</p>
              <h2 className="section-heading mt-3">{overviewHeading}</h2>
              {overviewContent.map((paragraph, i) => (
                <p key={i} className="mt-4" style={{ color: "var(--muted)", fontSize: "17px", lineHeight: 1.75 }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="lg:w-[40%] reveal" style={{ transitionDelay: "100ms" }}>
              <div className="relative overflow-hidden rounded-[24px]" style={{ height: "340px", boxShadow: "var(--shadow-lg)" }}>
                <Image src={categoryImages[category.slug] || "/images/hero-home.jpg"} alt={category.imageAlt} fill className="object-cover" sizes="40vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT GROUPS */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="mb-10 reveal">
            <p className="section-label">PRODUCT SCOPE</p>
            <h2 className="section-heading mt-3">Products and requirements within this category.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 reveal-stagger">
            {category.subcategories.map((sub, i) => (
              <div
                key={sub}
                className="reveal flex items-start gap-4 p-6 rounded-[20px] transition-all duration-200 group cursor-pointer"
                style={{ background: "var(--background)", border: "1.5px solid var(--border)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
                onClick={() => openRFQ(category.title)}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--blue-light)" }}>
                  {subcatIcons[i % subcatIcons.length]}
                </div>
                <div className="flex-1">
                  <h4 className="text-[18px] mb-1" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)" }}>{sub}</h4>
                  <p style={{ color: "var(--muted)", fontSize: "15px" }}>Enquire about this product category</p>
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity mt-1" style={{ color: "var(--blue)" }}>
                  <ArrowRight size={18} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUYER REQUIREMENTS */}
      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8 reveal">
            <div className="lg:flex-1">
              <p className="section-label">FOR BUYERS & PROCUREMENT</p>
              <h2 className="section-heading mt-3">Send the information needed for a relevant trade response.</h2>
              <p className="mt-4" style={{ color: "var(--muted)", fontSize: "17px", lineHeight: 1.7 }}>
                Including these details helps us provide a faster and more relevant response to your commercial requirement.
              </p>
            </div>
            <div className="lg:flex-1">
              <div className="p-6 rounded-[24px]" style={{ background: "var(--white)", border: "1.5px solid var(--border)" }}>
                {buyerFields.map((field, i) => (
                  <div
                    key={field}
                    className="flex items-center gap-3 py-3.5"
                    style={{ borderBottom: i < buyerFields.length - 1 ? "1px solid var(--border)" : "none" }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[15px] font-bold" style={{ background: "var(--blue-light)", color: "var(--blue)", fontFamily: "var(--font-heading)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span style={{ fontSize: "17px", fontWeight: 500, color: "var(--text)" }}>{field}</span>
                  </div>
                ))}
                <button className="btn btn-primary w-full mt-5" onClick={() => openRFQ(category.title)}>
                  Send Your Requirement <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="cat-process" className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="text-center mb-14 reveal">
            <p className="section-label">THE TRADE PROCESS</p>
            <h2 className="section-heading mt-3">From enquiry to movement.</h2>
          </div>
          <div className="reveal">
            <div className="relative pl-10 max-w-xl mx-auto">
              <div className="absolute left-4 top-0 bottom-0 w-0.5" style={{ background: "var(--border)" }} />
              <div className="absolute left-4 top-0 w-0.5 transition-all duration-700" style={{ background: "var(--blue)", height: `${(activeProcess / (TRADE_PROCESS_STEPS.length - 1)) * 100}%` }} />
              {TRADE_PROCESS_STEPS.map((step, i) => (
                <div key={step.number} className="relative mb-8 last:mb-0">
                  <div className="absolute -left-10 top-0 w-9 h-9 rounded-full flex items-center justify-center z-10 text-[14px] font-bold transition-all duration-500" style={{ fontFamily: "var(--font-heading)", background: i <= activeProcess ? "var(--blue)" : "var(--white)", color: i <= activeProcess ? "var(--white)" : "var(--muted)", border: `2px solid ${i <= activeProcess ? "var(--blue)" : "var(--border)"}` }}>
                    {step.number}
                  </div>
                  <h4 className="text-[17px] mb-1" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text)" }}>{step.title}</h4>
                  <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: 1.6 }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-10 reveal">
            <p className="section-label">FREQUENTLY ASKED</p>
            <h2 className="section-heading mt-3">Common questions about this category.</h2>
          </div>
          <div className="flex flex-col gap-3 reveal">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-[16px] overflow-hidden transition-colors duration-200"
                style={{ border: "1px solid var(--border)", background: "var(--white)" }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left bg-transparent border-none cursor-pointer"
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  aria-expanded={openFAQ === i}
                >
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "17px", color: "var(--text)", paddingRight: "16px" }}>
                    {faq.question}
                  </span>
                  <ChevronIcon open={openFAQ === i} />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openFAQ === i ? "300px" : "0", opacity: openFAQ === i ? 1 : 0 }}
                >
                  <div className="px-5 pb-5">
                    <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: 1.7 }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED CATEGORIES */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="text-center mb-10 reveal">
            <h2 className="section-heading">Explore other trade categories.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 reveal-stagger">
            {otherCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.href}
                className="reveal group relative block overflow-hidden no-underline"
                style={{ borderRadius: "var(--radius-card)", height: "240px", boxShadow: "var(--shadow-md)" }}
              >
                <Image src={categoryImages[cat.slug] || "/images/hero-home.jpg"} alt={cat.imageAlt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" sizes="33vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,15,30,0.85) 0%, rgba(10,15,30,0.2) 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="text-white text-[18px] mb-1" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>{cat.title}</h4>
                  <span className="text-[15px]" style={{ color: "rgba(255,255,255,0.7)" }}>View category →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div
            className="reveal relative overflow-hidden"
            style={{ borderRadius: "var(--radius-banner)", minHeight: "380px" }}
          >
            <Image src={categoryImages[category.slug] || "/images/hero-home.jpg"} alt={category.imageAlt} fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.7) 50%, rgba(15,23,42,0.3) 100%)" }} />
            <div className="relative z-10 flex flex-col justify-center h-full p-8 md:p-14" style={{ minHeight: "380px" }}>
              <div className="max-w-md">
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 4vw, 34px)", color: "white", letterSpacing: "-0.5px", lineHeight: 1.15 }}>
                  Looking for {category.title.toLowerCase()}?
                </h2>
                <p className="mt-3" style={{ color: "rgba(255,255,255,0.7)", fontSize: "17px", lineHeight: 1.7 }}>
                  Share your requirement with Hxrao Overseas to start a trade enquiry.
                </p>
                <button className="btn btn-primary mt-6" onClick={() => openRFQ(category.title)}>
                  Send Your Requirement <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
