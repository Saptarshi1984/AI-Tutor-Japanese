"use client";

import { useSlider } from "@/app/providers/SliderContext";
import UserIcon from "./UserIcon";

const UserIconButton = () => {
  const { openSlider } = useSlider();

  return (
    <button
      type="button"
      onClick={openSlider}
      className="absolute left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gray-700/70 bg-gray-900/80 shadow-lg backdrop-blur"
      aria-label="Open account menu"
    >
      <UserIcon />
    </button>
  );
};

export default UserIconButton;
