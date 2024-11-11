import { create } from 'zustand';
import { ApiPagination } from '../types/api';
import { IStory } from '../types/story';
import { ITag } from '../types/tag';
import { SortBy } from '../types/sort';

interface IStoryStore {
  sortBy: SortBy;
  sortType: string;
  genres: Set<number>;
  tags: Map<number, ITag>;
  search: string;
  isFetching: boolean;
  stories: IStory[];
  page: number;
  pagination: ApiPagination | null;
}

interface IStoryStoreActions {
  resetFilters: () => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortType: (sortType: string) => void;
  addGenre: (genreId: number) => void;
  removeGenre: (genreId: number) => void;
  addTag: (tag: ITag) => void;
  removeTag: (tag: ITag) => void;
  setSearch: (search: string) => void;
  setFetching: (isFetching: boolean) => void;
  setStories: (stories: IStory[]) => void;
  setPage: (page: number) => void;
  setPagination: (pagination: ApiPagination | null) => void;
}

const defaultFilters: IStoryStore = {
  sortBy: SortBy.POPULARITY,
  sortType: '-',
  genres: new Set<number>(),
  tags: new Map<number, ITag>(),
  search: '',
  isFetching: false,
  stories: [],
  page: 1,
  pagination: null,
};

export const useStoriesStore = create<IStoryStore & IStoryStoreActions>(set => ({
  ...defaultFilters,
  resetFilters: () => set(defaultFilters),
  setSortBy: (sortBy: SortBy) => set({ sortBy }),
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
  setFetching: (isFetching: boolean) => set({ isFetching }),
  setStories: (stories: IStory[]) => set({ stories }),
  setPage: (page: number) => set({ page }),
  setPagination: (pagination: ApiPagination | null) => set({ pagination }),
}));
