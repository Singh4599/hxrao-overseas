"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, TRADE_PROCESS_STEPS } from "./data/company";
import { useRFQ } from "./context/RFQContext";
import { useScrollReveal } from "./hooks/useScrollReveal";

/* ─── Inline Arrow Icon ─── */
const ArrowRight = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.5 }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── Category card images mapping ─── */
const categoryImages: Record<string, string> = {
  "healthcare-chemicals": "/images/hero-healthcare.jpg",
  "aluminium-plastic-scrap": "/images/hero-scrap.jpg",
  "copper-steel": "/images/hero-metals.jpg",
  "building-materials": "/images/hero-building.jpg",
};

/* ─── Marquee items ─── */
const marqueeItems = [
  "Healthcare & Chemicals",
  "Aluminium & Plastic Scrap",
  "Copper & Steel",
  "Building Materials",
  "Global Sourcing",
  "Import & Export",
];

export default function HomePage() {
  const { openRFQ } = useRFQ();
  const [activeProcess, setActiveProcess] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useScrollReveal();

  // Hero parallax (desktop only)
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const onScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const content = heroRef.current.querySelector(".hero-content") as HTMLElement;
      if (content && scrollY < window.innerHeight) {
        content.style.transform = `translateY(${scrollY * 0.3}px)`;
        content.style.opacity = `${1 - scrollY / (window.innerHeight * 0.8)}`;
      }
    };

    if (window.innerWidth > 768) {
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  // Animate trade process on scroll
  useEffect(() => {
    const el = document.getElementById("trade-process-section");
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

  const selCat = CATEGORIES[selectedCategory];

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "100svh" }}
      >
        {/* Background image */}
        <Image
          src="/images/hero-home.jpg"
          alt="International shipping port with organized containers at golden hour"
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.45))",
          }}
        />

        {/* Content */}
        <div className="hero-content relative z-10 text-center px-5 max-w-[760px]">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-7 rounded-full text-white text-[15px] font-medium"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              animation: "fadeUp 0.6s ease 0.1s both",
            }}
          >
            GLOBAL TRADE &bull; SOURCING &bull; SUPPLY
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(40px, 7vw, 72px)",
              color: "white",
              letterSpacing: "-1.5px",
              lineHeight: 1.05,
              animation: "fadeUp 0.6s ease 0.25s both",
            }}
          >
            Connecting Products.
            <br />
            Connecting Markets.
          </h1>

          {/* Subtitle */}
          <p
            className="mx-auto mt-6"
            style={{
              color: "rgba(255,255,255,0.78)",
              fontSize: "clamp(16px, 2vw, 19px)",
              lineHeight: 1.65,
              maxWidth: "600px",
              animation: "fadeUp 0.6s ease 0.4s both",
            }}
          >
            Hxrao Overseas connects businesses with dependable sourcing and
            international trade solutions across healthcare & chemicals,
            recyclable materials, metals and building materials.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center justify-center gap-3.5 mt-8"
            style={{ animation: "fadeUp 0.6s ease 0.55s both" }}
          >
            <a href="#categories" className="btn btn-primary">
              Explore Categories
            </a>
            <button
              className="btn btn-secondary-dark"
              onClick={() => openRFQ()}
            >
              Send an Enquiry
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ opacity: 0.55, animation: "bounce 2s infinite ease" }}
        >
          <ChevronDown />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          TRADE STRIP / MARQUEE
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--white)",
          padding: "30px 0",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{ background: "linear-gradient(to right, white, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{ background: "linear-gradient(to left, white, transparent)" }} />

        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 mx-8"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "17px",
                color: "var(--muted)",
                letterSpacing: "0.5px",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--blue)" }}
              />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          INTRO / EDITORIAL SPLIT
      ════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            {/* Left */}
            <div className="lg:flex-1 reveal">
              <p className="section-label">HXRAO OVERSEAS</p>
              <h2 className="section-heading mt-3">
                Trade built around the right product, the right source and the
                right connection.
              </h2>
            </div>

            {/* Right */}
            <div className="lg:flex-1 reveal" style={{ transitionDelay: "100ms" }}>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "18px",
                  lineHeight: 1.75,
                }}
              >
                Hxrao Overseas is a B2B import-export and sourcing company working
                across multiple industrial categories. We connect commercial
                requirements with suitable sourcing opportunities — coordinating
                trade documentation, logistics and business communication through
                each transaction.
              </p>
              <p
                className="mt-4"
                style={{
                  color: "var(--muted)",
                  fontSize: "18px",
                  lineHeight: 1.75,
                }}
              >
                Our approach is direct: understand what the buyer or supplier needs,
                identify a suitable route, and coordinate the process with clarity
                and commercial focus.
              </p>
              <Link href="/about" className="text-link mt-6">
                About Hxrao <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          PHOTO CATEGORY CARDS
      ════════════════════════════════════════════════════════════════ */}
      <section id="categories" className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="text-center mb-12 reveal">
            <p className="section-label">OUR CATEGORIES</p>
            <h2 className="section-heading mt-3">
              Trade across essential industries.
            </h2>
            <p className="section-subtitle mx-auto">
              Explore the core product categories handled by Hxrao Overseas.
            </p>
          </div>

          {/* Desktop grid / Mobile horizontal scroll */}
          <div className="hidden md:grid grid-cols-2 gap-6 reveal-stagger">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.slug} cat={cat} />
            ))}
          </div>

          {/* Mobile horizontal scroller */}
          <div
            className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              marginLeft: "-18px",
              marginRight: "-18px",
              paddingLeft: "18px",
              paddingRight: "18px",
            }}
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.slug}
                className="snap-start shrink-0"
                style={{ width: "86vw", maxWidth: "380px" }}
              >
                <CategoryCard cat={cat} mobile />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          HOW WE WORK — FEATURE GRID
      ════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div className="text-center mb-12 reveal">
            <p className="section-label">HOW WE WORK</p>
            <h2 className="section-heading mt-3">
              A clearer route from requirement to supply.
            </h2>
            <p className="section-subtitle mx-auto">
              A practical process focused on communication, coordination and
              commercial clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal-stagger">
            {[
              {
                num: "01",
                title: "Understand the Requirement",
                desc: "Begin with product category, specification, quantity, destination and commercial requirement.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                ),
              },
              {
                num: "02",
                title: "Source & Coordinate",
                desc: "Identify suitable sourcing routes and coordinate the commercial requirement.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                ),
              },
              {
                num: "03",
                title: "Documentation & Trade",
                desc: "Coordinate relevant trade documentation based on the agreed transaction and applicable requirements.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                ),
              },
              {
                num: "04",
                title: "Shipment Coordination",
                desc: "Support agreed logistics and shipment coordination through the trade process.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.num}
                className="reveal p-6 rounded-[20px] transition-all duration-300 group"
                style={{
                  background: "var(--white)",
                  border: "1.5px solid var(--border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--blue)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "var(--blue-light)" }}
                >
                  {item.icon}
                </div>
                <div
                  className="text-[15px] font-bold mb-2"
                  style={{ color: "var(--blue)", fontFamily: "var(--font-heading)" }}
                >
                  {item.num}
                </div>
                <h3
                  className="text-[19px] mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: "var(--text)",
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          TRADE PROCESS TIMELINE
      ════════════════════════════════════════════════════════════════ */}
      <section
        id="trade-process-section"
        className="section"
        style={{ background: "var(--white)" }}
      >
        <div className="container">
          <div className="text-center mb-14 reveal">
            <p className="section-label">THE TRADE PROCESS</p>
            <h2 className="section-heading mt-3">
              From enquiry to movement.
            </h2>
          </div>

          {/* Desktop horizontal timeline */}
          <div className="hidden md:block reveal">
            <div className="flex items-start justify-between relative">
              {/* Progress line */}
              <div
                className="absolute top-6 left-0 right-0 h-0.5"
                style={{ background: "var(--border)" }}
              />
              <div
                className="absolute top-6 left-0 h-0.5 transition-all duration-700"
                style={{
                  background: "var(--blue)",
                  width: `${(activeProcess / (TRADE_PROCESS_STEPS.length - 1)) * 100}%`,
                }}
              />

              {TRADE_PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center text-center flex-1"
                  style={{ maxWidth: "180px" }}
                >
                  {/* Circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-500 text-[16px] font-bold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      background: i <= activeProcess ? "var(--blue)" : "var(--white)",
                      color: i <= activeProcess ? "var(--white)" : "var(--muted)",
                      border: `2px solid ${i <= activeProcess ? "var(--blue)" : "var(--border)"}`,
                      boxShadow: i <= activeProcess ? "0 4px 15px rgba(59,130,246,0.3)" : "none",
                    }}
                  >
                    {step.number}
                  </div>
                  <h4
                    className="mt-4 text-[16px]"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      color: i <= activeProcess ? "var(--text)" : "var(--muted)",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className="mt-1 text-[15px]"
                    style={{
                      color: "var(--muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden reveal">
            <div className="relative pl-10">
              {/* Vertical line */}
              <div
                className="absolute left-4 top-0 bottom-0 w-0.5"
                style={{ background: "var(--border)" }}
              />
              <div
                className="absolute left-4 top-0 w-0.5 transition-all duration-700"
                style={{
                  background: "var(--blue)",
                  height: `${(activeProcess / (TRADE_PROCESS_STEPS.length - 1)) * 100}%`,
                }}
              />

              {TRADE_PROCESS_STEPS.map((step, i) => (
                <div key={step.number} className="relative mb-8 last:mb-0">
                  {/* Circle */}
                  <div
                    className="absolute -left-10 top-0 w-9 h-9 rounded-full flex items-center justify-center z-10 text-[14px] font-bold transition-all duration-500"
                    style={{
                      fontFamily: "var(--font-heading)",
                      background: i <= activeProcess ? "var(--blue)" : "var(--white)",
                      color: i <= activeProcess ? "var(--white)" : "var(--muted)",
                      border: `2px solid ${i <= activeProcess ? "var(--blue)" : "var(--border)"}`,
                    }}
                  >
                    {step.number}
                  </div>
                  <h4
                    className="text-[17px] mb-1"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      color: "var(--text)",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p style={{ color: "var(--muted)", fontSize: "16px", lineHeight: 1.6 }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CATEGORY SELECTOR WIDGET
      ════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div className="text-center mb-12 reveal">
            <p className="section-label">START AN ENQUIRY</p>
            <h2 className="section-heading mt-3">
              What are you looking to source?
            </h2>
          </div>

          <div className="reveal flex flex-col lg:flex-row gap-5">
            {/* Left panel — category rows */}
            <div
              className="lg:w-[45%] p-2.5 rounded-[24px]"
              style={{
                background: "var(--white)",
                border: "1.5px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat.slug}
                  className="w-full flex items-center gap-3 text-left transition-all duration-200 rounded-[14px] cursor-pointer"
                  style={{
                    padding: "14px 16px",
                    border: `2px solid ${selectedCategory === i ? "var(--text)" : "transparent"}`,
                    background: selectedCategory === i ? "var(--blue-light)" : "transparent",
                    marginBottom: i < CATEGORIES.length - 1 ? "4px" : "0",
                  }}
                  onClick={() => setSelectedCategory(i)}
                >
                  {/* Radio indicator */}
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      borderColor: selectedCategory === i ? "var(--text)" : "var(--border)",
                    }}
                  >
                    {selectedCategory === i && (
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--text)" }} />
                    )}
                  </div>
                  <span
                    className="text-[17px] font-medium"
                    style={{
                      color: selectedCategory === i ? "var(--text)" : "var(--muted)",
                      fontWeight: selectedCategory === i ? 600 : 500,
                    }}
                  >
                    {cat.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Right panel — category details */}
            <div
              className="lg:flex-1 p-8 rounded-[24px] flex flex-col justify-between"
              style={{
                background: "var(--white)",
                border: "1.5px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
                minHeight: "280px",
              }}
            >
              <div key={selCat.slug} className="animate-fadeIn">
                <span className="section-label">{selCat.eyebrow}</span>
                <h3
                  className="mt-3 text-[24px]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    color: "var(--text)",
                  }}
                >
                  {selCat.title}
                </h3>
                <p
                  className="mt-3"
                  style={{
                    color: "var(--muted)",
                    fontSize: "17px",
                    lineHeight: 1.7,
                    maxWidth: "440px",
                  }}
                >
                  {selCat.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selCat.subcategories.map((sub) => (
                    <span
                      key={sub}
                      className="inline-block px-3 py-1.5 rounded-full text-[14px] font-medium"
                      style={{
                        background: "var(--blue-light)",
                        color: "var(--blue-dark)",
                      }}
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-primary mt-6 w-fit"
                onClick={() => openRFQ(selCat.title)}
              >
                Start Enquiry <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FULL-WIDTH PHOTO CTA BANNER
      ════════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div
            className="relative overflow-hidden reveal"
            style={{
              borderRadius: "var(--radius-banner)",
              minHeight: "450px",
            }}
          >
            <Image
              src="/images/cta-banner.jpg"
              alt="Modern warehouse and distribution center"
              fill
              className="object-cover"
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.85) 40%, rgba(15,23,42,0.4) 100%)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center h-full p-8 md:p-14 lg:p-16" style={{ minHeight: "450px" }}>
              <div className="max-w-lg">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-bold tracking-wider mb-6"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  TRADE ENQUIRIES
                </span>

                <h2
                  className="text-white"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "clamp(26px, 4vw, 38px)",
                    lineHeight: 1.15,
                    letterSpacing: "-1px",
                  }}
                >
                  Have a sourcing or supply requirement?
                </h2>

                <p
                  className="mt-4"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "18px",
                    lineHeight: 1.7,
                    maxWidth: "420px",
                  }}
                >
                  Share the product, quantity and destination with Hxrao Overseas
                  to begin a business enquiry.
                </p>

                <ul className="mt-6 flex flex-col gap-3">
                  {[
                    "Product or material requirement",
                    "Quantity and specification",
                    "Destination market",
                    "Commercial enquiry",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-white text-[16px]"
                      style={{ opacity: 0.85 }}
                    >
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  className="btn btn-primary mt-8"
                  onClick={() => openRFQ()}
                >
                  Send Your Requirement <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Animations ── */}
      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marqueeScroll 30s linear infinite;
        }
        .animate-fadeIn {
          animation: fadeUp 0.3s ease both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Category Card Component
═══════════════════════════════════════════════════════════════════ */
function CategoryCard({ cat, mobile = false }: { cat: (typeof CATEGORIES)[number]; mobile?: boolean }) {
  return (
    <Link
      href={cat.href}
      className="reveal group relative block overflow-hidden no-underline"
      style={{
        borderRadius: "var(--radius-card)",
        height: mobile ? "410px" : "380px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
      }}
    >
      {/* Image */}
      <Image
        src={categoryImages[cat.slug] || "/images/hero-home.jpg"}
        alt={cat.imageAlt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        sizes="(max-width: 768px) 86vw, 50vw"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(160deg, rgba(10,15,30,0.42) 0%, rgba(10,15,30,0.30) 45%, rgba(10,15,30,0.82) 100%)",
        }}
      />

      {/* Number badge */}
      <div
        className="absolute top-5 left-5 w-8 h-8 rounded-full flex items-center justify-center text-[15px] font-bold text-white"
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.2)",
          fontFamily: "var(--font-heading)",
        }}
      >
        {cat.number}
      </div>

      {/* Eyebrow */}
      <div
        className="absolute top-5 right-5 px-3 py-1 rounded-full text-[12px] font-bold tracking-wider text-white"
        style={{
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(4px)",
        }}
      >
        {cat.eyebrow}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3
          className="text-white text-[22px] mb-2"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          {cat.title}
        </h3>
        <p
          className="text-[16px] mb-4"
          style={{
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.5,
          }}
        >
          {cat.description}
        </p>
        <span className="text-link text-white text-[16px]" style={{ color: "white" }}>
          Explore category <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
