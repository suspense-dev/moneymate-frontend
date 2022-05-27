import { MoneyVO } from '@/shared/lib';

import { ExpenseSource } from '../../expense-source';
import { IncomeSource } from '../../income-source';

export enum TransactionType {
  Income = 'Income',
  Expense = 'Expense',
}

export type Transaction = {
  id: string;
  from?: IncomeSource | ExpenseSource;
  to: IncomeSource | ExpenseSource;
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
