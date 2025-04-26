"use client";

import AboutPage from "@/pages/about";
import MainPage from "@/pages/main-page";
import PrivacyPage from "@/pages/privacy";
import { useTabStore } from "@/store/tab-store";

export default function Home() {
  const { tab } = useTabStore();

  return (
    <>
      {tab === "writes" && <MainPage />}
      {tab === "about" && <AboutPage />}
      {tab === "privacy" && <PrivacyPage />}
    </>
  );
}
