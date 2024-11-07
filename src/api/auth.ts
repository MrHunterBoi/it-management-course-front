import { ISigninFormValues, ISignupFormValues } from '../types/api';
import { fetchApi } from './api';

export const signUp = (data: ISignupFormValues) => {
  return fetchApi('/auth/signup', {
    method: 'POST',
    data,
  });
};

export const signIn = (data: ISigninFormValues) => {
  return fetchApi('/auth/signin', {
    method: 'POST',
    data,
  });
};
