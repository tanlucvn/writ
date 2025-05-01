import { syncDexieToSupabase } from "@/services/sync";
import { useAppSettingsStore } from "@/store/app-settings-store";

export const setupAutoSync = ({
  onStart,
  onSuccess,
  onError,
}: {
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
}): (() => void) => {
  const { syncInterval } = useAppSettingsStore.getState();

  const intervalId = setInterval(
    async () => {
      try {
        onStart?.();
        await syncDexieToSupabase();
        onSuccess?.();
      } catch (e) {
        onError?.(e);
      }
    },
    syncInterval * 60 * 1000,
  );

  return () => clearInterval(intervalId);
};
