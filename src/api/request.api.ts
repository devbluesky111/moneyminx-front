import * as http from './http.api';

import { urls } from './api.url';
import { RegisterPayload } from 'auth/auth.types';

export const postLogin = (payload: { email: string; password: string }) => {
  return http.post(urls.auth.LOGIN_IN, payload);
};

export const postRegister = (payload: RegisterPayload) => {
  return http.post(urls.auth.LOGIN_IN, payload);
};

export const refreshAccessToken = ({ referenceToken }: { referenceToken: string }): Promise<any> => {
  return Promise.resolve({ referenceToken });
};
