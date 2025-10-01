"use client";
import HomePage from "@/components/HomePage";
import { useEffect } from "react";
import { useAuth } from "./providers/AuthContext";
import { useRouter } from "next/navigation";


export default function Home() {
  const { session, loading } = useAuth();
  const route = useRouter()

  useEffect(() => {
    if (!loading && session) {
      route.push("/Dashboard"); 
    }
  }, [session, loading, route]);

  return (
    <main className="relative">
      <HomePage />
           
    </main>
  );
}
