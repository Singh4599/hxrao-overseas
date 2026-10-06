"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useRFQ } from "../context/RFQContext";
import { CATEGORIES } from "../data/company";

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckCircle = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rfq-success-icon">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

type FormData = {
  category: string;
  product: string;
  quantity: string;
  specification: string;
  destination: string;
  details: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
};

const initialForm: FormData = {
  category: "",
  product: "",
  quantity: "",
  specification: "",
  destination: "",
  details: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
};

export function RFQModal() {
  const { isOpen, closeRFQ, preselectedCategory } = useRFQ();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Store trigger element
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Set preselected category
  useEffect(() => {
    if (preselectedCategory) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((f) => ({ ...f, category: preselectedCategory }));
    }
  }, [preselectedCategory]);

  const handleClose = useCallback(() => {
    closeRFQ();
    setStep(1);
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
    setTimeout(() => triggerRef.current?.focus(), 100);
  }, [closeRFQ]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const modal = modalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    first?.focus();
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [isOpen, step, handleClose]);



  const updateField = (key: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (step === 1) {
      if (!form.category) newErrors.category = "Please select a category";
    } else if (step === 2) {
      if (!form.product.trim()) newErrors.product = "Product is required";
      if (!form.details.trim()) newErrors.details = "Details are required";
    } else if (step === 3) {
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        newErrors.email = "Enter a valid email";
      if (!form.phone.trim()) newErrors.phone = "Phone is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < 3) setStep((s) => s + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    // In production, send to API
    console.log("RFQ Submission:", form);
    setSubmitted(true);
  };

  if (!isOpen) return null;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1.5px solid var(--border)",
    borderRadius: "12px",
    padding: "12px 14px",
    minHeight: "48px",
    background: "rgba(255,255,255,0.4)",
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

  const errorStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "var(--danger)",
    marginTop: "4px",
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-3"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Request a quote"
    >
      <div
        ref={modalRef}
        className="relative w-full overflow-y-auto"
        style={{
          maxWidth: "580px",
          maxHeight: "min(760px, 90vh)",
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: "28px",
          boxShadow: "var(--shadow-xl)",
          animation: "modalIn 0.4s cubic-bezier(0.2,0.8,0.2,1)",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 flex items-center justify-center w-9 h-9 rounded-full bg-transparent border-none cursor-pointer transition-colors duration-150 z-10"
          style={{ color: "var(--muted)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--blue-light)";
            e.currentTarget.style.color = "var(--text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--muted)";
          }}
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        <div className="p-8 md:p-10">
          {submitted ? (
            /* ─── Success ─── */
            <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
              <CheckCircle />
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "26px",
                  color: "var(--text)",
                }}
              >
                Enquiry received
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "17px", maxWidth: "340px" }}>
                Thank you for your enquiry. We will review the details and respond
                at the earliest opportunity.
              </p>
              <button className="btn btn-primary mt-2" onClick={handleClose}>
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Progress bar */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className="flex-1 rounded-full transition-colors duration-300"
                    style={{
                      height: "2px",
                      background: s <= step ? "var(--blue)" : "var(--border)",
                    }}
                  />
                ))}
              </div>

              {/* Step title */}
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "24px",
                  color: "var(--text)",
                  marginBottom: "4px",
                }}
              >
                {step === 1 && "Choose Category"}
                {step === 2 && "Your Requirement"}
                {step === 3 && "Contact Details"}
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "16px",
                  marginBottom: "24px",
                }}
              >
                {step === 1 && "Select the product category for your enquiry."}
                {step === 2 && "Tell us what you're looking for."}
                {step === 3 && "How should we reach you?"}
              </p>

              {/* ─── Step 1: Category ─── */}
              {step === 1 && (
                <div className="flex flex-col gap-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      className="flex items-center gap-4 p-4 rounded-2xl border-2 bg-white transition-all duration-200 cursor-pointer text-left"
                      style={{
                        borderColor:
                          form.category === cat.title
                            ? "var(--text)"
                            : "var(--border)",
                        boxShadow:
                          form.category === cat.title
                            ? "0 0 0 1px var(--text)"
                            : "none",
                      }}
                      onClick={() => updateField("category", cat.title)}
                    >
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200"
                        style={{
                          borderColor:
                            form.category === cat.title
                              ? "var(--text)"
                              : "var(--border)",
                        }}
                      >
                        {form.category === cat.title && (
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: "var(--text)" }}
                          />
                        )}
                      </div>
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: "17px",
                            color: "var(--text)",
                          }}
                        >
                          {cat.title}
                        </div>
                        <div
                          style={{
                            fontSize: "15px",
                            color: "var(--muted)",
                            marginTop: "2px",
                          }}
                        >
                          {cat.description}
                        </div>
                      </div>
                    </button>
                  ))}
                  {errors.category && (
                    <p style={errorStyle}>{errors.category}</p>
                  )}
                </div>
              )}

              {/* ─── Step 2: Requirement ─── */}
              {step === 2 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <label style={labelStyle}>
                      Product / Material <span style={{ color: "var(--danger)" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={form.product}
                      onChange={(e) => updateField("product", e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--blue)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(59,130,246,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border)";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="e.g. Aluminium ingots, PVC pipes..."
                    />
                    {errors.product && <p style={errorStyle}>{errors.product}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>Approx. Quantity</label>
                      <input
                        type="text"
                        value={form.quantity}
                        onChange={(e) => updateField("quantity", e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--blue)";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(59,130,246,0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--border)";
                          e.target.style.boxShadow = "none";
                        }}
                        placeholder="e.g. 20 MT"
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Specification</label>
                      <input
                        type="text"
                        value={form.specification}
                        onChange={(e) =>
                          updateField("specification", e.target.value)
                        }
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--blue)";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(59,130,246,0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--border)";
                          e.target.style.boxShadow = "none";
                        }}
                        placeholder="Grade / type"
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Destination</label>
                    <input
                      type="text"
                      value={form.destination}
                      onChange={(e) => updateField("destination", e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--blue)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(59,130,246,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border)";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="Country or port"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>
                      Requirement Details <span style={{ color: "var(--danger)" }}>*</span>
                    </label>
                    <textarea
                      value={form.details}
                      onChange={(e) => updateField("details", e.target.value)}
                      style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--blue)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(59,130,246,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border)";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="Describe your requirement..."
                    />
                    {errors.details && <p style={errorStyle}>{errors.details}</p>}
                  </div>
                </div>
              )}

              {/* ─── Step 3: Contact ─── */}
              {step === 3 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <label style={labelStyle}>
                      Full Name <span style={{ color: "var(--danger)" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--blue)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(59,130,246,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    {errors.name && <p style={errorStyle}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Company Name</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => updateField("company", e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--blue)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(59,130,246,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>
                        Business Email <span style={{ color: "var(--danger)" }}>*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--blue)";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(59,130,246,0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--border)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                      {errors.email && <p style={errorStyle}>{errors.email}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>
                        Phone / WhatsApp <span style={{ color: "var(--danger)" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--blue)";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(59,130,246,0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "var(--border)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                      {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Country</label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--blue)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(59,130,246,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 gap-3">
                {step > 1 ? (
                  <button
                    className="btn btn-secondary-light"
                    style={{ fontSize: "16px", padding: "11px 24px" }}
                    onClick={() => setStep((s) => s - 1)}
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}
                <button
                  className="btn btn-primary"
                  style={{ fontSize: "16px", padding: "11px 24px" }}
                  onClick={handleNext}
                >
                  {step === 3 ? "Send Enquiry" : "Continue"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes checkPop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        .rfq-success-icon {
          animation: checkPop 0.5s cubic-bezier(0.2,0.8,0.2,1);
        }
        @media (max-width: 768px) {
          div[role="dialog"] > div {
            max-height: calc(100svh - 24px) !important;
          }
        }
      `}</style>
    </div>
  );
}
