import { storage } from 'app/app.storage';
import { ApiResponse } from 'api/api.types';
import { postLogin } from 'api/request.api';

import { auth } from './auth-context.types';
import { LoginServicePayload, RegisterServicePayload } from './auth.types';

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

export const signup = async ({ dispatch, payload }: RegisterServicePayload): Promise<ApiResponse> => {
  dispatch({ type: auth.REGISTER });

  const { data, error } = await postLogin(payload);
  if (error) {
    storage.clear();
    dispatch({ type: auth.REGISTER_FAILURE });
  } else {
    dispatch({
      type: auth.REGISTER_SUCCESS,
      payload: { token: data.token, expires: data.expires },
    });
  }

  return { data, error };
};
