"use client";
import HomePage from "@/components/HomePage";
import { useEffect } from "react";
import { useAuth } from "./providers/AuthContext";
import { useRouter } from "next/navigation";
import BottomMenu from "@/components/BottomMenu";

export default function Home() {
  const { session, loading } = useAuth();
  const route = useRouter()

  useEffect(() => {
    if (!loading && session) {
      route.push("/Dashboard"); // 👈 must match your folder case
    }
  }, [session, loading, route]);

  return (
    <main className="relative w-[412px] h-[915px]">
      <HomePage />      
    </main>
  );
}
