"use client";

import { useEffect } from "react";
import { Heading, Text } from "@chakra-ui/react";
import { PiBooksLight } from "react-icons/pi";
import { useHandleRedirect } from "@/utils/helpers";
import { useAuth } from "../providers/AuthContext";
import { useRouter } from "next/navigation";


const Page = () => {
  const { handleClickToRedirect } = useHandleRedirect();
  const { session, loading } = useAuth();
  const router = useRouter();

  // Redirect to SignIn if no session
  useEffect(() => {
    if (!loading && !session) {
      router.push("/SignIn");
    }
  }, [session, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!session) return null; // hide content until redirect

  return (
    <div className="flex flex-col gap-8 !mt-20">
      <Heading className="!ml-6">Lessons</Heading>
      <div className="w-92 flex flex-col gap-6 !m-auto">
        <Heading>{"Beginner's Basics"}</Heading>

        <div
          onClick={() => handleClickToRedirect("/LearnCharacter")}
          className="flex flex-row gap-4 items-center !p-2 cursor-pointer rounded-xl hover:bg-[#1a3232]"
        >
          <div className="!text-3xl !p-2 text-gray-400 bg-gray-700 rounded-xl">
            <PiBooksLight />
          </div>
          <div>
            <Heading className="text-gray-300">Japanese Character</Heading>
            <Text className="text-cyan-600">
              Learn Hiragana, Katakana and Kanji.
            </Text>
          </div>
        </div>

        <div
          onClick={() => handleClickToRedirect("")}
          className="flex flex-row gap-4 items-center !p-2 cursor-pointer rounded-xl hover:bg-[#1a3232]"
        >
          <div className="!text-3xl !p-2 text-gray-400 bg-gray-700 rounded-xl">
            <PiBooksLight />
          </div>
          <div>
            <Heading className="text-gray-300">Vocabulary</Heading>
            <Text className="text-cyan-600">
              Learn basic intrductory phrases.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
