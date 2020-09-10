export const urls = {
  auth: {
    TOKEN: '/token',
    LOGIN_IN: '/login',
    SIGN_OUT: '/signout',
    REGISTER: '/register',
    PROFILE: '/account/me',
    COMPLETE_SIGNUP: '/complete',
    PATCH_ACCOUNT: '/account/:id',
    FACEBOOK_LOGIN: '/facebook/login',
    ACCOUNT_CATEGORY: '/account/category',
    ACCOUNT_TYPE: '/account/account-type',
    ASSOCIATE_LOGIN: '/facebook/associate',
    RESET_PASSWORD: '/profile/password/reset',
    LOAN_ACCOUNT: '/account/me/loan-accounts',
    PROFILE_REFRESH: '/account/me?refresh=true',
    FORGOT_PASSWORD: '/profile/password/forgot',
    ASSOCIATE_MORTGAGE: '/account/me/mortgage-accounts',
    ACCOUNT_SUBTYPE: '/account/account-subtype?accountType=:accountType',
    FORM_FIELD_FILTER: '/account/form-fields-filter?accountType=:accountType&accountSubType=:accountSubType',
  },
  subscription: {
    SUB: '/subscription/stripe/subscriptions',
  },
  yodlee: {
    FAST_LINK: '/account/yodlee/fastlink',
  },
};
