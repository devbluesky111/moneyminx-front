import { CurrencySymbols } from 'auth/enum/currency-options';
import { enumerateStr } from 'common/common-helper';

export const getCurrencySymbol = (cur: string) => {
  const CurrencySymbolsArr = enumerateStr(CurrencySymbols);
  let s = '';
  Object.keys(CurrencySymbols).map((k, index) => {
    if (k === cur) {
      s = CurrencySymbolsArr[index];
    }
    return 0;
  });

  return s;
};
