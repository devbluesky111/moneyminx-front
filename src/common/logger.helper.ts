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
  gp(title?: string) {
    if (this.isDev()) {
      console.group(title);
    }
  },
  gpEnd() {
    if (this.isDev()) {
      console.groupEnd();
    }
  },
};
