import { Action } from './networth.type';
import { NetworthActionEnum, TimeIntervalEnum } from './networth.enum';

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
