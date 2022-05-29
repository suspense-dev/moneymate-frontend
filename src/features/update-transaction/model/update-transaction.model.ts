import { action, makeObservable } from 'mobx';

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
      updateTransaction: action,
    });
  }

  updateTransaction = ({
    id,
    from,
    to,
    amount,
    presetAmount,
    presetFrom,
    presetTo,
    targetType,
  }: {
    id: string;
    from: NumpadSource;
    to: NumpadSource;
    amount: MoneyVO;
    presetAmount: MoneyVO;
    presetFrom: NumpadSource;
    presetTo: NumpadSource;
    targetType: TargetType;
  }) => {
    const toModel = targetType === TargetType.Expense ? ExpenseSourceModel : MoneySourceModel;
    const sourceFrom = IncomeSourceModel.get(from.id);
    const sourceTo = toModel.get(to.id);
    const initialSourceFrom = IncomeSourceModel.get(presetFrom.id);
    const initialSourceTo = toModel.get(presetTo.id);
    const txn = TransactionModel.get(id);

    if (txn && sourceFrom && sourceTo && initialSourceFrom && initialSourceTo) {
      initialSourceTo.update({
        balance: initialSourceTo.balance.minus(presetAmount.value),
      });

      if (targetType === TargetType.Money) {
        initialSourceFrom.update({
          balance: initialSourceFrom.balance.minus(presetAmount.value),
        });
        sourceFrom.update({
          balance: sourceFrom.balance.plus(amount.value),
        });
      } else {
        initialSourceFrom.update({
          balance: initialSourceFrom.balance.plus(presetAmount.value),
        });
        sourceFrom.update({
          balance: sourceFrom.balance.minus(amount.value),
        });
      }

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
}

export const UpdateTransactionModel = new _UpdateTransactionModel();
