import { toast, ToastContent, ToastOptions } from 'react-toastify';

import env from 'app/app.env';

export enum TEnv {
  DEV = 'development',
  PROD = 'production',
}

const useToast = () => {
  return {
    mmToast(content: ToastContent, options?: ToastOptions) {
      if (TEnv.DEV === env.APP_ENVIRONMENT) {
        toast(content, options);
      }
    },
  };
};

export default useToast;
