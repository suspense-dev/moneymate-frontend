import { action, makeObservable, observable } from 'mobx';

import { ExpenseSourceModel } from '@/entities/expense-source';
import { IncomeSourceModel } from '@/entities/income-source';
import { MoneySourceModel } from '@/entities/money-source';
import { TransactionModel } from '@/entities/transaction';
import { MoneyVO } from '@/shared/lib';
import { NumpadSource } from '@/shared/ui';

export enum TargetType {
  Expense = 'Expense',
  Money = 'Money',
}

class _AddTransactionModel {
  constructor() {
    makeObservable(this, {
      targetType: observable,
      selectedFromSource: observable,
      selectedToSource: observable,
      setTargetType: action,
      setSelectedFromSource: action,
      setSelectedToSource: action,
      addTransaction: action,
      clear: action,
    });
  }

  targetType: TargetType | undefined = undefined;
  selectedFromSource: NumpadSource | undefined = undefined;
  selectedToSource: NumpadSource | undefined = undefined;

  setTargetType = (targetType: TargetType) => {
    this.targetType = targetType;
  };

  setSelectedFromSource = (source: NumpadSource) => {
    this.selectedFromSource = source;
  };

  setSelectedToSource = (source: NumpadSource) => {
    this.selectedToSource = source;
  };

  addTransaction = ({ from, to, amount }: { from: NumpadSource; to: NumpadSource; amount: MoneyVO }) => {
    const isTargetTypeExpense = this.targetType === TargetType.Expense;
    const sourceFrom = IncomeSourceModel.get(from.id);
    const sourceTo = isTargetTypeExpense ? ExpenseSourceModel.get(to.id) : MoneySourceModel.get(to.id);

    if (sourceFrom && sourceTo) {
      sourceTo.update({
        balance: sourceTo.balance.plus(amount.value),
      });

      if (isTargetTypeExpense) {
        TransactionModel.addExpense({
          from: sourceFrom,
          to: sourceTo,
          amount,
        });
        sourceFrom.update({
          balance: sourceFrom.balance.minus(amount.value),
        });
      } else {
        TransactionModel.addIncome({
          from: sourceFrom,
          to: sourceTo,
          amount,
        });
        sourceFrom.update({
          balance: sourceFrom.balance.plus(amount.value),
        });
      }
    }
  };

  clear = () => {
    this.targetType = undefined;
    this.selectedFromSource = undefined;
    this.selectedToSource = undefined;
  };
}

export const AddTransactionModel = new _AddTransactionModel();
