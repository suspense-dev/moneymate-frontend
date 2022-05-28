import { action, makeObservable, observable } from 'mobx';
import { nanoid } from 'nanoid/non-secure';

import { MoneyVO } from '@/shared/lib';

import { UserModel } from '../../user';
import { IncomeSourceEntity } from './income-source.entity';
import { IncomeSource } from './income-source.types';

export const INITIAL_INCOME_SOURCES: IncomeSourceEntity[] = [
  new IncomeSourceEntity({
    id: nanoid(),
    name: 'Salary',
    balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
    isDefault: true,
  }),
  new IncomeSourceEntity({
    id: nanoid(),
    name: 'Stocks',
    balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
    isDefault: false,
  }),
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

  all: IncomeSourceEntity[] = INITIAL_INCOME_SOURCES;

  create = (name: string): void => {
    this.all.push(
      new IncomeSourceEntity({
        id: nanoid(),
        name,
        balance: MoneyVO.fromZero(UserModel.defaultCurrency.code),
        isDefault: !this.all.length,
      }),
    );
  };

  remove = (id: string): void => {
    this.all = this.all.filter((source: IncomeSource) => source.id !== id);
  };

  update = ({ id, ...props }: Partial<Omit<IncomeSource, 'isDefault'>> & { id: string }): void => {
    const source = this.get(id);

    if (source) {
      source.update(props);
    }
  };

  get = (id: string): IncomeSourceEntity | undefined => this.all.find((source) => source.id === id);

  getDefault = (): IncomeSourceEntity | undefined => this.all.find((source) => source.isDefault);
}

export const IncomeSourceModel = new _IncomeSourceModel();
