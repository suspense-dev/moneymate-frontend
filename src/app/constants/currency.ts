import { CurrencyCode } from '@/shared/lib';

export enum CurrencyDict {
  USD = 'US Dollar',
  RUB = 'Russian ruble',
  EUR = 'Euro',
}

export enum CurrencySign {
  USD = '$',
  RUB = '₽',
  EUR = '€',
}

export const DEFAULT_CURRENCY_CODE = CurrencyCode.USD;
export const DEFAULT_CURRENCY_NAME = CurrencyDict.USD;
export const DEFAULT_CURRENCY_SIGN = CurrencySign.USD;
