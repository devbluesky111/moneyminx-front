export enum MMCategories {
  INVESTMENT_ASSETS = 'Investment Assets',
  OTHER_ASSETS = 'Other Assets',
  LIABILITIES = 'Liabilities',
}

export enum ProviderAccountStatus {
  LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS',
  USER_INPUT_REQUIRED = 'USER_INPUT_REQUIRED',
  IN_PROGRESS = 'IN_PROGRESS',
  PARTIAL_SUCCESS = 'PARTIAL_SUCCESS',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
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

export enum ProviderAggregationSource {
  SYSTEM = 'SYSTEM',
  USER = 'USER',
}
