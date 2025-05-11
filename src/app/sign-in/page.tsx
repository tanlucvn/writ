"use client";

import { Container, Item } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTabStore } from "@/store/tab-store";
import { useSignIn } from "@clerk/nextjs";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SignInPage = () => {
  const { setTab } = useTabStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const redirectUrl = process.env.NEXT_PUBLIC_URL || window.location.origin;
  const { signIn } = useSignIn();

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn) {
      toast.error("Sign-in service is unavailable.");
      return;
    }

    setLoading(true);
    try {
      // Đăng nhập với email và password thông qua Clerk
      await signIn.create({
        identifier: email,
        password,
      });
      // Nếu thành công, chuyển hướng người dùng
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      toast.error("Sign in failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  /* const sendPasswordReset = async () => {
    if (!email) {
      return toast.error("Please enter your email to reset your password.");
    }

    if (!signIn) {
      toast.error("Sign-in service is unavailable.");
      return;
    }

    try {
      // Gửi yêu cầu reset mật khẩu qua Clerk
      await signIn.requestPasswordReset({ email });
      toast.success("Password reset email sent.");
    } catch (error) {
      toast.error("Failed to send reset email. Please try again.");
    }
  }; */

  const signInWithOAuth = async (provider: "google" | "github") => {
    if (!signIn) {
      toast.error("Sign-in service is unavailable.");
      return;
    }

    setLoading(true);

    const redirectUrl = process.env.NEXT_PUBLIC_URL || window.location.origin;
    const redirectUrlComplete = `${redirectUrl}/callback`; // Đảm bảo có route callback

    try {
      // Đăng nhập với OAuth thông qua redirect
      await signIn.authenticateWithRedirect({
        redirectUrl, // URL hoàn thành quy trình OAuth (route callback)
        redirectUrlComplete, // URL hoàn thành OAuth, nơi bạn muốn chuyển hướng sau khi đăng nhập thành công
        strategy: `oauth_${provider}`, // 'oauth_google' hoặc 'oauth_github'
      });
    } catch (error) {
      console.error(error);
      toast.error(`Sign in with ${provider} failed.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mx-auto max-w-md px-4 py-20 text-center">
      <Item>
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
              // onClick={sendPasswordReset}
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
      </Item>
    </Container>
  );
};

export default SignInPage;
