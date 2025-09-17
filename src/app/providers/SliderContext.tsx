// context/SliderContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SliderContextType = {
  isOpen: boolean;
  openSlider: () => void;
  closeSlider: () => void;
};

const SliderContext = createContext<SliderContextType | undefined>(undefined);

export const SliderProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSlider = () => setIsOpen(true);
  const closeSlider = () => setIsOpen(false);

  return (
    <SliderContext.Provider value={{ isOpen, openSlider, closeSlider }}>
      {children}
    </SliderContext.Provider>
  );
};

export const useSlider = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("useSlider must be used within a SliderProvider");
  }
  return context;
};
