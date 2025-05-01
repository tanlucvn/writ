import { syncDexieToSupabase } from "@/services/sync";
import { useAppSettingsStore } from "@/store/app-settings-store";

export const setupAutoSync = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (e: unknown) => void;
}) => {
  const { syncInterval } = useAppSettingsStore.getState();

  setInterval(
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
};
