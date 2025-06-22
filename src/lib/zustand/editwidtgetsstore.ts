import { create } from "zustand";

interface WidgetState {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}

export const useWidgetStore = create<WidgetState>()((set) => ({
  editMode: false,
  setEditMode: (editMode) => set({ editMode }),
}));
