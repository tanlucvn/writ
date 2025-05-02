"use client";

import * as FadeIn from "@/components/motion/fade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/services/supabase";
import { useTabStore } from "@/store/tab-store";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SignInPage() {
  const { setTab } = useTabStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectUrl = process.env.NEXT_PUBLIC_URL || window.location.origin;

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Sign in failed. Please check your credentials.");
    } else {
      window.location.href = "/";
    }

    setLoading(false);
  };

  const sendPasswordReset = async () => {
    if (!email) {
      return toast.error("Please enter your email to reset your password.");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      toast.error("Failed to send reset email. Please try again.");
    } else {
      toast.success("Password reset email sent.");
    }
  };

  const signInWithOAuth = async (provider: "google" | "github") => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      toast.error(`Sign in with ${provider} failed.`);
      setLoading(false);
    }
  };

  return (
    <FadeIn.Container className="mx-auto max-w-md px-4 py-20 text-center">
      <FadeIn.Item>
        <h1 className="mb-4 font-semibold text-2xl">Sign in to Miniwrit</h1>
        <p className="mb-8 text-muted-foreground text-sm leading-relaxed">
          Welcome back. Please enter your credentials.
        </p>

        <div className="space-y-4">
          <Button
            variant="secondary"
            size="sm"
            className="w-full outline-double outline-2 outline-border outline-offset-2"
            onClick={() => signInWithOAuth("google")}
          >
            Sign in with Google
          </Button>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-xs">or</span>
            <Separator className="flex-1" />
          </div>
          <form onSubmit={signInWithEmail}>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="w-full outline-double outline-2 outline-primary outline-offset-2"
                disabled={loading}
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-muted-foreground text-xs">
          <p>
            Forgot your password?{" "}
            <span
              className="font-medium text-foreground underline underline-offset-4"
              onClick={sendPasswordReset}
            >
              Reset it here
            </span>
          </p>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setTab("writes")}
            className="mt-8 h-6 text-xs outline-double outline-2 outline-border outline-offset-2"
          >
            <ArrowLeftIcon className="mr-1 h-4 w-4" />
            Back
          </Button>
        </div>
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
