'use client'

import { useSlider } from "@/app/providers/SliderContext";
import UserIcon from "./UserIcon";

const UserIconButton = () => {
  const { openSlider } = useSlider();

  return (
    <div className="absolute top-4 left-4">
    <button  onClick={openSlider}>
      <UserIcon />
    </button>
    </div>
  );
};

export default UserIconButton;
