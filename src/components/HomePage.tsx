"use client";

import { useState, useEffect } from "react";
import { Heading, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthContext";

const HomePage = () => {
  const {session} = useAuth();
  const [loading, setloading] = useState<boolean>(false);
  const route = useRouter();


   useEffect(() => {
    if (session) {
      route.push("/Dashboard");
    }
  }, [session, route]);
 

  return (
    
    <div className="w-[90%] h-full flex flex-col items-center !m-auto gap-8">
      <Heading size={"2xl"}>
        <span className="!text-red-700">totemo</span>Japan
      </Heading>
      <Heading size={"3xl"} textAlign={"center"}>
        Unlock the World of Japanese Through Interactive AI Lessons
      </Heading>
      <Image
        className="rounded-xl"
        src="/linguaImage.png"
        width={300}
        height={300}
        alt="heroImage"
      />
      <p className="w-[90%] hyphens-auto !text-[13px] !font-bold text-cyan-600">
        Embark on a personalized journey with AI powered feedback and engaging
        excercises.
      </p>
      <Button
        onClick={() => {
          setloading(true);
          route.push("/SignIn");
        }}
        loading={loading}
        variant={"solid"}
        colorPalette={"teal"}
      >
        Lets Get Started
      </Button>
    </div>
    
  );
};

export default HomePage;
