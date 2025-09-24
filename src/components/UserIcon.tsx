"use client";
import { useState, useEffect } from "react";
import { Avatar } from "@chakra-ui/react";
import { useAuth } from "@/app/providers/AuthContext";
import { supabase } from "@/app/config";

const UserIcon = () => {
  const { session } = useAuth();
  const [username, setUsername] = useState("Guest");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return;

      const { data, error } = await supabase
        .from("user_profiles")
        .select("username, avatar_url")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setUsername(data.username || "Guest");
        setAvatarUrl(data.avatar_url || "");
      }
    };

    fetchProfile();
  }, [session, avatarUrl]);

  if (!session) return null;

  return (
    <div className="cursor-pointer">
      <Avatar.Root>
        <Avatar.Fallback name={username} />
        {avatarUrl && <Avatar.Image src={avatarUrl} />}
        
      </Avatar.Root>
    </div>
  );
};

export default UserIcon;
