import { action, makeObservable, observable } from 'mobx';

import { MoneyVO } from '@/shared/lib';

import { IncomeSource } from './income-source.types';

export class IncomeSourceEntity {
  id: string;
  name: string;
  balance: MoneyVO;
  isDefault: boolean;
  color?: string;

  constructor({ id, name, balance, color, isDefault }: IncomeSource) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.isDefault = isDefault;
    this.color = color;

    makeObservable(this, {
      id: observable,
      name: observable,
      balance: observable,
      isDefault: observable,
      color: observable,
      update: action,
    });
  }

  update = ({ name, balance, color }: Partial<Omit<IncomeSource, 'id' | 'isDefault'>>) => {
    if (name) {
      this.name = name;
    }
    if (balance) {
      this.balance = balance;
    }
    if (color) {
      this.color = color;
    }
  };
}
