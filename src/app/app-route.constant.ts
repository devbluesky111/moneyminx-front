export const appRouteConstants = {
  home: '/',
  auth: {
    DEF: '/auth',
    ME: '/auth/me',
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    RESET_PASSWORD: '/password_reset/:token?',
    TOKEN_EXPIRED: '/password/token-expired',
    CONNECT_ACCOUNT: '/connect-account',
    ACCOUNT_SETTING: '/account-settings',
  },

  web: {
    SECURITY: '/security',
    NET_WORTH: '/net-worth',
  },

  misc: {
    NOT_FOUND: '/404',
    STRIPE_SUCCESS: '/stripe/success',
    STRIPE_FAILURE: '/stripe/cancel',
  },
};
