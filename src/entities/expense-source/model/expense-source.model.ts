import { action, makeObservable, observable } from 'mobx';
import { nanoid } from 'nanoid/non-secure';

import { MoneyVO } from '@/shared/lib';

import { UserModel } from '../../user';
import { ExpenseSourceEntity } from './expense-source.entity';
import { ExpenseSource } from './expense-source.types';

export const INITIAL_EXPENSES_SOURCES: ExpenseSourceEntity[] = [
  new ExpenseSourceEntity({
    id: nanoid(),
    name: 'Food',
    balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
  }),
  new ExpenseSourceEntity({
    id: nanoid(),
    name: 'Shopping',
    balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
  }),
  new ExpenseSourceEntity({
    id: nanoid(),
    name: 'Sport',
    balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
  }),
];

class _ExpenseSourceModel {
  constructor() {
    makeObservable(this, {
      all: observable,
      create: action,
      remove: action,
    });
  }

  all: ExpenseSourceEntity[] = INITIAL_EXPENSES_SOURCES;

  create = (name: string): void => {
    this.all.push(
      new ExpenseSourceEntity({
        id: nanoid(),
        name,
        balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
      }),
    );
  };

  update = ({ id, ...props }: Partial<Omit<ExpenseSource, 'isDefault'>> & { id: string }): void => {
    const source = this.get(id);

    if (source) {
      source.update(props);
    }
  };

  remove = (id: ExpenseSource['id']): void => {
    this.all = this.all.filter((source: ExpenseSource) => source.id !== id);
  };

  get = (id: string): ExpenseSourceEntity | undefined => this.all.find((source) => source.id === id);
}

export const ExpenseSourceModel = new _ExpenseSourceModel();
