"use client";
import { useState, useActionState } from "react";
import { Heading, Button, Input, Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthContext";

const page = () => {
  const auth = useAuth();
  const route = useRouter();

  if (!auth) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  const { signInUser, session } = auth;

  const [loading, setLoading] = useState<boolean>(false);
  const [gmailLoading, setGmailLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setLoading(true);
    const { success, error: signInError } = await signInUser(email, password);
    setLoading(false);

    if (signInError) {
      setError(signInError);
      return;
    }
    if (success) {
      route.push("/Dashboard");
    }
  };

  if (session) {
    route.push("/Dashboard");
    return null;
  }

  return (
    <div className="w-[90%] h-full flex flex-col items-center !m-auto gap-8 !mt-16">
      <Heading>Signin to your account</Heading>
      <form action={handleSubmit} className="w-full flex flex-col gap-10">
        <div className="w-full flex flex-col gap-4">
          <Input
            onChange={(e) => e.target.value}
            type="email"
            name="email"
            required
            placeholder="Eg.saptarshi@example.com"
          />
          <Input
            onChange={(e) => e.target.value}
            type="password"
            name="password"
            required
            placeholder="password"
          />
          <Link className="!text-gray-400 !text-[10px] !mt-[-8px] !ml-2">
            Forgot Password?
          </Link>
        </div>
        <div className="w-full flex flex-col gap-4">
          <Button type="submit" loading={loading} variant={"solid"} colorPalette={"teal"}>
            Sign In
          </Button>
           <Button loading={gmailLoading} variant={"solid"}>
          Sign In with Gmail
        </Button>
        </div>        
      </form>      
    </div>
  );
};

export default page;
