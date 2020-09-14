import { ApiResponse } from 'app/app.types';
import { EmailSubscriptionPayload } from 'setting/setting.type';
import { RegisterPayload, ResetPasswordPayload } from 'auth/auth.types';

import { urls } from './api.url';
import * as http from './http.api';

export const postLogin = (payload: { email: string; password: string }) => {
  return http.post(urls.auth.LOGIN_IN, payload);
};

export const postFacebookLogin = (payload: {
  accessToken: string;
  mailChimpSubscription: boolean;
  subscriptionPriceId: string;
}): Promise<ApiResponse> => {
  return http.post(`${urls.auth.FACEBOOK_LOGIN}?access_token=${payload.accessToken}`, {
    subscriptionPriceId: payload.subscriptionPriceId,
    mailChimpSubscription: payload.mailChimpSubscription,
  });
};

export const postRegister = (payload: RegisterPayload) => {
  return http.post(urls.auth.REGISTER, payload);
};

export const postFacebookAssociation = (token: string) => {
  return http.post(urls.auth.ASSOCIATE_LOGIN, {}, false, { access_token: token });
};

export const postForgotPassword = (email: string): Promise<ApiResponse> => {
  return http.post(urls.auth.FORGOT_PASSWORD, { email }, false);
};

export const postResetPassword = (payload: ResetPasswordPayload): Promise<ApiResponse> => {
  return http.post(urls.auth.RESET_PASSWORD, payload, false);
};

export const getSubscription = () => {
  return http.get(urls.subscription.SUB);
};

export const getFastlink = () => {
  return http.get(urls.yodlee.FAST_LINK);
};

export const getRefreshedAccount = () => {
  return http.get(urls.auth.PROFILE_REFRESH);
};

export const refreshAccessToken = ({ referenceToken }: { referenceToken: string }): Promise<any> => {
  return Promise.resolve({ referenceToken });
};

export const getCurrentSettings = () => {
  return http.get(urls.auth.SETTINGS);
};

export const patchEmailSubscription = (payload: EmailSubscriptionPayload): Promise<ApiResponse> => {
  return http.patch(urls.auth.SETTINGS, payload);
};

export const patchProfilePicture = (payload: any): Promise<ApiResponse> => {
  return http.patch(urls.auth.PROFILE_PICTURE, payload);
};
