"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";

export function SidebarBanner() {
  const { signIn } = useSignIn();
  const [loading, setLoading] = useState(false);

  const signInWithOAuth = async (provider: "google" | "github") => {
    if (!signIn) {
      toast.error("Sign-in service is unavailable.");
      return;
    }

    setLoading(true);

    const redirectUrl = process.env.NEXT_PUBLIC_URL || window.location.origin;
    const redirectUrlComplete = `${redirectUrl}/`;

    try {
      await signIn.authenticateWithRedirect({
        redirectUrl,
        redirectUrlComplete,
        strategy: `oauth_${provider}`,
      });
    } catch (error) {
      console.error(error);
      toast.error(`Sign in with ${provider} failed.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="py-0 shadow-none">
      <form>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-base">Get more from Miniwrit</CardTitle>
          <CardDescription>
            Sign in to securely save your writing and sync across devices.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4">
          <Button
            className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
            size="sm"
            disabled={loading}
            onClick={() => signInWithOAuth("google")}
          >
            Continue with Google
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
