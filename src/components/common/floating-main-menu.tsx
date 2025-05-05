"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MainMenu from "./main-menu";

const FloatingMainMenu = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Delay toggle to reduce flicker
      timeoutRef.current = setTimeout(() => {
        setVisible(currentY < lastScrollY.current || currentY < 50);
        lastScrollY.current = currentY;
      }, 100); // Debounce delay
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 50 }}
      transition={{ duration: 0.3 }}
      className="-translate-x-1/2 fixed bottom-14 left-1/2 z-10"
    >
      <MainMenu />
    </motion.div>
  );
};

export default FloatingMainMenu;
