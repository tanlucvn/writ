"use client";

import { cn } from "@/lib/utils"; // nếu bạn đang dùng shadcn/ui
import { type HTMLMotionProps, motion, useInView } from "framer-motion";
import { useRef } from "react";

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 18,
      mass: 1.1,
    },
  },
};

interface RevealOnScrollProps extends HTMLMotionProps<"div"> {
  delay?: number;
  once?: boolean;
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  once = true,
  ...props
}: RevealOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "0px 0px -20% 0px",
  });

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      transition={{ delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
