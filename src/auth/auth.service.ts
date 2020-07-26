import { storage } from 'app/app.storage';
import { ApiResponse } from 'api/api.types';
import { restaurantLogin, logout, completeSignup, getProfile } from 'api/request.api';

import { auth } from './auth-context.types';
import { LoginServicePayload, ProfileServicePayload } from './auth.types';

export const login = async ({ dispatch, payload }: LoginServicePayload): Promise<void> => {
  dispatch({ type: auth.SIGN_IN });
  const { data, error } = await restaurantLogin(payload);
  if (error) {
    storage.clear();
    dispatch({ type: auth.SIGN_IN_FAILURE });
  } else {
    dispatch({
      type: auth.SIGN_IN_SUCCESS,
      payload: { user: data.user, token: data.token, roles: data.roles },
    });
  }
};

export const signout = async (dispatch: any): Promise<void> => {
  dispatch({ type: auth.SIGN_OUT });
  const { error } = await logout();

  if (error) {
    dispatch({ type: auth.SIGN_OUT_FAILURE });
  } else {
    dispatch({
      type: auth.SIGN_OUT_SUCCESS,
    });
  }
};

export const completeProfile = async ({ dispatch, payload }: ProfileServicePayload): Promise<ApiResponse> => {
  dispatch({ type: auth.PROFILE_COMPLETE });
  const { error, data } = await completeSignup(payload);

  if (error) {
    dispatch({ type: auth.PROFILE_COMPLETE_FAILURE });
  } else {
    dispatch({
      type: auth.PROFILE_COMPLETE_SUCCESS,
      payload: { user: data },
    });
  }
  return { error, data };
};

export const fetchProfile = async (): Promise<ApiResponse> => {
  const { error, data } = await getProfile();
  return { error, data };
};
