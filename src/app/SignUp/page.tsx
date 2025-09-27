"use client";
import { useState, useEffect } from "react";
import { Heading, Button, Input, Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthContext";
import { useLoading } from "../providers/LoadingProvider";

const Page = () => {
  const { signUpUser, session, loading: authLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  /* const [error, setError] = useState<string | null>(null); */
  const {setLoading:pageLoading} = useLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page refresh
    setLoading(true);

    const { success, data,  error: signUpError } = await signUpUser(email, password);

    setLoading(false);

    if (signUpError) {
      /* setError(signUpError); */
      return;
    }
    if (success && data?.session ) {
      router.push("/Dashboard"); // redirect after login
      return null;
    }
    return null;
  };

  // If already logged in, skip sign in page
  useEffect(() => {
    if (!authLoading && session) {
      router.push("/Dashboard");
    }
  }, [session, authLoading, router]);
  

  return (
    <div className="w-[90%] h-full flex flex-col items-center !m-auto gap-8 !mt-16">
      <Heading>Signup for your account</Heading>
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
          
          
        </div>
        <div className="w-full flex flex-col gap-4">
          <Button type="submit" loading={loading} variant={"solid"} colorPalette={"teal"}>
            Sign Up
          </Button>
           <Button  variant={"solid"}>
          Sign Up with Gmail
        </Button>
        </div>        
      </form>
      <div className="flex gap-2 text-gray-400">
      <p>Already have an account?</p>
      <Link color={'teal.300'} _hover={{color:'teal.400'}} onClick={() => {router.push('/SignIn');pageLoading(true)}}>Sign In</Link> 
      </div>
           
    </div>
  );
};

export default Page;
