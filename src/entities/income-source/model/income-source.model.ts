import { observable, action, makeObservable } from 'mobx';
import { nanoid } from 'nanoid/non-secure';

import { MoneyVO } from '@/shared/lib';
import { IncomeSource } from './income-source.types';
import { UserModel } from '../../user';

type UpdateParams = {
  id: string;
  name?: string;
  balance?: MoneyVO;
};

export const INITIAL_INCOME_SOURCES: IncomeSource[] = [
  {
    id: nanoid(),
    name: 'Salary',
    balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
    isDefault: true,
    type: 'income',
  },
];

class _IncomeSourceModel {
  constructor() {
    makeObservable(this, {
      all: observable,
      create: action,
      remove: action,
      update: action,
    });
  }

  all: IncomeSource[] = INITIAL_INCOME_SOURCES;

  create = (name: string): void => {
    this.all.push({
      id: nanoid(),
      name,
      balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
      isDefault: !this.all.length,
      type: 'income',
    });
  };

  remove = (id: string): void => {
    this.all = this.all.filter((source: IncomeSource) => source.id !== id);
  };

  update = ({ id, name, balance }: UpdateParams): void => {
    for (let i = 0; i < this.all.length; i++) {
      if (this.all[i].id === id) {
        if (name) {
          this.all[i].name = name;
        }

        if (balance) {
          this.all[i].balance = balance;
        }
        break;
      }
    }
  };

  get = (id: string): IncomeSource | undefined => this.all.find((source) => source.id === id);

  getDefault = (): IncomeSource | undefined => this.all.find((source) => source.isDefault);

  isIncomeSource = (id: string): boolean => {
    return this.all.some((source) => source.id === id);
  };
}

export const IncomeSourceModel = new _IncomeSourceModel();
