import { AccountItem, Action, NetworthItem } from './networth.type';
import { AccountCategory, NetworthActionEnum, TimeIntervalEnum } from './networth.enum';

export const setFromDate = (fromDate: string): Action => ({
  type: NetworthActionEnum.SET_FROM_DATE,
  payload: {
    fromDate,
  },
});

export const setCategory = (category: string) => ({
  type: NetworthActionEnum.SET_CATEGORY,
  payload: { category },
});

export const setAccountType = (accountType: string) => ({
  type: NetworthActionEnum.SET_ACCOUNT_TYPE,
  payload: { accountType },
});

export const setTimeInterval = (timeInterval: TimeIntervalEnum) => ({
  type: NetworthActionEnum.SET_TIME_INTERVAL,
  payload: { timeInterval },
});

export const setNetWorth = (networth: NetworthItem[]) => ({
  type: NetworthActionEnum.SET_NETWORTH,
  payload: { networth },
});

export const setAccounts = (accounts: Record<AccountCategory, AccountItem[]>) => ({
  type: NetworthActionEnum.SET_ACCOUNTS,
  payload: { accounts },
});
