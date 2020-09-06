export const urls = {
  auth: {
    TOKEN: '/token',
    LOGIN_IN: '/login',
    SIGN_OUT: '/signout',
    REGISTER: '/register',
    PROFILE: '/account/me',
    COMPLETE_SIGNUP: '/complete',
    FACEBOOK_LOGIN: '/facebook/login',
    ACCOUNT_CATEGORY: '/account/category',
    ACCOUNT_TYPE: '/account/account-type',
    ASSOCIATE_LOGIN: '/facebook/associate',
    RESET_PASSWORD: '/profile/password/reset',
    PROFILE_REFRESH: '/account/me?refresh=true',
    FORGOT_PASSWORD: '/profile/password/forgot',
    ACCOUNT_SUBTYPE: '/account/account-subtype?accountType=:accountType',
    FORM_FIELD_FILTER: '/account/form-fields-filter?accountType=:accountType&accountSubType=:accountSubType',
    ASSOCIATE_MORTGAGE: '/account/me/mortgage-accounts',
  },
  subscription: {
    SUB: '/subscription/stripe/subscriptions',
  },
  yodlee: {
    FAST_LINK: '/account/yodlee/fastlink',
  },
};
