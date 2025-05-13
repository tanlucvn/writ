import { sync } from "@/services";
import { useAppSettingsStore } from "@/store/app-settings-store";

export const setupAutoSync = ({
  userId,
  onStart,
  onSuccess,
  onError,
}: {
  userId: string;
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
}): (() => void) => {
  const { syncInterval } = useAppSettingsStore.getState();

  const intervalId = setInterval(async () => {
    try {
      onStart?.();
      await sync.syncWithTurso(userId);
      onSuccess?.();
    } catch (e) {
      onError?.(e);
    }
  }, syncInterval * 1000);

  return () => clearInterval(intervalId);
};
