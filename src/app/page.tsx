"use client";

import { useTabStore } from "@/store/tab-store";
import { AboutPage, PrivacyPage, SignInPage, WritesPage } from "@/views";

export default function Home() {
  const { tab } = useTabStore();

  return (
    <>
      {tab === "writes" && <WritesPage />}
      {tab === "about" && <AboutPage />}
      {tab === "privacy" && <PrivacyPage />}
      {tab === "signin" && <SignInPage />}
    </>
  );
}
