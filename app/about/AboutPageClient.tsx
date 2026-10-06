"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CATEGORIES, TRADE_PROCESS_STEPS } from "../data/company";
import { useRFQ } from "../context/RFQContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const categoryImages: Record<string, string> = {
  "healthcare-chemicals": "/images/hero-healthcare.jpg",
  "aluminium-plastic-scrap": "/images/hero-scrap.jpg",
  "copper-steel": "/images/hero-metals.jpg",
  "building-materials": "/images/hero-building.jpg",
};

export default function AboutPageClient() {
  const { openRFQ } = useRFQ();
  const [activeProcess, setActiveProcess] = useState(0);

  useScrollReveal();

  useEffect(() => {
    const el = document.getElementById("about-process");
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
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "max(75svh, 620px)" }}
      >
        <Image
          src="/images/hero-about.jpg"
          alt="Professional warehouse and procurement environment"
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.45))" }} />

        <div className="relative z-10 text-center px-5 max-w-[760px]">
          <span
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-7 rounded-full text-white text-[15px] font-medium"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(4px)" }}
          >
            ABOUT HXRAO OVERSEAS
          </span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 7vw, 64px)", color: "white", letterSpacing: "-1.5px", lineHeight: 1.05 }}>
            Trade relationships built around clarity.
          </h1>
          <p className="mx-auto mt-6" style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.65, maxWidth: "580px" }}>
            Hxrao Overseas is a modern B2B sourcing and import-export company connecting commercial requirements with suitable trade opportunities.
          </p>
        </div>
      </section>

      {/* COMPANY INTRO */}
      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:flex-1 reveal">
              <p className="section-label">WHO WE ARE</p>
              <h2 className="section-heading mt-3">Connecting commercial requirements with sourcing opportunities.</h2>
            </div>
            <div className="lg:flex-1 reveal" style={{ transitionDelay: "100ms" }}>
              <p style={{ color: "var(--muted)", fontSize: "18px", lineHeight: 1.75 }}>
                Hxrao Overseas operates as a B2B import-export and sourcing company across four core industrial categories: healthcare & chemicals, aluminium & plastic scrap, copper & steel, and building materials.
              </p>
              <p className="mt-4" style={{ color: "var(--muted)", fontSize: "18px", lineHeight: 1.75 }}>
                We work with businesses to understand their product requirements, identify suitable sourcing routes, and coordinate the trade process — from initial enquiry through documentation and logistics coordination.
              </p>
              <p className="mt-4" style={{ color: "var(--muted)", fontSize: "18px", lineHeight: 1.75 }}>
                Our focus is on clear communication, commercially relevant sourcing, and building dependable B2B relationships across international markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / APPROACH CARDS */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-stagger">
            <div
              className="reveal p-8 md:p-10 rounded-[24px]"
              style={{ background: "var(--background)", border: "1.5px solid var(--border)" }}
            >
              <span className="section-label">OUR APPROACH</span>
              <h3 className="mt-4" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "24px", color: "var(--text)" }}>
                Clarity at every stage of the trade process.
              </h3>
              <p className="mt-4" style={{ color: "var(--muted)", fontSize: "17px", lineHeight: 1.7 }}>
                We believe international trade works best when both sides of a transaction have clear information. Our approach is built around transparent communication, responsible coordination, and commercially relevant sourcing — helping businesses make informed decisions about their trade requirements.
              </p>
            </div>
            <div
              className="reveal p-8 md:p-10 rounded-[24px]"
              style={{ background: "var(--background)", border: "1.5px solid var(--border)" }}
            >
              <span className="section-label">OUR FOCUS</span>
              <h3 className="mt-4" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "24px", color: "var(--text)" }}>
                Building dependable B2B relationships.
              </h3>
              <p className="mt-4" style={{ color: "var(--muted)", fontSize: "17px", lineHeight: 1.7 }}>
                Every trade relationship begins with understanding. We work to build dependable connections across our four trading categories — prioritising long-term commercial partnerships over one-off transactions. Our focus is on matching the right products with the right requirements through careful coordination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div className="text-center mb-10 reveal">
            <p className="section-label">WHAT WE TRADE</p>
            <h2 className="section-heading mt-3">Four categories. One trade partner.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal-stagger">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.href}
                className="reveal group relative block overflow-hidden no-underline"
                style={{ borderRadius: "var(--radius-card)", height: "260px", boxShadow: "var(--shadow-md)" }}
              >
                <Image src={categoryImages[cat.slug] || "/images/hero-home.jpg"} alt={cat.imageAlt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" sizes="25vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,15,30,0.85) 0%, rgba(10,15,30,0.2) 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="text-white text-[18px] mb-1" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>{cat.title}</h4>
                  <span className="text-link text-white text-[15px]" style={{ color: "rgba(255,255,255,0.7)" }}>View category <ArrowRight size={13} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section id="about-process" className="section" style={{ background: "var(--white)" }}>
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

      {/* CTA BANNER */}
      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div
            className="reveal relative overflow-hidden text-center py-16 px-8"
            style={{ borderRadius: "var(--radius-banner)", background: "var(--text)" }}
          >
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 4vw, 36px)", color: "white", letterSpacing: "-0.5px" }}>
              Discuss your next trade requirement.
            </h2>
            <p className="mt-3 mx-auto" style={{ color: "rgba(255,255,255,0.6)", fontSize: "18px", maxWidth: "440px" }}>
              Share your product, quantity and destination to begin a conversation.
            </p>
            <button className="btn btn-primary mt-7" onClick={() => openRFQ()}>
              Start an Enquiry <ArrowRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
