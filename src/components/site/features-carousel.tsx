import { useScroll, useSpring } from "framer-motion";

import { motion, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";

const features = [
  { label: "Offline-first notes" },
  { label: "AI-powered writing", upcoming: true },
  { label: "Fast note search" },
  { label: "Trash & recovery" },
  { label: "Import & Export" },
  { label: "Dark & light mode" },
  { label: "Statistics" },
];

function Upcoming() {
  return (
    <span className="flex items-center rounded-lg border border-border bg-background px-2 py-1 font-mono font-normal text-base text-foreground uppercase tracking-wide">
      Upcoming
    </span>
  );
}

function Item({ children }: { children: ReactNode }) {
  return (
    <li className="item relative flex items-center gap-3 whitespace-nowrap py-2 text-left font-serif text-3xl text-foreground md:text-5xl">
      {children}
    </li>
  );
}

export default function FeaturesCarousel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const offset = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const springOffset = useSpring(offset, {
    damping: 40,
    stiffness: 100,
  });

  const x = useTransform(springOffset, (v) => `${v}%`);
  const xReverse = useTransform(springOffset, (v) => `${-v}%`);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="font-bold font-mono text-foreground text-sm tracking-wide">
        Features
      </h1>
      <div
        className="relative w-[min(1024px,100vw)] overflow-hidden [mask-image:linear-gradient(90deg,transparent,black,transparent)]"
        ref={ref}
      >
        <div className="track flex justify-center">
          <motion.ul className="items flex flex-nowrap gap-12" style={{ x }}>
            {features.map((feature) => (
              <Item key={feature.label}>
                {feature.label} {feature.upcoming && <Upcoming />}
              </Item>
            ))}
          </motion.ul>
        </div>
        <div className="track flex justify-center">
          <motion.ul
            className="items flex flex-nowrap gap-12"
            style={{ x: xReverse }}
          >
            {features.map((feature) => (
              <Item key={feature.label}>
                {feature.label} {feature.upcoming && <Upcoming />}
              </Item>
            ))}
          </motion.ul>
        </div>
      </div>
    </div>
  );
}
