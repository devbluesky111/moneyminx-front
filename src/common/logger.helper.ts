// tslint:disable: no-console

import env from 'app/app.env';
import { TEnv } from './hooks/useToast';

export const logger = {
  env: env.APP_ENVIRONMENT,
  isDev() {
    return this.env === TEnv.DEV;
  },
  log(msg: string, data?: any) {
    if (this.isDev()) {
      if (data) {
        return console.log(`___${msg}___`, data);
      }
      return console.log(`___${msg}___`);
    }
  },
  group(data: any[], msg?: string) {
    if (this.isDev()) {
      console.group(msg);
      data.forEach((el) => {
        this.log('', el);
      });
      console.groupEnd();
    }
  },
};
