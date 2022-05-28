import { action, makeObservable, observable } from 'mobx';

import { MoneyVO } from '@/shared/lib';

import { ExpenseSourceEntity } from '../../expense-source';
import { IncomeSourceEntity } from '../../income-source';
import { MoneySourceEntity } from '../../money-source';
import { Transaction, TransactionType } from './transaction.types';

export class TransactionEntity {
  id: string;
  from: IncomeSourceEntity | ExpenseSourceEntity;
  to: ExpenseSourceEntity | MoneySourceEntity;
  type: TransactionType;
  amount: MoneyVO;
  createdAt: number;

  constructor({ id, from, to, amount, type, createdAt }: Transaction) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.type = type;
    this.createdAt = createdAt;

    makeObservable(this, {
      id: observable,
      from: observable,
      to: observable,
      amount: observable,
      type: observable,
      createdAt: action,
    });
  }

  update = ({ from, to, amount, type, createdAt }: Partial<Omit<Transaction, 'id'>>) => {
    if (from) {
      this.from = from;
    }
    if (to) {
      this.to = to;
    }
    if (amount) {
      this.amount = amount;
    }
    if (type) {
      this.type = type;
    }
    if (createdAt) {
      this.createdAt = createdAt;
    }
  };
}
