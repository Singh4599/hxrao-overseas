"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES, NAV_LINKS } from "../data/company";
import { useRFQ } from "../context/RFQContext";

/* ─── Inline SVG Icons ─── */
const ChevronDown = ({ className = "" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ArrowRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* Category line icons */
const categoryIcons: Record<string, React.ReactNode> = {
  "healthcare-chemicals": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 2v6l-2 8a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4l-2-8V2" />
      <line x1="9" y1="2" x2="15" y2="2" />
      <line x1="9" y1="8" x2="15" y2="8" />
    </svg>
  ),
  "aluminium-plastic-scrap": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  "copper-steel": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M12 6v12" />
      <path d="M2 12h20" />
    </svg>
  ),
  "building-materials": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h0.01" />
      <path d="M16 6h0.01" />
      <path d="M12 6h0.01" />
      <path d="M12 10h0.01" />
      <path d="M12 14h0.01" />
      <path d="M16 10h0.01" />
      <path d="M16 14h0.01" />
      <path d="M8 10h0.01" />
      <path d="M8 14h0.01" />
    </svg>
  ),
};

export function Navbar() {
  const pathname = usePathname();
  const { openRFQ } = useRFQ();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Determine if hero is image-based (transparent navbar initially)
  const isHeroPage =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    CATEGORIES.some((c) => pathname === c.href);

  // Scroll handler
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileAccordionOpen(false);
    document.body.classList.remove("scroll-locked");
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
        document.body.classList.remove("scroll-locked");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add("scroll-locked");
      } else {
        document.body.classList.remove("scroll-locked");
      }
      return next;
    });
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const showTransparent = isHeroPage && !scrolled && !mobileOpen;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
      style={{
        height: "var(--navbar-height)",
        background: showTransparent ? "transparent" : "var(--white)",
        boxShadow: showTransparent ? "none" : "0 1px 16px rgba(0,0,0,0.08)",
      }}
    >
      <nav className="container h-full flex items-center justify-between" aria-label="Main navigation">
        {/* ─── Logo ─── */}
        <Link
          href="/"
          className="flex items-center gap-0 no-underline z-10 shrink-0"
          aria-label="Hxrao Overseas — Home"
        >
          <span
            className="font-[var(--font-heading)] text-[24px] tracking-tight"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              color: showTransparent ? "var(--white)" : "var(--text)",
              transition: "color 0.3s ease",
            }}
          >
            Hxrao
          </span>
          <span
            className="ml-[5px] text-[24px] tracking-tight"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
              color: showTransparent ? "rgba(255,255,255,0.7)" : "var(--muted)",
              transition: "color 0.3s ease",
            }}
          >
            Overseas
          </span>
        </Link>

        {/* ─── Desktop Links ─── */}
        <div className="hidden md:flex items-center gap-[28px]">
          {NAV_LINKS.map((link) =>
            'isDropdown' in link && link.isDropdown ? (
              /* Categories dropdown */
              <div
                key={link.label}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className="flex items-center gap-[5px] bg-transparent border-none cursor-pointer transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "17px",
                    fontWeight: 500,
                    color: showTransparent
                      ? "rgba(255,255,255,0.85)"
                      : "var(--text)",
                    padding: 0,
                  }}
                  onClick={() => setDropdownOpen((v) => !v)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown
                    className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown panel */}
                <div
                  className="absolute top-full left-1/2 pt-3"
                  style={{
                    transform: "translateX(-50%)",
                    pointerEvents: dropdownOpen ? "auto" : "none",
                  }}
                >
                  <div
                    className="transition-all duration-200"
                    style={{
                      minWidth: "280px",
                      background: "var(--white)",
                      borderRadius: "20px",
                      border: "1px solid var(--border)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                      padding: "8px",
                      opacity: dropdownOpen ? 1 : 0,
                      transform: dropdownOpen
                        ? "translateY(0)"
                        : "translateY(-8px)",
                    }}
                    role="menu"
                  >
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={cat.href}
                        role="menuitem"
                        className="flex items-center gap-3 px-4 py-3 rounded-[14px] no-underline transition-colors duration-150 group"
                        style={{
                          color: "var(--text)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--blue-light)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span
                          className="flex items-center justify-center w-9 h-9 rounded-[10px] shrink-0 transition-colors duration-150"
                          style={{
                            background: "var(--blue-light)",
                            color: "var(--blue)",
                          }}
                        >
                          {categoryIcons[cat.slug]}
                        </span>
                        <span className="flex-1 text-[14.5px] font-medium">
                          {cat.title}
                        </span>
                        <span
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                          style={{ color: "var(--blue)" }}
                        >
                          <ArrowRight />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="no-underline transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "17px",
                  fontWeight: 500,
                  color:
                    pathname === link.href
                      ? "var(--blue)"
                      : showTransparent
                        ? "rgba(255,255,255,0.85)"
                        : "var(--text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--blue)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    pathname === link.href
                      ? "var(--blue)"
                      : showTransparent
                        ? "rgba(255,255,255,0.85)"
                        : "var(--text)";
                }}
              >
                {link.label}
              </Link>
            )
          )}

          {/* CTA Button */}
          <button
            className="btn btn-primary"
            style={{
              fontSize: "16px",
              padding: "11px 24px",
            }}
            onClick={() => openRFQ()}
          >
            Get a Quote
          </button>
        </div>

        {/* ─── Mobile Hamburger ─── */}
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 bg-transparent border-none cursor-pointer z-10"
          onClick={toggleMobile}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          style={{
            color: showTransparent && !mobileOpen ? "var(--white)" : "var(--text)",
          }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* ─── Mobile Menu ─── */}
      <div
        className="md:hidden fixed inset-x-0 transition-all duration-300 overflow-y-auto"
        style={{
          top: "var(--navbar-height)",
          bottom: 0,
          background: "var(--white)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transform: mobileOpen ? "translateY(0)" : "translateY(-10px)",
        }}
        aria-hidden={!mobileOpen}
      >
        <div className="container py-6 flex flex-col gap-1">
          {NAV_LINKS.map((link) =>
            'isDropdown' in link && link.isDropdown ? (
              <div key={link.label}>
                <button
                  className="w-full flex items-center justify-between py-4 bg-transparent border-none cursor-pointer"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "var(--text)",
                    borderBottom: "1px solid var(--border)",
                    padding: "16px 0",
                  }}
                  onClick={() => setMobileAccordionOpen((v) => !v)}
                  aria-expanded={mobileAccordionOpen}
                >
                  Categories
                  <ChevronDown
                    className={`transition-transform duration-200 ${mobileAccordionOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: mobileAccordionOpen ? "400px" : "0",
                    opacity: mobileAccordionOpen ? 1 : 0,
                  }}
                >
                  <div className="py-2 pl-4 flex flex-col gap-1">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={cat.href}
                        className="flex items-center gap-3 py-3 px-3 rounded-xl no-underline transition-colors duration-150"
                        style={{
                          color: pathname === cat.href ? "var(--blue)" : "var(--text)",
                          fontSize: "17px",
                          fontWeight: 500,
                        }}
                        onClick={() => {
                          setMobileOpen(false);
                          document.body.classList.remove("scroll-locked");
                        }}
                      >
                        <span
                          className="flex items-center justify-center w-8 h-8 rounded-lg"
                          style={{
                            background: "var(--blue-light)",
                            color: "var(--blue)",
                          }}
                        >
                          {categoryIcons[cat.slug]}
                        </span>
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="block py-4 no-underline transition-colors duration-150"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "18px",
                  fontWeight: 500,
                  color: pathname === link.href ? "var(--blue)" : "var(--text)",
                  borderBottom: "1px solid var(--border)",
                }}
                onClick={() => {
                  setMobileOpen(false);
                  document.body.classList.remove("scroll-locked");
                }}
              >
                {link.label}
              </Link>
            )
          )}

          {/* Mobile CTA */}
          <button
            className="btn btn-primary w-full mt-4"
            onClick={() => {
              setMobileOpen(false);
              document.body.classList.remove("scroll-locked");
              openRFQ();
            }}
          >
            Get a Quote
          </button>
        </div>
      </div>
    </header>
  );
}
