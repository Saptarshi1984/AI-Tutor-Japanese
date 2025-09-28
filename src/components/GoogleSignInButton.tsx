"use client";

import { forwardRef } from "react";
import { Button } from "@chakra-ui/react";
import type { ButtonProps } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export type GoogleSignInButtonProps = Omit<ButtonProps, "children"> & {
  btnLabel?: string;
};

export const GoogleSignInButton = forwardRef<HTMLButtonElement, GoogleSignInButtonProps>(
  function GoogleSignInButton({ btnLabel = "Sign In with Google", ...props }, ref) {
    return (
      <Button
        ref={ref}
        color="gray.800"
        type="button"
        aria-label={btnLabel}
        variant="solid"
        gap="2"
        {...props}
      >
        <FcGoogle size="1.5rem" />
        {btnLabel}
      </Button>
    );
  },
);
