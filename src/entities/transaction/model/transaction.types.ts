import { MoneyVO } from '@/shared/lib';
import { IncomeSource } from '../../income-source';
import { ExpenseSource } from '../../expense-source';

export enum TransactionType {
  Income = 'Income',
  Expense = 'Expense',
}

export type Transaction = {
  id: string;
  from: IncomeSource | ExpenseSource;
  to: IncomeSource | ExpenseSource;
  type: TransactionType;
  amount: MoneyVO;
  createdAt: string;
};

export type TransactionIncome = Transaction & {
  type: TransactionType.Income;
};

export type TransactionExpense = Transaction & {
  type: TransactionType.Expense;
};
