"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";


export default function GoogleLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        // After Google redirects back to backend, Better Auth will redirect here
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google Sign-In Failed", {
        description: "Could not connect to Google. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      className="w-full relative py-6 border-border bg-background hover:bg-accent transition-colors group"
      onClick={handleGoogleLogin}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <svg className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
        </svg>
      )}
      {isLoading ? "Connecting to Google..." : "Sign in with Google"}
    </Button>
  );
}
