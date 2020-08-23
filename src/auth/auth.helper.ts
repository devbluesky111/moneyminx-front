import { groupBy } from 'lodash';
import { Account } from './auth.types';

export const groupByProviderName = (list: Account[], key: string = 'providerName') => {
  return groupBy(list, key);
};
