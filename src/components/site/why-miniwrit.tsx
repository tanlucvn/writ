"use client";
import { Lock, PenLine, WifiOff } from "lucide-react";

const features = [
  {
    icon: <PenLine className="h-5 w-5 text-primary" />,
    title: "Minimal & Focused",
    description:
      "No toolbars, no clutter — just a clean space where your words come first. Miniwrit helps you focus on your thoughts.",
  },
  {
    icon: <WifiOff className="h-5 w-5 text-primary" />,
    title: "Offline-first",
    description:
      "Write anytime, even without internet. Your notes are saved locally and sync when you're back online.",
  },
  {
    icon: <Lock className="h-5 w-5 text-primary" />,
    title: "Open & Private",
    description:
      "Your data stays with you. Miniwrit is open-source, no accounts or tracking — just writing on your terms.",
  },
];

export default function WhyMiniwrit() {
  return (
    <section className="mt-32 w-full max-w-4xl px-4 text-center">
      <h2 className="mb-10 font-serif text-2xl md:text-3xl">Why Miniwrit?</h2>
      <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {feature.icon}
              <h3 className="font-medium text-lg">{feature.title}</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
