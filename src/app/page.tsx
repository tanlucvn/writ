"use client";

import FeaturesCarousel from "@/components/site/features-carousel";
import Footer from "@/components/site/footer";
import Heading from "@/components/site/heading";
import Hero from "@/components/site/hero";
import "@/styles/site.css";

export default function Home() {
  return (
    <div className="flex min-h-screen max-w-[100vw] flex-col overflow-hidden">
      <div className="flex-1 flex-col items-center justify-between">
        <div className="lines-container">
          <div className="lines" />
        </div>

        <main className="relative z-10 my-auto flex flex-col items-center gap-[150px] text-center md:gap-[200px]">
          <Heading className="pt-[150px]" />
          <Hero />
          <FeaturesCarousel />
        </main>
      </div>
      <div className="z-10 mt-[200px] flex w-full items-center justify-center px-5 py-8 lg:px-0">
        <Footer />
      </div>
    </div>
  );
}
