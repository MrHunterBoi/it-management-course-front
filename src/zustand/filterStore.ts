import { create } from 'zustand';

interface IFilterStore {
  sortBy: string;
  sortType: string;
  genres: number[];
  tags: number[];
  search: string;
}

interface IFilterStoreActions {
  resetFilters: () => void;
  setSortBy: (sortBy: string) => void;
  setSortType: (sortType: string) => void;
  addGenre: (genreId: number) => void;
  removeGenre: (genreId: number) => void;
  addTag: (tagId: number) => void;
  removeTag: (tagId: number) => void;
  setSearch: (search: string) => void;
}

const defaultFilters = {
  sortBy: 'Popularity',
  sortType: 'Desc',
  genres: [],
  tags: [],
  search: '',
};

export const useFilterStore = create<IFilterStore & IFilterStoreActions>(set => ({
  ...defaultFilters,
  resetFilters: () => set(defaultFilters),
  setSortBy: (sortBy: string) => set({ sortBy }),
  setSortType: (sortType: string) => set({ sortType }),
  addGenre: (genreId: number) => set(state => ({ genres: [...state.genres, genreId] })),
  removeGenre: (genreId: number) =>
    set(state => ({ genres: state.genres.filter(g => g !== genreId) })),
  addTag: (tagId: number) => set(state => ({ tags: [...state.tags, tagId] })),
  removeTag: (tagId: number) => set(state => ({ tags: state.tags.filter(t => t !== tagId) })),
  setSearch: (search: string) => set({ search }),
}));
