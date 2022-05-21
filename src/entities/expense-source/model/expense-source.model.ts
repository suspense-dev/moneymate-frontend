import { observable, action, makeObservable } from 'mobx';
import { nanoid } from 'nanoid/non-secure';

import { MoneyVO } from '@/shared/lib';
import { ExpenseSource } from './expense-source.types';
import { UserModel } from '../../user';

type UpdateParams = {
  id: string;
  name?: string;
  balance?: MoneyVO;
};

export const INITIAL_EXPENSES_SOURCES: ExpenseSource[] = [
  {
    id: nanoid(),
    name: 'Food',
    balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
    type: 'expense',
  },
  {
    id: nanoid(),
    name: 'Shopping',
    balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
    type: 'expense',
  },
  {
    id: nanoid(),
    name: 'Sport',
    balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
    type: 'expense',
  },
];

class _ExpenseSourceModel {
  constructor() {
    makeObservable(this, {
      all: observable,
      create: action,
      remove: action,
      update: action,
    });
  }

  all: ExpenseSource[] = INITIAL_EXPENSES_SOURCES;

  create = (name: string): void => {
    this.all.push({
      id: nanoid(),
      name,
      balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
      type: 'expense',
    });
  };

  remove = (id: ExpenseSource['id']): void => {
    this.all = this.all.filter((source: ExpenseSource) => source.id !== id);
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

  get = (id: string): ExpenseSource | undefined => this.all.find((source) => source.id === id);

  isExpenseSource = (id: string): boolean => {
    return this.all.some((source) => source.id === id);
  };
}

export const ExpenseSourceModel = new _ExpenseSourceModel();
