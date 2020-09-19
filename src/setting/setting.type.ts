import { StripeSubscriptionStatus } from './setting.enum';

export interface SettingsProps {}

export enum SettingPageEnum {
  SETTINGS = 'Settings',
  PROFILE = 'Profile',
  PLAN = 'Plan',
  ACCOUNTS = 'Accounts',
}

export interface SettingTitleProps {
  pageTitle: SettingPageEnum;
  handlePageSelect: (pageName: SettingPageEnum) => void;
}

export interface SettingType {
  id: number;
  mailChimpSubscription: boolean;
}

export interface EmailSubscriptionPayload {
  mailChimpSubscription: boolean;
}

export interface CurrentSubscription {
  priceId: string;
  customerId: string;
  id: string | number;
  subscriptionId: string;
  cancelAt: Date | number;
  subscriptionEnd: string | number;
  subscriptionStatus: StripeSubscriptionStatus;
}
