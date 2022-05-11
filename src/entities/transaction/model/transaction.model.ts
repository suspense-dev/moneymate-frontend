import { observable, computed, action, makeObservable } from 'mobx';
import { nanoid } from 'nanoid/non-secure';

import { Transaction, TransactionIncome, TransactionExpense, TransactionType } from './transaction.types';

type AddExpensePayload = Pick<Transaction, 'from' | 'to' | 'amount'>;
type AddIncomePayload = Pick<Transaction, 'to' | 'amount'>;
type ChangeIncomeTxnParams = Pick<Transaction, 'id' | 'from' | 'to' | 'amount'>;

class _TransactionModel {
  constructor() {
    makeObservable(this, {
      expense: observable,
      income: observable,
      all: computed,
      addExpense: action,
      addIncome: action,
      update: action,
    });
  }

  expense: TransactionExpense[] = [];
  income: TransactionIncome[] = [];

  get all(): Transaction[] {
    return [...this.expense, ...this.income].sort(
      (a: Transaction, b: Transaction) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  addExpense = ({ from, to, amount }: AddExpensePayload): void => {
    this.expense.push({
      id: nanoid(),
      createdAt: new Date().toISOString(),
      from,
      to,
      amount,
      type: TransactionType.Expense,
    });
  };

  addIncome = ({ to, amount }: AddIncomePayload): void => {
    this.income.push({
      id: nanoid(),
      createdAt: new Date().toISOString(),
      to,
      amount,
      type: TransactionType.Income,
    });
  };

  update = ({ id, from, to, amount }: ChangeIncomeTxnParams): void => {
    const targetTxn = this.all.find((txn) => txn.id === id);

    if (targetTxn) {
      targetTxn.from = from;
      targetTxn.to = to;
      targetTxn.amount = amount;
    }
  };

  get = (id: string): Transaction | undefined =>
    this.expense.find((expense) => expense.id === id) || this.income.find((income) => income.id === id);
}

export const TransactionModel = new _TransactionModel();
