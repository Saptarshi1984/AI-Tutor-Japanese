"use client";
import React, { useEffect, useState} from "react";
import { Heading } from "@chakra-ui/react";
import { supabase } from "@/app/config";
import { useAuth } from "../providers/AuthContext";
import { useRouter } from "next/navigation";
import MCQ from "@/components/MCQ";


const Page = () => {
  const { session, loading } = useAuth();
  const router = useRouter();

  const [questions, setQuestions] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);



  //  Redirect to SignIn if no session
  useEffect(() => {
    if (!loading && !session) {
      router.push("/SignIn");
    }
  }, [session, loading, router]);

  //  Fetch data when session exists
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      const { data, error } = await supabase
        .from("japaneseleveltest")
        .select("mcq")
        .eq("level", "N5")
        .not("mcq", "is", null)
        .single();

      if (error) {
        console.error("Supabase error:", error.message);
        setError(error.message);
      } else {
        setQuestions(data?.mcq || []);
      }
      setFetching(false);
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  if (loading || fetching) return <p>Loading...</p>;
  if (!session) return null;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div      
      className="relative max-h-[834px] !mt-6 flex flex-col items-center"
    >
      <Heading>Japanese Level Test</Heading>
      <Heading>(MCQ - 20)</Heading>
      <MCQ data={questions} />      
    </div>
  );
};

export default Page;
