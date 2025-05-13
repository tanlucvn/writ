import { motion } from "framer-motion";

const WritingSessionProgressBar = ({
  remainingTime,
}: { remainingTime: number }) => {
  return (
    <div className="h-[2px] w-full max-w-xs rounded-full bg-muted-foreground">
      <motion.div
        className="h-full bg-primary"
        initial={{ width: "100%" }}
        animate={{
          width: "0%",
          transition: {
            duration: remainingTime,
            ease: "linear",
          },
        }}
      />
    </div>
  );
};

export default WritingSessionProgressBar;
