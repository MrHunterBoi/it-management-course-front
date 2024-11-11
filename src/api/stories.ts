import { ApiPagination, ApiResponse } from '../types/api';
import { IStory } from '../types/story';
import { transformToQuery } from '../utils/query';
import { fetchApi, handleError } from './api';

interface StoriesResponse {
  page: ApiPagination;
  stories: IStory[];
}

export const getStories = async (
  query?: Record<string, string>
): Promise<ApiResponse<StoriesResponse> | undefined> => {
  try {
    const res = await fetchApi(`/stories/all?${query ? transformToQuery(query) : ''}`, {
      method: 'GET',
    });

    return res.data;
  } catch (e) {
    handleError(e);
  }
};
