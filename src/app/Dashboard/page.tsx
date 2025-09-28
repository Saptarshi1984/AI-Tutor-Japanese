"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthContext";
import { Heading } from "@chakra-ui/react";
import LessonCard from "@/components/LessonCard";


const Page = () => {
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
    <div className="w-full flex flex-col !mt-20">
      <Heading className="!mb-4 !ml-6">Quick Access</Heading>
      <div className="flex flex-col gap-6">
        <LessonCard
          url={"/JapLevelTest"}
          header="Take an Assessment Test"
          text="Assess your current Japanese Proficiency"
          btnText="Start"
        />
        <LessonCard
          url={"/AI"}
          header="Chat with the AI Agent"
          text="Ask AI agent for clear roadmap to learn Japanese."
          btnText="Start"
        />
        <LessonCard
          header="Build Vocabulary"
          text="Build solid vocabulary with common words."
          btnText="Start"
        />
        <LessonCard
          header="Learn Japanese Character"
          text="Learn Japanese character the fun way."
          btnText="Start"
        />
      </div>
    </div>
  );
};

export default Page;
