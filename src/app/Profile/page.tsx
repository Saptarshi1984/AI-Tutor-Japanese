"use client";
import { supabase } from "../config";
import { Avatar, Text, Link, Input, Button } from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../providers/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MouseEvent } from "react";

type UserProfile = {
  username?: string;
  email: string;
  avatar_url?: string;
  user_level?: string;
  created_at?: string;
};

const page = () => {
  const { session, loading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [username, setUsername] = useState(profile?.username || "");
  const [isSaving, setIsSaving] = useState(false);

  // Redirect to SignIn if no session
  useEffect(() => {
    if (!loading && !session) {
      router.push("/SignIn");
    }
  }, [session, loading, router]);

  useEffect(() => {
    if (session) {
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("username, email, avatar_url, user_level, created_at")
        .eq("id", session?.user.id)
        .single();

      console.log("Fetched profile data:", data);
      if (error) throw error;

      setProfile(data);
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  if (loading || !session) return <p>Loading...</p>;
  /* if (!session) return null; */

  const name = profile?.username || "Type your name";
  const email = profile?.email || "No email";
  const avatar = profile?.avatar_url || "";
  const level = profile?.user_level || "";
  const joined = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString()
    : "Unknown";

  const handleEdit = (e: MouseEvent) => {
    e.preventDefault();
    setDisabled(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSaving(true);
  try {
    const { error } = await supabase
      .from("user_profiles")
      .update({ username })
      .eq("id", session?.user.id);

    if (error) throw error;

    setDisabled(true); // lock input again
  } catch (err) {
    console.error("Failed to update profile:", err);
  } finally {
    setIsSaving(false);
  }
};

  

  return (
    <div className="w-full">
      <div className="w-full h-64 flex flex-col items-center justify-evenly !mt-10 gap-4">
        <Avatar.Root className="relative w-90" size={"2xl"}>
          <Avatar.Fallback name={name} />
          <Avatar.Image src={avatar} />
          <Link>
            <span className="absolute bottom-1 right-[1px] !text-sm">
              <FaCamera />
            </span>
          </Link>
        </Avatar.Root>
        <div className="relative w-90 flex flex-col gap-4 !text-xs text-gray-400">
          <div className="flex flex-row items-center gap-2">
            
            <form onSubmit={handleSubmit} className="relative w-full flex flex-col gap-4">
  <div className="flex flex-row items-center gap-2">
    <Text>Name:</Text>
    <Input
      size="xs"
      focusRingColor="teal.700"
      placeholder={name}
      disabled={disabled}
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <span
      onClick={handleEdit}
      className="cursor-pointer hover:text-teal-500"
    >
      <MdOutlineEdit />
    </span>
  </div>

  <Text>Email: {email}</Text>
  <Text>Joined on {joined}</Text>

  {!disabled && (
    <div className="absolute right-0 bottom-0">
      <Button
        type="submit"
        variant="outline"
        colorPalette="teal"
        size="xs"
        loading={isSaving}
      >
        Save
      </Button>
    </div>
  )}
</form>
          
        </div>
        <div className="w-full h-[0.5px] bg-gray-700"></div>
      </div>

      <div className="w-98 flex flex-col gap-6 items-center !mx-auto !mt-10 ">
        <div
          className="w-60 min-h-20 flex flex-col gap-2 items-center justify-center 
                      rounded-2xl !border-1 !border-gray-600"
        >
          <Text>Your Japanese Level</Text>
          {level === "" ? (
            <Link animation={"pulse"} color={"teal.400"} href="/JapLevelTest">
              Take a test here.
            </Link>
          ) : (
            level
          )}
        </div>
        <div className="w-100 flex flex-row justify-evenly">
          <div
            className="w-40 min-h-20 flex flex-col items-center justify-center 
                      rounded-2xl !border-1 !border-gray-600"
          >
            <Text>Total Score</Text>
          </div>
          <div
            className="w-40 min-h-20 flex flex-col items-center justify-center 
                      rounded-2xl !border-1 !border-gray-600"
          >
            <Text>Vocabulary</Text>
          </div>
        </div>
        <div
          className="w-60 min-h-20 flex flex-col items-center justify-center 
                      rounded-2xl !border-1 !border-gray-600"
        >
          <Text>Japanese Character</Text>
        </div>
      </div>
    </div>
    </div>
  );
};

export default page;
