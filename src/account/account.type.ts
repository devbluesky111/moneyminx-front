export interface AccountProps {}

export interface AccountItem {
  interval: string;
  type: string;
  value: number;
}

export interface AccountBarGraphProps {
  account: AccountItem[];
  curInterval: string;
}
