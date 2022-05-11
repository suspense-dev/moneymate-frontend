import { ValueObject } from '../value-object.types';
import { CurrencyCode } from './currency-code';
import { CurrencyName } from './currency-name';
import { CurrencySign } from './currency-sign';

export const DEFAULT_CURRENCY_CODE = CurrencyCode.USD;

export class CurrencyVO implements ValueObject {
  readonly code: CurrencyCode;
  readonly name: CurrencyName;
  readonly sign: CurrencySign;

  constructor(code: CurrencyCode) {
    this.code = code;
    this.name = CurrencyName[code];
    this.sign = CurrencySign[code];
  }

  static fromDefault(): CurrencyVO {
    return new CurrencyVO(DEFAULT_CURRENCY_CODE);
  }

  isEqual(comparedCurrency: CurrencyVO): boolean {
    return this.code === comparedCurrency.code && this.name === comparedCurrency.name;
  }
}
