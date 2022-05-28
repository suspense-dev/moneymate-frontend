import { action, makeObservable, observable } from 'mobx';

import { MoneyVO } from '@/shared/lib';

import { MoneySource } from './money-source.types';

export class MoneySourceEntity {
  id: string;
  name: string;
  balance: MoneyVO;
  isDefault: boolean;

  constructor({ id, name, balance, isDefault }: MoneySource) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.isDefault = isDefault;

    makeObservable(this, {
      id: observable,
      name: observable,
      balance: observable,
      isDefault: observable,
      update: action,
    });
  }

  update = ({ name, balance }: Partial<Omit<MoneySource, 'id' | 'isDefault'>>) => {
    if (name) {
      this.name = name;
    }
    if (balance) {
      this.balance = balance;
    }
  };
}
