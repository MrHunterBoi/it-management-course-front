import { SortBy } from "../types/sort";

export const transformToQuery = (queryObj: Record<string, string>) => {
  return Object.entries(queryObj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

export const serializedSortBy = {
  [SortBy.POPULARITY]: 'views_counter',
  [SortBy.DATE]: 'created',
  [SortBy.LIKES]: 'likes_count',
};