import { BigNumber } from 'bignumber.js';

import { ValueObject } from '../value-object.types';
import { CurrencyVO, DEFAULT_CURRENCY_CODE } from '../currency/currency.vo';
import { CurrencyCode } from '../currency';

export class MoneyVO implements ValueObject {
  readonly value!: BigNumber;
  readonly currency!: CurrencyVO;

  constructor(value: number | string | BigNumber, currencyCode: CurrencyCode) {
    this.value = value instanceof BigNumber ? value : new BigNumber(value);
    this.currency = new CurrencyVO(currencyCode);
  }

  static fromZero(currencyCode?: CurrencyCode): MoneyVO {
    return new MoneyVO(0, currencyCode ?? DEFAULT_CURRENCY_CODE);
  }

  get isNegative(): boolean {
    return this.value.isNegative();
  }

  get isPositive(): boolean {
    return this.value.isPositive();
  }

  get isInvalid(): boolean {
    return this.value.isNaN();
  }

  isEqual(comparedMoney: MoneyVO): boolean {
    return comparedMoney.currency.isEqual(this.currency) && comparedMoney.value === this.value;
  }

  format(): string {
    return `${this.currency.sign} ${this.value.toString()}`;
  }

  plus(value: number | string | BigNumber): MoneyVO {
    return new MoneyVO(this.value.plus(new BigNumber(value)), this.currency.code);
  }

  minus(value: number | string | BigNumber): MoneyVO {
    return new MoneyVO(this.value.minus(new BigNumber(value)), this.currency.code);
  }

  multiply(value: number | string | BigNumber): MoneyVO {
    return new MoneyVO(this.value.multipliedBy(new BigNumber(value)), this.currency.code);
  }

  divide(value: number | string | BigNumber): MoneyVO {
    return new MoneyVO(this.value.dividedBy(new BigNumber(value)), this.currency.code);
  }

  getPercent(percent: number): number {
    return new BigNumber(percent).dividedBy(100).multipliedBy(this.value).toNumber();
  }

  plusPercent(percent: number): MoneyVO {
    const newValue = this.getPercent(percent);

    return new MoneyVO(this.value.plus(newValue), this.currency.code);
  }

  minusPercent(percent: number): MoneyVO {
    const newValue = this.getPercent(percent);

    return new MoneyVO(this.value.minus(newValue), this.currency.code);
  }
}
