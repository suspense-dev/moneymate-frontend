import { makeObservable, observable } from 'mobx';

import { DEFAULT_CURRENCY_CODE, DEFAULT_CURRENCY_NAME, DEFAULT_CURRENCY_SIGN } from '@/app/constants';

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
