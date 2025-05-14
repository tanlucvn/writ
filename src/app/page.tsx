"use client";

import { useAppStore } from "@/store/app-store";
import { AboutPage, PrivacyPage, SignInPage, WritesPage } from "@/views";

export default function Home() {
  const { appTab } = useAppStore();

  return (
    <>
      {appTab === "writes" && <WritesPage />}
      {appTab === "about" && <AboutPage />}
      {appTab === "privacy" && <PrivacyPage />}
      {appTab === "signin" && <SignInPage />}
    </>
  );
}
