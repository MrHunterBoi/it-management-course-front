import { ApiResponse } from '../types/api';
import { IUser } from '../types/user';
import { fetchApi, handleError } from './api';

interface SingleUserResponse {
  profile: IUser;
}

export const getCurrentUser = async (): Promise<ApiResponse<SingleUserResponse> | undefined> => {
  try {
    const res = await fetchApi('/auth/profile', {
      method: 'GET',
    });

    return res.data;
  } catch (e) {
    handleError(e);
  }
};
