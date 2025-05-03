import { supabase } from "@/services";
import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  fetchSession: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => {
  // Setup real-time auth listener
  supabase.supabaseClient.auth.onAuthStateChange((_event, session) => {
    set({
      user: session?.user ?? null,
      session: session ?? null,
      isLoading: false,
    });
  });

  return {
    user: null,
    session: null,
    isLoading: true,

    fetchSession: async () => {
      const { data } = await supabase.supabaseClient.auth.getSession();
      set({
        user: data.session?.user ?? null,
        session: data.session ?? null,
        isLoading: false,
      });
    },

    logout: async () => {
      await supabase.supabaseClient.auth.signOut();
      set({ user: null, session: null });
    },
  };
});
