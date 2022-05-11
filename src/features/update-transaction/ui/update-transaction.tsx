import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { Numpad, NumpadSource, NumpadSubmitParams } from '@/shared/ui';
import { IncomeSourceModel } from '@/entities/income-source';
import { ExpenseSourceModel } from '@/entities/expense-source';
import { TransactionModel } from '@/entities/transaction';
import { MoneyVO } from '@/shared/lib';

type UpdateTransactionFunction = (txnId: string) => void;

export const AddTransactionContext = createContext<UpdateTransactionFunction | null>(null);

export const useUpdateTransaction = (): UpdateTransactionFunction => {
  const setData = useContext(AddTransactionContext);

  return (txnId): void => {
    if (!setData) {
      throw new Error("Couldn't reach provider!");
    }

    setData(txnId);
  };
};

type Props = {
  children: ReactNode;
};

export const UpdateTransaction = ({ children }: Props) => {
  const [isNumpadVisible, setIsNumpadVisible] = useState(false);
  const [txnId, setTxnId] = useState<string>('');
  const [sourceFrom, setSourceFrom] = useState<NumpadSource | null>(null);
  const [sourceTo, setSourceTo] = useState<NumpadSource | null>(null);
  const [presetAmount, setPresetAmount] = useState<MoneyVO>(MoneyVO.fromZero());

  const init = useCallback<UpdateTransactionFunction>((txnId) => {
    const txn = TransactionModel.get(txnId);

    if (txn) {
      const sourceFrom: NumpadSource = {
        id: txn.from.id,
        name: txn.from.name,
        currency: txn.from.balance.currency,
      };
      const sourceTo: NumpadSource = {
        id: txn.to.id,
        name: txn.to.name,
        currency: txn.to.balance.currency,
      };

      setSourceFrom(sourceFrom);
      setSourceTo(sourceTo);
      setPresetAmount(txn.amount);
      setTxnId(txn.id);
      setIsNumpadVisible(true);
    }
  }, []);

  const handleSumbit = ({ from, to, amount }: NumpadSubmitParams) => {
    const sourceFrom = ExpenseSourceModel.get(from.id) || IncomeSourceModel.get(from.id);
    const sourceTo = ExpenseSourceModel.get(to.id) || IncomeSourceModel.get(to.id);

    if (sourceFrom && sourceTo) {
      // update transaction
      TransactionModel.update({
        id: txnId,
        from: sourceFrom,
        to: sourceTo,
        amount,
      });

      // update balance of "from" source
      IncomeSourceModel.update({
        id: sourceFrom.id,
        balance: sourceFrom.balance.plus(presetAmount.value).minus(amount.value),
      });

      // update balance of "to" source
      (IncomeSourceModel.isIncomeSource(sourceTo.id) ? IncomeSourceModel : ExpenseSourceModel).update({
        id: sourceTo.id,
        balance: sourceTo.balance.minus(presetAmount.value).plus(amount.value),
      });

      setIsNumpadVisible(false);
    }
  };

  const handleClose = () => {
    setIsNumpadVisible(false);
  };

  const handleLeave = () => {
    setSourceFrom(null);
    setSourceTo(null);
  };

  return (
    <AddTransactionContext.Provider value={init}>
      {sourceFrom && sourceTo && (
        <Numpad
          isVisible={isNumpadVisible}
          from={sourceFrom}
          to={sourceTo}
          amount={presetAmount}
          onSubmit={handleSumbit}
          onClose={handleClose}
          onLeave={handleLeave}
        />
      )}
      {children}
    </AddTransactionContext.Provider>
  );
};
