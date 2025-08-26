import BottomMenu from "@/components/BottomMenu";
import { Avatar, Text, Link } from "@chakra-ui/react";
import React from "react";
import { FaCamera } from "react-icons/fa";

const page = () => {
  return (
    <div className="w-full h-50 flex flex-col items-center justify-evenly !mt-10 gap-4">
      <Avatar.Root className="relative w-90" size={'2xl'}>
        <Avatar.Fallback name="Segun Adebayo" />        
        <Avatar.Image src="" />
      <Link><span className="absolute bottom-1 right-[1px] !text-sm"><FaCamera /></span></Link>
      </Avatar.Root>
      <div className="w-90 flex flex-col gap-2 !text-xs text-gray-400">
      <Text>Name:</Text>
      <Text>Email:</Text>
      </div>
      <div className="w-full h-[0.5px] bg-gray-700"></div>
      <BottomMenu />
    </div>
  );
};

export default page;
