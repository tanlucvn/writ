import { create } from "zustand";

interface MusicStore {
  isPlaying: boolean;
  togglePlay: () => void;

  selectedStation: string;
  setStation: (url: string) => void;

  volume: number;
  setVolume: (volume: number) => void;

  isMounted: boolean;
  setMounted: (mounted: boolean) => void;

  customStations: { label: string; url: string }[];
  addCustomStation: (label: string, url: string) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  isPlaying: false,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  selectedStation: "https://www.youtube.com/watch?v=FjHGZj2IjBk",
  setStation: (url) => set({ selectedStation: url }),

  volume: 0.5,
  setVolume: (volume) => set({ volume }),

  isMounted: false,
  setMounted: (mounted) => set({ isMounted: mounted }),

  customStations: [],
  addCustomStation: (label, url) =>
    set((state) => ({
      customStations: [...state.customStations, { label, url }],
    })),
}));
