"use client";
import { Avatar } from "@chakra-ui/react";
import { useAuth } from "@/app/providers/AuthContext";



const UserIcon = () => {

  const {session} = useAuth();
  if(!session) return null;  
  

  return (
    <div className="cursor-pointer">
      <Avatar.Root>
        <Avatar.Fallback name='Guest'/>
        <Avatar.Image src=''/>
      </Avatar.Root>
    </div>
  );
};

export default UserIcon;
