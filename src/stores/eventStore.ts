import { create } from 'zustand';

interface EventState {
  currentPage: number;
  totalPages: number;
  searchKeyword: string;
  sortOption: string;
  setCurrentPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  setSearchKeyword: (keyword: string) => void;
  setSortOption: (option: string) => void;
}

export const useEventStore = create<EventState>((set) => ({
  currentPage: 1,
  totalPages: 1,
  searchKeyword: '',
  sortOption: 'relevance,desc',
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (total) => set({ totalPages: total }),
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  setSortOption: (option) => set({ sortOption: option }),
}));