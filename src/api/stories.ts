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

export const getWriterStories = async (
  userId?: string
): Promise<ApiResponse<StoriesResponse> | undefined> => {
  try {
    const res = await fetchApi(
      `/stories/get_writer_stories${userId ? `?author_id=${userId}` : ''}`,
      {
        method: 'GET',
      }
    );

    return res.data;
  } catch (e) {
    handleError(e);
  }
};

export const getViewedStories = async (
  userId?: string
): Promise<ApiResponse<StoriesResponse> | undefined> => {
  try {
    const res = await fetchApi(`/stories/get_viewed${userId ? `?user=${userId}` : ''}`, {
      method: 'GET',
    });

    return res.data;
  } catch (e) {
    handleError(e);
  }
};

export const getLikedStories = async (
  userId?: string
): Promise<ApiResponse<StoriesResponse> | undefined> => {
  try {
    const res = await fetchApi(`/stories/get_liked${userId ? `?user=${userId}` : ''}`, {
      method: 'GET',
    });

    return res.data;
  } catch (e) {
    handleError(e);
  }
};
