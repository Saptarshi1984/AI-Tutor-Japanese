// components/MobileContainer.tsx
"use client";

import { useRef } from "react";
import Slider from "./Slider"; // or pass as prop
import UserIconButton from "./userIconButton";
import Logo from "./Logo";
import BottomMenu from "./BottomMenu";


const MobileContainer = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-[412px] h-[915px] mx-auto border border-gray-600 bg-gray-950 overflow-hidden"
    >
      <UserIconButton />
      <Logo />
      <Slider containerRef={containerRef} />
      {children}
      <BottomMenu />
    </div>
  );
};

export default MobileContainer;
