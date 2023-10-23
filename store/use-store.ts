import { create } from 'zustand';

export const useSearchHistoryStore: any = create((set: any) => ({
  booksHistory: [],
  authorsHistory: [],
  setBooksHistory: (param: any) => {
    set((state: any) => ({
      booksHistory: state.booksHistory.concat(param),
    }));
  },
  setAuthorsHistory: (param: any) => {
    set((state: any) => ({
      authorsHistory: [...state.authorsHistory.concat(param)],
    }));
  },
  resetBooksHistory: () => set({ booksHistory: [] }),
  resetAuthorsHistory: () => set({ authorsHistory: [] }),
  resetAllSearchHistory: () =>
    set({
      booksHistory: [],
      authorsHistory: [],
    }),
}));
