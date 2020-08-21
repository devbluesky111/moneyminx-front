import { config } from 'dotenv';

config();

export default {
  BASE_URL: 'http://localhost:5000/v1/' || 'https://2234839039f1.ngrok.io/v1/',
  FACEBOOK_APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
};
