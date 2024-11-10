import { create } from "zustand";
import { BASE_URL } from "../env";

type Building = {
  id: number;
  address?: string;
  architect?: string;
  description?: string;
  start_date?: string;
  name?: string;
};
interface BuildingsState {
  buildingData: Building | null;
  getBuildingData: (coords: { lat: string; lon: string }) => void;
  error: boolean;
  isLoading: boolean;
}

export const useBuildingsStore = create<BuildingsState>()((set) => ({
  buildingData: null,
  error: false,
  isLoading: false,
  //   increase: (by) => set((state) => ({ bears: state.bears + by })),
  getBuildingData: async (coords: { lat: string; lon: string }) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${BASE_URL}/buildings/information?lat=${coords.lat}&lon=${coords.lon}`
      );
      const data = await response.json();
      console.log(data);

      set({ buildingData: data });
    } catch (error) {
      set({ error: true, isLoading: false });
    }
  },
}));
