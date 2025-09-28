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
      className="relative mx-auto flex w-full max-w-[26rem] flex-col overflow-hidden bg-gray-950 shadow-xl md:!border md:!border-gray-700"
      style={{ height: "min(915px, 100svh)", minHeight: "min(640px, 100svh)" }}
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
