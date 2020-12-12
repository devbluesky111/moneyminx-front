import { storage } from 'app/app.storage';
import { ApiResponse } from 'api/api.types';
import {
  postLogin,
  getProfile,
  getAccount,
  postRegister,
  deleteAccount,
  getAccountRefresh,
  getConnectionInfo,
  patchChangePassword,
  postFacebookAssociation,
} from 'api/request.api';

import { auth } from './auth-context.types';
import {
  Account,
  Dispatch,
  LoginServicePayload,
  FBAssociationPayload,
  DeleteAccountPayload,
  RegisterServicePayload,
  ChangePasswordServicePayload,
} from './auth.types';
import { setLoginSuccess } from './auth.actions';
import { groupByProviderName } from './auth.helper';

export const login = async ({ dispatch, payload }: LoginServicePayload): Promise<ApiResponse> => {
  dispatch({ type: auth.LOGIN });

  const { data, error } = await postLogin(payload);
  if (error) {
    storage.clear();
    dispatch({ type: auth.LOGIN_FAILURE });
  } else {
    dispatch(setLoginSuccess({ token: data.token, expires: data.expires, onboarded: data.onboarded }));
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
    dispatch(setLoginSuccess({ token: data.token, expires: data.expires, onboarded: data.onboarded }));
  }

  return { data, error };
};

export const signup = async ({ dispatch, payload }: RegisterServicePayload): Promise<ApiResponse> => {
  dispatch({ type: auth.REGISTER });
  const { data, error } = await postRegister(payload);
  if (error) {
    dispatch({ type: auth.REGISTER_FAILURE });
  } else {
    dispatch(setLoginSuccess({ token: data.token, expires: data.expires, onboarded: data.onboarded }));
  }

  return { data, error };
};

export const pickByProviderName = (data: Account[], count: number = 2) => {
  const accountByProviderName = groupByProviderName(data);

  const filteredData = Object.values(accountByProviderName).map((accountArr) => accountArr.slice(0, count));

  return filteredData.flat();
};

/**
 * @description get refreshed account compels the server to hit the yodlee each time
 *  - limiting this to login success and yodlee modal success
 * @param dispatch
 */
export const getRefreshedAccount = async ({ dispatch }: { dispatch: Dispatch }): Promise<ApiResponse> => {
  dispatch({ type: auth.FETCH_ACCOUNT });
  const { data, error } = await getAccountRefresh();

  if (error) {
    dispatch({ type: auth.FETCH_ACCOUNT_FAILURE });
  } else {
    dispatch({
      type: auth.FETCH_ACCOUNT_SUCCESS,
      payload: { user: data },
    });
  }

  return { data, error };
};

/**
 * @param dispatch
 * @description Fetch Connection Info will be called for getting connection info
 * fetch the data from the database instead of calling yodlee
 */
export const fetchConnectionInfo = async ({ dispatch }: { dispatch: Dispatch }): Promise<ApiResponse> => {
  dispatch({ type: auth.FETCH_ACCOUNT });
  const { data, error } = await getConnectionInfo();

  if (error) {
    dispatch({ type: auth.FETCH_ACCOUNT_FAILURE });
  } else {
    dispatch({
      type: auth.FETCH_ACCOUNT_SUCCESS,
      payload: { user: data },
    });
  }

  return { data, error };
};

export const deleteAccounts = async ({ dispatch, accounts }: DeleteAccountPayload): Promise<ApiResponse> => {
  const deleteAccountList = async () => {
    return Promise.all(
      accounts.map(async (account) => {
        await deleteAccount(`${account.id}`);
      })
    );
  };

  await deleteAccountList();
  const { data, error } = await getAccount();

  if (error) {
    dispatch({ type: auth.FETCH_ACCOUNT_FAILURE });
  } else {
    dispatch({
      type: auth.FETCH_ACCOUNT_SUCCESS,
      payload: { user: data },
    });
  }

  return { data, error };
};

export const deleteAccountById = async ({ dispatch, id }: { dispatch: Dispatch; id: number }): Promise<ApiResponse> => {
  await deleteAccount(`${id}`);
  const { data, error } = await getAccount();

  if (error) {
    dispatch({ type: auth.FETCH_ACCOUNT_FAILURE });
  } else {
    dispatch({
      type: auth.FETCH_ACCOUNT_SUCCESS,
      payload: { user: data },
    });
  }

  return { data, error };
};

export const fetchProfile = async ({ dispatch }: { dispatch: Dispatch }): Promise<ApiResponse> => {
  dispatch({ type: auth.FETCH_PROFILE });
  const { data, error } = await getProfile();
  if (error) {
    dispatch({ type: auth.FETCH_PROFILE_FAILURE });
  } else {
    dispatch({
      type: auth.FETCH_PROFILE_SUCCESS,
      payload: { user: data },
    });
  }

  return { data, error };
};

export const changePassword = async ({ dispatch, payload }: ChangePasswordServicePayload): Promise<ApiResponse> => {
  dispatch({ type: auth.SIGN_OUT });
  const { data, error } = await patchChangePassword(payload);

  if (error) {
    dispatch({ type: auth.SIGN_OUT_FAILURE });
  } else {
    dispatch({ type: auth.SIGN_OUT_SUCCESS });
  }

  return { data, error };
};

export const logout = () => {
  storage.clear();

  return window.location.assign('/login?action=logout');
};
