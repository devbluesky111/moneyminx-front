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
