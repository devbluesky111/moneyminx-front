import { FormikProps } from 'formik';
import { StringKeyObject } from 'common/common.types';

export type Dispatch = (args: StringKeyObject) => void;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  subscriptionPriceId: string;
  mailChimpSubscription: boolean;
}

export interface UserType {
  [key: string]: any;
}

export interface Account {
  id: number;
  yodleeId: number;
  accountName: string;
  providerName: string;
  profileId: number;
  category: any;
  formField: any;
}

export enum RoleEnum {
  ADMIN,
  GUEST,
}

export enum AuthState {
  INITIAL,
  LOGGED_OUT,
  LOGGING_OUT,
  AUTHENTICATED,
  AUTHENTICATING,
  SIGN_IN_REJECTED,
  LOG_OUT_REJECTED,
}

export interface AuthType {
  expires?: number;
  token?: string;
  user?: Account[];
  roles?: RoleEnum[];
  authState: AuthState;
  isSigningIn: boolean;
  isAuthenticated: boolean;
}

export interface LoginFormProps {
  props: FormikProps<LoginPayload>;
}

export interface RegisterFormProps {
  props: FormikProps<RegisterPayload>;
}

export interface LoginServicePayload {
  dispatch: Dispatch;
  payload: LoginPayload;
}

export interface FBAssociationPayload {
  dispatch: Dispatch;
  token: string;
}
export interface RegisterServicePayload {
  dispatch: Dispatch;
  payload: RegisterPayload;
}

export interface AddressPayload {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  longitude: string;
  latitude: string;
}

export interface ProfilePayload {
  name: string;
  photo: string;
  type: string;
  homeDelivery: boolean;
  phoneNumber: string;
  address: AddressPayload;
}

export interface ProfileFormPayload {
  props: FormikProps<ProfilePayload>;
}

export interface ProfileServicePayload {
  dispatch: Dispatch;
  payload: ProfilePayload;
}
