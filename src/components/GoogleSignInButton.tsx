"use client";

import { forwardRef } from "react";
import { IconButton } from "@chakra-ui/react";
import type { IconButtonProps } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export type GoogleSignInButtonProps = Omit<IconButtonProps, "aria-label" | "children">;

export const GoogleSignInButton = forwardRef<HTMLButtonElement, GoogleSignInButtonProps>(
  function GoogleSignInButton(props, ref) {
    return (
      <IconButton
        ref={ref}
        aria-label="Sign in with Google"
        variant="outline"
        borderColor="gray.200"
        bg="white"
        _hover={{ bg: "gray.50" }}
        _active={{ bg: "gray.100" }}
        _icon={{ fontSize: "1.5rem" }}
        {...props}
      >
        <FcGoogle />
        <span className="text-gray-900">Sign In with Google</span>
      </IconButton>
    );
  },
);
