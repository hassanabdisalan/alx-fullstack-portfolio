import { create } from "zustand";

type KanbanColumnDialogState = {
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  currentColumnId: string | null;
  setEditDialog: (isOpen: boolean, columnId?: string) => void;
  setDeleteDialog: (isOpen: boolean, columnId?: string) => void;
  openEditDialog: (columnId: string) => void;
  openDeleteDialog: (columnId: string) => void;
  closeEditDialog: () => void;
  closeDeleteDialog: () => void;
  closeAllDialogs: () => void;
};

export const useKanbanColumnDialogs = create<KanbanColumnDialogState>(
  (set) => ({
    isEditDialogOpen: false,
    isDeleteDialogOpen: false,
    currentColumnId: null,

    setEditDialog: (isOpen: boolean, columnId?: string) =>
      set((state) => ({
        isEditDialogOpen: isOpen,
        currentColumnId: isOpen
          ? columnId || state.currentColumnId
          : state.currentColumnId,
        isDeleteDialogOpen: isOpen ? false : state.isDeleteDialogOpen,
      })),

    setDeleteDialog: (isOpen: boolean, columnId?: string) =>
      set((state) => ({
        isDeleteDialogOpen: isOpen,
        currentColumnId: isOpen
          ? columnId || state.currentColumnId
          : state.currentColumnId,
        isEditDialogOpen: isOpen ? false : state.isEditDialogOpen,
      })),

    openEditDialog: (columnId: string) =>
      set({
        isEditDialogOpen: true,
        isDeleteDialogOpen: false,
        currentColumnId: columnId,
      }),

    openDeleteDialog: (columnId: string) =>
      set({
        isDeleteDialogOpen: true,
        isEditDialogOpen: false,
        currentColumnId: columnId,
      }),

    closeEditDialog: () =>
      set({
        isEditDialogOpen: false,
      }),

    closeDeleteDialog: () =>
      set({
        isDeleteDialogOpen: false,
      }),

    closeAllDialogs: () =>
      set({
        isEditDialogOpen: false,
        isDeleteDialogOpen: false,
        currentColumnId: null,
      }),
  }),
);
