import groupBy from 'lodash/groupBy';

import { IFormBalance } from './components/account-balance-modal';

export const groupBalanceByYear = (data: IFormBalance[]) => {
  const groupedBalance = groupBy(data, (formBalance) => formBalance.date.split('-')[0]);

  return groupedBalance;
};
