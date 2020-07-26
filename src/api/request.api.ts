import * as http from './http.api';

import { urls } from './api.url';
import { ProfilePayload } from 'auth/auth.types';

export const signWithGoogle = (token: string | null) => {
  return http.get(`/auth/google/${token}`);
};

export const restaurantLogin = (payload: { email: string; password: string }) => {
  return http.post(urls.auth.SIGN_IN, payload);
};

export const logout = () => {
  return http.get(urls.auth.SIGN_OUT);
};

export const registerRestaurant = (payload: { name: string; email: string; password: string }) => {
  return http.post(`/auth/users`, payload);
};

export const refreshAccessToken = (payload: { referenceToken: string }) => {
  return http.post(urls.auth.TOKEN, payload);
};

export const completeSignup = (payload: Partial<ProfilePayload>) => {
  return http.post(urls.auth.COMPLETE_SIGNUP, payload);
};

export const getProfile = () => {
  return http.get(urls.auth.PROFILE);
};

export const addCategory = (payload: FormData) => {
  return http.post(urls.food.CATEGORY, payload);
};

export const getCategories = () => {
  return http.get(urls.food.CATEGORY);
};

export const getMenus = () => {
  return http.get(urls.food.MENU);
};

export const postMenu = (payload: FormData) => {
  return http.post(urls.food.MENU, payload);
};
