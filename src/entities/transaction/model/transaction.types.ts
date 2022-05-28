import { MoneyVO } from '@/shared/lib';

import { ExpenseSourceEntity } from '../../expense-source';
import { IncomeSourceEntity } from '../../income-source';
import { MoneySourceEntity } from '../../money-source';

export enum TransactionType {
  Income = 'Income',
  Expense = 'Expense',
}

export type Transaction = {
  id: string;
  from: IncomeSourceEntity | ExpenseSourceEntity;
  to: ExpenseSourceEntity | MoneySourceEntity;
  type: TransactionType;
  amount: MoneyVO;
  createdAt: number;
};

export type TransactionIncome = Transaction & {
  type: TransactionType.Income;
};

export type TransactionExpense = Transaction & {
  type: TransactionType.Expense;
};
