import { syncDexieToSupabase } from "@/services/sync";
import { useAppSettingsStore } from "@/store/app-settings-store";

export const setupAutoSync = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
}): (() => void) => {
  const { syncInterval } = useAppSettingsStore.getState();

  const intervalId = setInterval(
    async () => {
      try {
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
