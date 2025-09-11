'use client'
import { Avatar, Text, Link } from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import { useAuth } from "../providers/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
   const { session, loading } = useAuth();
    const router = useRouter();
  
    // Redirect to SignIn if no session
    useEffect(() => {
      if (!loading && !session) {
        router.push("/SignIn");
      }
    }, [session, loading, router]);
  
    if (loading) return <p>Loading...</p>;
    if (!session) return null;

  return (
    <div className="w-full">
      <div className="w-full h-50 flex flex-col items-center justify-evenly !mt-10 gap-4">
        <Avatar.Root className="relative w-90" size={"2xl"}>
          <Avatar.Fallback name="Segun Adebayo" />
          {/* <Avatar.Image src="" /> */}
          <Link>
            <span className="absolute bottom-1 right-[1px] !text-sm">
              <FaCamera />
            </span>
          </Link>
        </Avatar.Root>
        <div className="w-90 flex flex-col gap-2 !text-xs text-gray-400">
          <Text>Name:</Text>
          <Text>Email:</Text>
          <Text>Joined</Text>
        </div>
        <div className="w-full h-[0.5px] bg-gray-700"></div>
      </div>

      <div className="w-98 flex flex-col gap-4 items-center !mx-auto !mt-10 ">
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
    </div>
  );
};

export default page;
