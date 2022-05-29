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
      presetAmount: observable,
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
  presetAmount: MoneyVO | undefined = undefined;

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

  setPresetAmount = (amount: MoneyVO) => {
    this.presetAmount = amount;
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
    const txn = TransactionModel.get(id);

    if (txn && sourceFrom && sourceTo && initialSourceFrom && initialSourceTo && this.presetAmount) {
      initialSourceFrom.update({
        balance: initialSourceFrom.balance.plus(this.presetAmount.value),
      });
      initialSourceTo.update({
        balance: initialSourceTo.balance.minus(this.presetAmount.value),
      });

      sourceFrom.update({
        balance: sourceFrom.balance.minus(amount.value),
      });
      sourceTo.update({
        balance: sourceTo.balance.plus(amount.value),
      });

      txn.update({
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
    this.presetAmount = undefined;
  };
}

export const UpdateTransactionModel = new _UpdateTransactionModel();
