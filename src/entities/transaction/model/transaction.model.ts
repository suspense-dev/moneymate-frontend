import { action, computed, makeObservable, observable } from 'mobx';
import { nanoid } from 'nanoid/non-secure';

import { TransactionEntity } from './transaction.entity';
import { Transaction, TransactionType } from './transaction.types';

class _TransactionModel {
  constructor() {
    makeObservable(this, {
      expense: observable,
      income: observable,
      all: computed,
      addExpense: action,
      addIncome: action,
      get: action,
    });
  }

  expense: TransactionEntity[] = [];
  income: TransactionEntity[] = [];

  get all(): TransactionEntity[] {
    return this.expense
      .concat(this.income)
      .sort(
        (a: TransactionEntity, b: TransactionEntity) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }

  addExpense = ({ from, to, amount }: Pick<Transaction, 'from' | 'to' | 'amount'>): void => {
    this.expense.push(
      new TransactionEntity({
        id: nanoid(),
        createdAt: new Date().getTime(),
        from,
        to,
        amount,
        type: TransactionType.Expense,
      }),
    );
  };

  addIncome = ({ from, to, amount }: Pick<Transaction, 'from' | 'to' | 'amount'>): void => {
    this.income.push(
      new TransactionEntity({
        id: nanoid(),
        createdAt: new Date().getTime(),
        from,
        to,
        amount,
        type: TransactionType.Income,
      }),
    );
  };

  get = (id: string): TransactionEntity | undefined =>
    this.expense.find((expense) => expense.id === id) || this.income.find((income) => income.id === id);
}

export const TransactionModel = new _TransactionModel();
