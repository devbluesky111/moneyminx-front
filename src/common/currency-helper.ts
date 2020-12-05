import { CurrencySymbols } from 'auth/enum/currency-options';
import { enumerateStr } from 'common/common-helper';

export const getCurrencySymbol = (cur: string) => {
  const CurrencySymbolsArr = enumerateStr(CurrencySymbols);

  const symbol = Object.keys(CurrencySymbols).map((k, index) => {
    let s = '';
    if (k === cur) {
      s = CurrencySymbolsArr[index];
    }

    return s;
  });

  return symbol;
};

export const currencyArray = () => {
  return Object.keys(CurrencySymbols);
};
