import groupBy from 'lodash/groupBy';

import { IFormBalance } from './components/account-balance-modal';

export const groupBalanceByYear = (data: IFormBalance[]) => {
  const groupedBalance = groupBy(data, (formBalance) => getYear(formBalance.date));

  return groupedBalance;
};

export const getYear = (str: string) => str.split('-')[0];
