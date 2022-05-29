import { action, makeObservable, observable } from 'mobx';
import { nanoid } from 'nanoid/non-secure';

import { MoneySourceEntity } from '@/entities/money-source/model/money-source.entity';
import { MoneyVO } from '@/shared/lib';

import { UserModel } from '../../user';

type UpdateParams = {
  id: string;
  name?: string;
  balance?: MoneyVO;
};

export const INITIAL_MONEY_SOURCES: MoneySourceEntity[] = [
  new MoneySourceEntity({
    id: nanoid(),
    name: 'Cash',
    balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
    isDefault: true,
  }),
  new MoneySourceEntity({
    id: nanoid(),
    name: 'Card',
    balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
    isDefault: true,
  }),
  new MoneySourceEntity({
    id: nanoid(),
    name: 'Crypto wallet',
    balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
    isDefault: true,
  }),
];

class _MoneySourceModel {
  constructor() {
    makeObservable(this, {
      all: observable,
      create: action,
      get: action,
      getDefault: action,
    });
  }

  all: MoneySourceEntity[] = INITIAL_MONEY_SOURCES;

  create = (name: string): void => {
    this.all.push(
      new MoneySourceEntity({
        id: nanoid(),
        name,
        balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
        isDefault: !this.all.length,
      }),
    );
  };

  get = (id: string): MoneySourceEntity | undefined => this.all.find((source) => source.id === id);

  getDefault = (): MoneySourceEntity | undefined => this.all.find((source) => source.isDefault);
}

export const MoneySourceModel = new _MoneySourceModel();
