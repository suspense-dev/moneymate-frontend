import { action, makeObservable, observable } from 'mobx';

import { MoneyVO } from '@/shared/lib';

import { ExpenseSource } from './expense-source.types';

export class ExpenseSourceEntity {
  id: string;
  name: string;
  balance: MoneyVO;
  color?: string;

  constructor({ id, name, balance, color }: ExpenseSource) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.color = color;

    makeObservable(this, {
      id: observable,
      name: observable,
      balance: observable,
      color: observable,
      update: action,
    });
  }

  update = ({ name, balance, color }: Partial<Omit<ExpenseSource, 'id'>>) => {
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
