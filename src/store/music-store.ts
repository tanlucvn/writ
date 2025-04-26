import { create } from "zustand";

interface MusicStore {
  isPlaying: boolean;
  selectedStation: string;
  volume: number;
  isMounted: boolean;
  togglePlay: () => void;
  setStation: (url: string) => void;
  setVolume: (volume: number) => void;
  setMounted: (mounted: boolean) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  isPlaying: false,
  selectedStation: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
  volume: 0.5,
  isMounted: false,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setStation: (url) => set({ selectedStation: url }),
  setVolume: (volume) => set({ volume }),
  setMounted: (mounted) => set({ isMounted: mounted }),
}));
