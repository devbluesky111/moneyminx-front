import { FormikProps } from 'formik';
import { StringKeyObject } from 'common/common.types';

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
  user?: UserType;
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
  dispatch: (args: StringKeyObject) => void;
  payload: LoginPayload;
}

export interface FBAssociationPayload {
  dispatch: (args: StringKeyObject) => void;
  token: string;
}
export interface RegisterServicePayload {
  dispatch: (args: StringKeyObject) => void;
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
  dispatch: (args: StringKeyObject) => void;
  payload: ProfilePayload;
}
