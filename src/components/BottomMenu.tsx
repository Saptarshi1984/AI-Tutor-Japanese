"use client";

import { usePathname } from "next/navigation";
import { Link } from "@chakra-ui/react";
import { GoHome } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import { PiBooksLight } from "react-icons/pi";
import { useHandleRedirect } from "@/utils/helpers";
import { useAuth } from "@/app/providers/AuthContext";

const BottomMenu = () => {
  
  const { session, loading } = useAuth();
  const { handleClickToRedirect } = useHandleRedirect();
  const pathname = usePathname();
  
  if(loading || !session) return null;

  return (
    <div className="absolute bottom-0 left-0 w-full min-h-14 !border-t-1 border-t-red-900 flex flex-row !text-xl  items-center justify-evenly bg-black">
      <Link
        className={pathname === "/Dashboard" ? "!text-cyan-500" : ""}
        onClick={() => handleClickToRedirect("/Dashboard")}
      >
        <span className="flex flex-col items-center gap-0.5">
          <GoHome />
          <span className="!text-[10px]">Home</span>
        </span>
      </Link>
      <Link
        className={pathname === "/Lessons" ? "!text-cyan-500" : ""}
        onClick={() => handleClickToRedirect("/Lessons")}
      >
        <span className="flex flex-col items-center gap-0.5">
          <PiBooksLight />
          <span className="!text-[10px]">Lessons</span>
        </span>
      </Link>
      <Link
        className={pathname === "/AI" ? "!text-cyan-500" : ""}
        onClick={() => handleClickToRedirect("/AI")}
      >
        <span className="w-[30px] h-[30px] flex flex-col items-center justify-center bg-cyan-800 !p-3 rounded-full ">
          AI
        </span>
      </Link>
      <Link
        className={pathname === "/Profile" ? "!text-cyan-500" : ""}
        onClick={() => handleClickToRedirect("/Profile")}
      >
        <span className="flex flex-col items-center gap-0.5">
          <IoPersonOutline />
          <span className="!text-[10px]">Profile</span>
        </span>
      </Link>
    </div>
  );
};

export default BottomMenu;
