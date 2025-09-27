"use client";
import { useState, useEffect } from "react";
import { Heading, Button, Input, Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthContext";
import { useLoading } from "../providers/LoadingProvider";

const Page = () => {
  const { signInUser, session, loading: authLoading } = useAuth();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  /* const [error, setError] = useState<string | null>(null); */
  const { setLoading: pageLoading } = useLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page refresh
    setLoading(true);

    const { success, error: signInError } = await signInUser(email, password);

    setLoading(false);

    if (signInError) {
      /* setError(signInError); */
      return;
    }
    if (success) {
      router.push("/Dashboard"); // redirect after login
    }
  };

  // If already logged in, skip sign in page
  useEffect(() => {
    if (!authLoading && session) {
      router.push("/Dashboard");
    }
  }, [session, authLoading, router]);

  return (
    <div className="w-[90%] h-full flex flex-col items-center !m-auto gap-8 !mt-16">
      <Heading>Signin to your account</Heading>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
        <div className="w-full flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Eg.saptarshi@example.com"
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
          />
          <Link className="!text-gray-400 !text-[10px] !mt-[-8px] !ml-2">
            Forgot Password?
          </Link>
        </div>
        <div className="w-full flex flex-col gap-4">
          <Button
            type="submit"
            loading={loading}
            variant={"solid"}
            colorPalette={"teal"}
          >
            Sign In
          </Button>
          <Button variant={"solid"}>Sign In with Gmail</Button>
        </div>
      </form>
      <div className="flex gap-2 text-gray-400">
        <p>{"Don't have an account?"}</p>
        <Link
          color={"teal.300"}
          _hover={{ color: "teal.400" }}
          onClick={() => {
            router.push("/SignUp");
            pageLoading(true);
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Page;
