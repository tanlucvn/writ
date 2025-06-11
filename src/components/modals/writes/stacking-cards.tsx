"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

export type CardData = {
  id: string;
  title: string;
  description?: string;
};

interface StackingCardsProps {
  cards: CardData[];
  onSelect?: (id: string) => void;
}

export function StackingCards({ cards, onSelect }: StackingCardsProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Khi collapsed, offset nhỏ, chồng lên nhau
  // Khi expanded, offset lớn, xếp thẳng hàng

  return (
    <div className="relative mx-auto w-full max-w-md select-none">
      {cards.map((card, index) => {
        const isActive = card.id === activeId;
        // offset theo state
        const offsetY = expanded ? index * 120 : index * 8;
        return (
          <motion.div
            key={card.id}
            onClick={() => {
              if (!expanded && index === 0) {
                // Chỉ click card đầu để toggle expand
                setExpanded(true);
              } else if (expanded) {
                setActiveId(card.id);
                onSelect?.(card.id);
              }
            }}
            layout
            initial={false}
            animate={{
              top: offsetY,
              scale: isActive ? 1.05 : 1,
              boxShadow: isActive
                ? "0 10px 20px rgba(0,0,0,0.2)"
                : "0 2px 8px rgba(0,0,0,0.1)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "absolute w-full cursor-pointer rounded-2xl border bg-white p-4 dark:bg-muted",
              isActive ? "z-30 border-primary" : "z-10 border-muted",
            )}
            style={{ zIndex: isActive ? 999 : index }}
          >
            <h3 className="font-semibold text-lg">{card.title}</h3>
            {expanded && card.description && (
              <p className="mt-1 text-muted-foreground text-sm">
                {card.description}
              </p>
            )}
          </motion.div>
        );
      })}

      {/* Nút thu gọn khi đang expanded */}
      {expanded && <Button onClick={() => setExpanded(false)}>Collapse</Button>}
    </div>
  );
}
