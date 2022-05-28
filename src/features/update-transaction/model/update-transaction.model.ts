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

class _UpdateTransactionModel {
  constructor() {
    makeObservable(this, {
      targetType: observable,
      selectedFromSource: observable,
      selectedToSource: observable,
      initialFromSource: observable,
      initialToSource: observable,
      setTargetType: action,
      setSelectedFromSource: action,
      setSelectedToSource: action,
      updateTransaction: action,
      clear: action,
    });
  }

  targetType: TargetType | undefined = undefined;
  selectedFromSource: NumpadSource | undefined = undefined;
  selectedToSource: NumpadSource | undefined = undefined;
  initialFromSource: NumpadSource | undefined = undefined;
  initialToSource: NumpadSource | undefined = undefined;

  setTargetType = (targetType: TargetType) => {
    this.targetType = targetType;
  };

  setSelectedFromSource = (source: NumpadSource) => {
    this.selectedFromSource = source;
  };

  setSelectedToSource = (source: NumpadSource) => {
    this.selectedToSource = source;
  };

  setInitialFromSource = (source: NumpadSource) => {
    this.initialFromSource = source;
  };

  setInitialToSource = (source: NumpadSource) => {
    this.initialToSource = source;
  };

  updateTransaction = ({
    id,
    from,
    to,
    amount,
  }: {
    id: string;
    from: NumpadSource;
    to: NumpadSource;
    amount: MoneyVO;
  }) => {
    const toModel = this.targetType === TargetType.Expense ? ExpenseSourceModel : MoneySourceModel;
    const sourceFrom = IncomeSourceModel.get(from.id);
    const sourceTo = toModel.get(to.id);
    const initialSourceFrom = this.initialFromSource ? IncomeSourceModel.get(this.initialFromSource.id) : undefined;
    const initialSourceTo = this.initialToSource ? toModel.get(this.initialToSource.id) : undefined;

    if (sourceFrom && sourceTo && initialSourceFrom && initialSourceTo) {
      IncomeSourceModel.update({
        id: initialSourceFrom.id,
        balance: initialSourceFrom.balance.minus(amount.value),
      });

      toModel.update({
        id: initialSourceTo.id,
        balance: initialSourceTo.balance.minus(amount.value),
      });

      IncomeSourceModel.update({
        id: sourceFrom.id,
        balance: sourceFrom.balance.plus(amount.value),
      });

      toModel.update({
        id: sourceTo.id,
        balance: sourceTo.balance.plus(amount.value),
      });

      TransactionModel.update({
        id,
        from: sourceFrom,
        to: sourceTo,
        amount,
      });
    }
  };

  clear = () => {
    this.targetType = undefined;
    this.selectedFromSource = undefined;
    this.selectedToSource = undefined;
    this.initialFromSource = undefined;
    this.initialToSource = undefined;
  };
}

export const UpdateTransactionModel = new _UpdateTransactionModel();
