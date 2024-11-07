import { create } from 'zustand';
import { ITag } from '../types/tag';

interface IFilterStore {
  sortBy: string;
  sortType: string;
  genres: Set<number>;
  tags: Map<number, ITag>;
  search: string;
}

interface IFilterStoreActions {
  resetFilters: () => void;
  setSortBy: (sortBy: string) => void;
  setSortType: (sortType: string) => void;
  addGenre: (genreId: number) => void;
  removeGenre: (genreId: number) => void;
  addTag: (tag: ITag) => void;
  removeTag: (tag: ITag) => void;
  setSearch: (search: string) => void;
}

const defaultFilters = {
  sortBy: 'Popularity',
  sortType: 'Desc',
  genres: new Set<number>(),
  tags: new Map<number, ITag>(),
  search: '',
};

export const useFilterStore = create<IFilterStore & IFilterStoreActions>(set => ({
  ...defaultFilters,
  resetFilters: () => set(defaultFilters),
  setSortBy: (sortBy: string) => set({ sortBy }),
  setSortType: (sortType: string) => set({ sortType }),
  addGenre: (genreId: number) =>
    set(state => {
      const genres = new Set(state.genres);
      genres.add(genreId);

      return { genres };
    }),
  removeGenre: (genreId: number) =>
    set(state => {
      const genres = new Set(state.genres);
      genres.delete(genreId);

      return { genres };
    }),
  addTag: (tag: ITag) =>
    set(state => {
      const tags = new Map(state.tags);
      tags.set(tag.id, tag);

      return { tags };
    }),
  removeTag: (tag: ITag) =>
    set(state => {
      const tags = new Map(state.tags);
      tags.delete(tag.id);

      return { tags };
    }),
  setSearch: (search: string) => set({ search }),
}));
