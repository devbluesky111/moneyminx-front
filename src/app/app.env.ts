import { config } from 'dotenv';

config();

export default {
  BASE_URL: 'https://e40f13a64f1a.ngrok.io' || 'https://api.moneyminx.com/',
  FACEBOOK_APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
  STRIPE_PUBLIC_KEY:
    process.env.REACT_APP_STRIPE_PUBLIC_KEY ||
    'pk_test_51H8PpUAjc68kwXCHuXGg5Kjb6YrCsLRSqfiCTeayJJ3zk3ydXl7SdEJRqa7fKJHEyZJ7BdPHAcdH3GpMPrT8lG5y00HehFXF0D',
};
