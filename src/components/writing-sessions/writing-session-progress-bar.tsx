import { useWritingSessionsStore } from "@/store/writing-sessions-store";
import { motion } from "framer-motion";

const WritingSessionProgressBar = ({
  remainingTime,
}: { remainingTime: number }) => {
  const { currentSession } = useWritingSessionsStore();

  if (!currentSession?.duration) return null;

  const totalSeconds = currentSession.duration * 60;
  const percentage = (remainingTime / totalSeconds) * 100;

  return (
    <div className="h-[2px] w-full overflow-hidden rounded-full bg-border">
      <motion.div
        className="h-full bg-primary"
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

export default WritingSessionProgressBar;
