"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { COMPANY, CATEGORIES } from "../data/company";
import { useScrollReveal } from "../hooks/useScrollReveal";

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const MapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
);

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  category: string;
  product: string;
  quantity: string;
  destination: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  category: "",
  product: "",
  quantity: "",
  destination: "",
  message: "",
};

export default function ContactClient() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  useScrollReveal();

  const updateField = (key: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Required";
    if (!form.category) newErrors.category = "Required";
    if (!form.product.trim()) newErrors.product = "Required";
    if (!form.message.trim()) newErrors.message = "Required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    console.log("Contact form submission:", form);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1.5px solid var(--border)",
    borderRadius: "12px",
    padding: "12px 14px",
    minHeight: "48px",
    background: "rgba(255,255,255,0.6)",
    fontFamily: "var(--font-body)",
    fontSize: "17px",
    color: "var(--text)",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "15px",
    fontWeight: 600,
    color: "var(--text)",
    marginBottom: "6px",
  };

  const focusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "var(--blue)";
    e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
  };
  const blurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "var(--border)";
    e.target.style.boxShadow = "none";
  };

  const contactCards = [
    { icon: <PhoneIcon />, label: "Phone", value: COMPANY.phone, show: !!COMPANY.phone },
    { icon: <MailIcon />, label: "Email", value: COMPANY.email, show: !!COMPANY.email },
    { icon: <WhatsAppIcon />, label: "WhatsApp", value: COMPANY.whatsapp, show: !!COMPANY.whatsapp },
    { icon: <MapIcon />, label: "Office", value: COMPANY.address, show: !!COMPANY.address },
  ].filter((c) => c.show);

  return (
    <>
      {/* HERO */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "max(60svh, 480px)" }}
      >
        <Image src="/images/hero-contact.jpg" alt="Global logistics and trade environment" fill priority quality={85} className="object-cover" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.45))" }} />
        <div className="relative z-10 text-center px-5 max-w-[700px]">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 rounded-full text-white text-[15px] font-medium" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(4px)" }}>
            CONTACT HXRAO
          </span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(36px, 6vw, 56px)", color: "white", letterSpacing: "-1.5px", lineHeight: 1.05 }}>
            Tell us what you&apos;re looking for.
          </h1>
          <p className="mx-auto mt-5" style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.65, maxWidth: "520px" }}>
            Share your product requirement, quantity and destination to start a business enquiry.
          </p>
        </div>
      </section>

      {/* MAIN SECTION */}
      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* LEFT — Info */}
            <div className="lg:w-[42%] reveal">
              <h2 className="section-heading">Start a trade conversation.</h2>
              <p className="mt-4" style={{ color: "var(--muted)", fontSize: "17px", lineHeight: 1.7 }}>
                Include the product category, specification, quantity, and destination to help us provide a relevant and timely response to your commercial enquiry.
              </p>

              {contactCards.length > 0 && (
                <div className="flex flex-col gap-4 mt-8">
                  {contactCards.map((card) => (
                    <div key={card.label} className="flex items-center gap-4 p-4 rounded-[16px]" style={{ background: "var(--white)", border: "1px solid var(--border)" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--blue-light)" }}>
                        {card.icon}
                      </div>
                      <div>
                        <div className="text-[14px] font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>{card.label}</div>
                        <div className="text-[17px] font-medium" style={{ color: "var(--text)" }}>{card.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {contactCards.length === 0 && (
                <div className="mt-8 p-5 rounded-[16px]" style={{ background: "var(--blue-light)", border: "1px solid rgba(59,130,246,0.15)" }}>
                  <p style={{ color: "var(--blue-dark)", fontSize: "16px", fontWeight: 500 }}>
                    Contact details will be displayed here once confirmed. Please use the enquiry form to reach us.
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT — Form */}
            <div className="lg:flex-1 reveal" style={{ transitionDelay: "100ms" }}>
              <div
                className="p-7 md:p-9 rounded-[24px]"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                {submitted ? (
                  <div className="text-center py-12">
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "24px", color: "var(--text)" }}>Enquiry received</h3>
                    <p className="mt-2" style={{ color: "var(--muted)", fontSize: "17px" }}>We will review your requirement and respond at the earliest opportunity.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label style={labelStyle}>Full Name <span style={{ color: "var(--danger)" }}>*</span></label>
                        <input type="text" value={form.name} onChange={(e) => updateField("name", e.target.value)} style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                        {errors.name && <p className="text-[14px] mt-1" style={{ color: "var(--danger)" }}>{errors.name}</p>}
                      </div>
                      <div>
                        <label style={labelStyle}>Company Name</label>
                        <input type="text" value={form.company} onChange={(e) => updateField("company", e.target.value)} style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                      <div>
                        <label style={labelStyle}>Business Email <span style={{ color: "var(--danger)" }}>*</span></label>
                        <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                        {errors.email && <p className="text-[14px] mt-1" style={{ color: "var(--danger)" }}>{errors.email}</p>}
                      </div>
                      <div>
                        <label style={labelStyle}>Phone / WhatsApp <span style={{ color: "var(--danger)" }}>*</span></label>
                        <input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                        {errors.phone && <p className="text-[14px] mt-1" style={{ color: "var(--danger)" }}>{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                      <div>
                        <label style={labelStyle}>Country</label>
                        <input type="text" value={form.country} onChange={(e) => updateField("country", e.target.value)} style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                      </div>
                      <div>
                        <label style={labelStyle}>Product Category <span style={{ color: "var(--danger)" }}>*</span></label>
                        <select
                          value={form.category}
                          onChange={(e) => updateField("category", e.target.value)}
                          style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}
                          onFocus={focusHandler as unknown as React.FocusEventHandler<HTMLSelectElement>}
                          onBlur={blurHandler as unknown as React.FocusEventHandler<HTMLSelectElement>}
                        >
                          <option value="">Select category</option>
                          {CATEGORIES.map((c) => <option key={c.slug} value={c.title}>{c.title}</option>)}
                          <option value="Other">Other</option>
                        </select>
                        {errors.category && <p className="text-[14px] mt-1" style={{ color: "var(--danger)" }}>{errors.category}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                      <div>
                        <label style={labelStyle}>Product / Material <span style={{ color: "var(--danger)" }}>*</span></label>
                        <input type="text" value={form.product} onChange={(e) => updateField("product", e.target.value)} style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                        {errors.product && <p className="text-[14px] mt-1" style={{ color: "var(--danger)" }}>{errors.product}</p>}
                      </div>
                      <div>
                        <label style={labelStyle}>Approx. Quantity</label>
                        <input type="text" value={form.quantity} onChange={(e) => updateField("quantity", e.target.value)} style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                      </div>
                    </div>

                    <div className="mt-5">
                      <label style={labelStyle}>Destination</label>
                      <input type="text" value={form.destination} onChange={(e) => updateField("destination", e.target.value)} style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                    </div>

                    <div className="mt-5">
                      <label style={labelStyle}>Requirement Details <span style={{ color: "var(--danger)" }}>*</span></label>
                      <textarea value={form.message} onChange={(e) => updateField("message", e.target.value)} style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }} onFocus={focusHandler as unknown as React.FocusEventHandler<HTMLTextAreaElement>} onBlur={blurHandler as unknown as React.FocusEventHandler<HTMLTextAreaElement>} />
                      {errors.message && <p className="text-[14px] mt-1" style={{ color: "var(--danger)" }}>{errors.message}</p>}
                    </div>

                    <p className="mt-4 text-[14px]" style={{ color: "var(--muted)" }}>
                      By submitting this form you agree to our <Link href="/privacy-policy" className="underline" style={{ color: "var(--blue)" }}>Privacy Policy</Link>.
                    </p>

                    <button type="submit" className="btn btn-primary w-full mt-5">
                      Send Trade Enquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
