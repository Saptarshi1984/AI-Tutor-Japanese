"use client";

import { Drawer, Portal, CloseButton, Button, Heading } from "@chakra-ui/react";
import { supabase } from "@/app/config";
import { RefObject, useState, MouseEvent, useEffect } from "react";
import { useSlider } from "@/app/providers/SliderContext";
import { useAuth } from "@/app/providers/AuthContext";
import { useRouter } from "next/navigation";
import { useLoading } from "@/app/providers/LoadingProvider";

type SliderProps = {
  containerRef: RefObject<HTMLDivElement | null>;
};

const Slider = ({ containerRef }: SliderProps) => {
  const { signOutUser, session } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("Not given");
  const { isOpen, closeSlider } = useSlider();
  const { setLoading } = useLoading();

  const r = useRouter();

  const handleSignOut = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { success, error } = await signOutUser();
    if (success) {
      //navigate to sign-in page
      closeSlider();
      setLoading(true);
      r.push("/SignIn");
    } else {
      setError(error || "An unexpected error occurred.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return;

      const { data, error } = await supabase
        .from("user_profiles")
        .select("username, avatar_url")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setUsername(data.username || "Guest");
      }
    };

    fetchProfile();
  }, [session]);

  if (!session) return null;

  return (
    <Drawer.Root open={isOpen} placement="start">
      {containerRef.current && (
        <Portal container={containerRef}>
          <Drawer.Backdrop pos="absolute" boxSize="full" />
          <Drawer.Positioner pos="absolute" boxSize="full">
            <Drawer.Content
              bg="gray.800"
              maxW="80%"
              h="100%"
              boxShadow="lg"
              borderRight="1px solid #4A5568"
            >
              <Drawer.Header display="flex" justifyContent="space-between">
                <Drawer.Title color="white">Menu</Drawer.Title>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" onClick={closeSlider} />
                </Drawer.CloseTrigger>
              </Drawer.Header>
              <Drawer.Body>
                <Heading>{username}</Heading>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  colorPalette={"red"}
                  colorScheme="red"
                >
                  Sign Out
                </Button>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      )}
    </Drawer.Root>
  );
};

export default Slider;
