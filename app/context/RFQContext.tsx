"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type RFQContextType = {
  isOpen: boolean;
  openRFQ: (category?: string) => void;
  closeRFQ: () => void;
  preselectedCategory: string;
};

const RFQContext = createContext<RFQContextType | undefined>(undefined);

export function RFQProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedCategory, setPreselectedCategory] = useState("");

  const openRFQ = useCallback((category?: string) => {
    if (category) setPreselectedCategory(category);
    setIsOpen(true);
    document.body.classList.add("scroll-locked");
  }, []);

  const closeRFQ = useCallback(() => {
    setIsOpen(false);
    setPreselectedCategory("");
    document.body.classList.remove("scroll-locked");
  }, []);

  return (
    <RFQContext.Provider value={{ isOpen, openRFQ, closeRFQ, preselectedCategory }}>
      {children}
    </RFQContext.Provider>
  );
}

export function useRFQ() {
  const ctx = useContext(RFQContext);
  if (!ctx) throw new Error("useRFQ must be used within RFQProvider");
  return ctx;
}
