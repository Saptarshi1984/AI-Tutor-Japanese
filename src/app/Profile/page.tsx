"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import { supabase } from "../config";
import { Avatar, Text, Link, Input, Button } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { FaCamera } from "react-icons/fa";
import { useAuth } from "../providers/AuthContext";
import { useRouter } from "next/navigation";
import { MdOutlineEdit } from "react-icons/md";

type UserProfile = {
  username?: string;
  email: string;
  avatar_url?: string;
  user_level?: string;
  created_at?: string;
};

const Page = () => {
  const { session, loading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [username, setUsername] = useState(profile?.username || "");
  const [isSaving, setIsSaving] = useState(false);
  const [latestLevel, setLatestLevel] = useState<string>("");
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Redirect to SignIn if no session
  useEffect(() => {
    if (!loading && !session) {
      router.push("/SignIn");
    }
  }, [session, loading, router]);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchLatestLevel = async () => {
      // If you want the latest across ALL tests:
      const { data, error } = await supabase
        .from("user_test_results")
        .select("awarded_level, test_name, attempt_no, created_at")
        .eq("user_id", session.user.id)
        // .eq("test_name", "JLPT N5 MCQ") // ← uncomment if you want a specific test
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(); // returns null if no rows

      if (error) {
        console.error("Error fetching latest level:", error.message);
        return;
      }

      if (data?.awarded_level) {
        setLatestLevel(data.awarded_level);
      } else {
        setLatestLevel("Not tested yet");
      }
    };

    fetchLatestLevel();
  }, [session]);

 useEffect(() => {
  if (!session?.user?.id) return;

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("username, email, avatar_url, user_level, created_at")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error("Error getting user data:", err);
    }
  };

  fetchUserData(); 
}, [session?.user?.id]);




  if (loading || !session) return <p>Loading...</p>;
  /* if (!session) return null; */

  const name = profile?.username || "Type your name";
  const email = profile?.email || "No email";
  const avatar = profile?.avatar_url || "";
  /* const level = profile?.user_level || ""; */
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

  const onClickCamera = () => {
    inputRef.current?.click();
  };

 const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file || !session?.user?.id) return;

  if (!file.type.startsWith("image/")) {
    toaster.create({ type: "error", title: "Please select an image file" });
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    toaster.create({ type: "error", title: "Max size is 2MB" });
    return;
  }

  
  try {
    const userId = session.user.id;
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `avatar/${userId}/${Date.now()}.${ext}`;

    // 1) Upload
    const { error: uploadError } = await supabase.storage
      .from("user_avatars")
      .upload(path, file, {
        cacheControl: "3600",
        contentType: file.type,
        /* upsert: true, // requires UPDATE policy */
      });

    if (uploadError) {
      console.error("[UPLOAD ERROR]", uploadError.message);
      toaster.create({ type: "error", title: "Upload failed", description: uploadError.message });
      return;
    }

    // 2) Public URL (no error returned here)
    const { data: pub } = supabase.storage
      .from("user_avatars")
      .getPublicUrl(path);

    const publicUrl = pub.publicUrl;

    // 3) Update profile
    const { error: updateError } = await supabase
      .from("user_profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", userId);

    if (updateError) {
      console.error("[PROFILE UPDATE ERROR]", updateError.message);
      toaster.create({ type: "error", title: "Profile update failed", description: updateError.message });
      return;
    }

    // 4) Update UI
    setProfile(prev => (prev ? { ...prev, avatar_url: publicUrl } : prev));
    toaster.create({ type: "success", title: "Profile image updated" });
  } catch (error) {
    console.error("[UNEXPECTED]", error);
    toaster.create({ type: "error", title: "Unexpected error", description: error ??  "Try again" });
  } finally {
    
    if (inputRef.current) inputRef.current.value = "";
  }
};



  return (
    <div className="w-full">
      <Toaster />
      <div className="w-full h-64 flex flex-col items-center justify-evenly !mt-10 gap-4">
        <Avatar.Root className="relative w-90" size={"2xl"}>
          {avatar ? (
            <Avatar.Image src={avatar} />
          ) : (
            <Avatar.Fallback name={name} />
          )}
          <Link onClick={onClickCamera} aria-label="Change profile photo">
            <span className="absolute bottom-1 right-[1px] !text-sm">
              <FaCamera />
            </span>
          </Link>
        </Avatar.Root>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileSelected}
        />
        <div className="relative w-90 flex flex-col gap-4 !text-xs text-gray-400">
          <div className="flex flex-row items-center gap-2">
            <form
              onSubmit={handleSubmit}
              className="relative w-full flex flex-col gap-4"
            >
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
            {latestLevel === "" ? (
              <Link animation={"pulse"} color={"teal.400"} href="/JapLevelTest">
                Take a test here.
              </Link>
            ) : (
              <Text fontSize={"lg"} color={"teal.400"} fontWeight={"bold"}>
                {latestLevel}
              </Text>
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
        <div
            className="w-60 min-h-20 flex flex-col items-center justify-center 
                      rounded-2xl !border-1 !border-gray-600"
          >
            <Text>Global Rankings</Text>
          </div>
      </div>
    </div>
  );
};

export default Page;
