export const urls = {
  auth: {
    PROFILE: '/me',
    TOKEN: '/token',
    LOGIN_IN: '/login',
    SIGN_OUT: '/signout',
    REGISTER: '/register',
    SETTINGS: '/settings/me',
    PATCH_PROFILE: '/profile',
    COMPLETE_SIGNUP: '/complete',
    PATCH_ACCOUNT: '/account/:id',
    FACEBOOK_LOGIN: '/facebook/login',
    PROFILE_PICTURE: '/profile/picture',
    ACCOUNTS: '/account/me?refresh=false',
    ACCOUNTS_REFRESH: '/account/me?refresh=true',
    ACCOUNT_CATEGORY: '/account/category',
    ACCOUNT_TYPE: '/account/account-type',
    ASSOCIATE_LOGIN: '/facebook/associate',
    RESET_PASSWORD: '/profile/password/reset',
    UPDATE_PASSWORD: '/profile/password',
    LOAN_ACCOUNT: '/account/me/loan-accounts',
    FORGOT_PASSWORD: '/profile/password/forgot',
    ASSOCIATE_MORTGAGE: '/account/me/mortgage-accounts',
    ACCOUNT_SUBTYPE: '/account/account-subtype?accountType=:accountType',
    FORM_FIELD_FILTER: '/account/form-fields-filter?accountType=:accountType&accountSubType=:accountSubType',
  },
  subscription: {
    CURRENT_SUB: '/subscription/me',
    SUB: '/subscription/stripe/subscriptions',
    STRIPE_CHECKOUT: '/subscription/stripe/checkout',
    CANCEL: '/subscription/me/cancel',
  },
  yodlee: {
    FAST_LINK: '/account/yodlee/fastlink',
  },
  networth: {
    NETWORTH: '/networth',
  },
  allocations: {
    ALLOCATIONS: '/allocations',
    CHART_SETTINGS: '/allocations/me/chart-settings',
    UPLOAD_CHART: '/allocations/upload-chart',
  },
};
