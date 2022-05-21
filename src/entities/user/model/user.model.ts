import { makeObservable, observable } from 'mobx';

import { CurrencyCode, CurrencyName, CurrencySign } from '@/shared/lib';

const DEFAULT_CURRENCY_CODE = CurrencyCode.USD;
const DEFAULT_CURRENCY_NAME = CurrencyName.USD;
const DEFAULT_CURRENCY_SIGN = CurrencySign.USD;

class UserModel {
  constructor() {
    makeObservable(this, {
      defaultCurrency: observable,
    });
  }

  defaultCurrency = {
    code: DEFAULT_CURRENCY_CODE,
    sign: DEFAULT_CURRENCY_SIGN,
    name: DEFAULT_CURRENCY_NAME,
  };
}

export const userModel = new UserModel();
