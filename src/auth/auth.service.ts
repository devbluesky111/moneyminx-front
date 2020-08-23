import { storage } from 'app/app.storage';
import { ApiResponse } from 'api/api.types';
import { postLogin, postRegister, postFacebookAssociation, getRefreshedAccount } from 'api/request.api';

import { auth } from './auth-context.types';
import { LoginServicePayload, RegisterServicePayload, FBAssociationPayload, Dispatch } from './auth.types';

export const login = async ({ dispatch, payload }: LoginServicePayload): Promise<ApiResponse> => {
  dispatch({ type: auth.LOGIN });

  const { data, error } = await postLogin(payload);
  if (error) {
    storage.clear();
    dispatch({ type: auth.LOGIN_FAILURE });
  } else {
    dispatch({
      type: auth.LOGIN_SUCCESS,
      payload: { token: data.token, expires: data.expires },
    });
  }

  return { data, error };
};

export const associateFacebookUser = async ({ dispatch, token }: FBAssociationPayload): Promise<ApiResponse> => {
  dispatch({ type: auth.LOGIN });

  const { data, error } = await postFacebookAssociation(token);
  if (error) {
    storage.clear();
    dispatch({ type: auth.LOGIN_FAILURE });
  } else {
    dispatch({
      type: auth.LOGIN_SUCCESS,
      payload: { token: data.token, expires: data.expires },
    });
  }

  return { data, error };
};

export const signup = async ({ dispatch, payload }: RegisterServicePayload): Promise<ApiResponse> => {
  dispatch({ type: auth.REGISTER });
  const { data, error } = await postRegister(payload);
  if (error) {
    dispatch({ type: auth.REGISTER_FAILURE });
  } else {
    dispatch({
      type: auth.REGISTER_SUCCESS,
      payload: { token: data.token, expires: data.expires },
    });
  }

  return { data, error };
};

export const getRefreshedProfile = async ({ dispatch }: { dispatch: Dispatch }): Promise<ApiResponse> => {
  dispatch({ type: auth.PROFILE_REFRESH });
  const { data, error } = await getRefreshedAccount();
  if (error) {
    dispatch({ type: auth.PROFILE_REFRESH_FAILURE });
  } else {
    dispatch({
      type: auth.PROFILE_REFRESH_SUCCESS,
      payload: { user: data },
    });
  }

  return { data, error };
};
