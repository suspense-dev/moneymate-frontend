import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { Numpad, NumpadSource, NumpadSubmitParams } from '@/shared/ui';
import { IncomeSource, IncomeSourceModel } from '@/entities/income-source';
import { ExpenseSource, ExpenseSourceModel } from '@/entities/expense-source';
import { TransactionModel } from '@/entities/transaction';

type Source = IncomeSource | ExpenseSource;

type AddTransactionFunction = (params: { from: Source; to: Source }) => void;

export const AddTransactionContext = createContext<AddTransactionFunction | null>(null);

export const useAddTransaction = (): AddTransactionFunction => {
  const setData = useContext(AddTransactionContext);

  return ({ from, to }): void => {
    if (!setData) {
      throw new Error("Couldn't reach provider!");
    }

    setData({ from, to });
  };
};

type Props = {
  children: ReactNode;
};

export const AddTransaction = ({ children }: Props) => {
  const [isNumpadVisible, setIsNumpadVisible] = useState(false);
  const [sourceFrom, setSourceFrom] = useState<NumpadSource | null>(null);
  const [sourceTo, setSourceTo] = useState<NumpadSource | null>(null);

  const init = useCallback<AddTransactionFunction>(({ from, to }) => {
    const sourceFrom: NumpadSource = {
      id: from.id,
      name: from.name,
      currency: from.balance.currency,
    };
    const sourceTo: NumpadSource = {
      id: to.id,
      name: to.name,
      currency: to.balance.currency,
    };

    setSourceFrom(sourceFrom);
    setSourceTo(sourceTo);
    setIsNumpadVisible(true);
  }, []);

  const handleSumbit = ({ from, to, amount }: NumpadSubmitParams) => {
    const sourceFrom = ExpenseSourceModel.get(from.id) || IncomeSourceModel.get(from.id);
    const sourceTo = ExpenseSourceModel.get(to.id) || IncomeSourceModel.get(to.id);

    if (sourceFrom && sourceTo) {
      TransactionModel.addExpense({ from: sourceFrom, to: sourceTo, amount });

      if (IncomeSourceModel.isIncomeSource(sourceFrom.id)) {
        // update balance of "from" source if that is income source
        IncomeSourceModel.update({
          ...sourceFrom,
          balance: sourceFrom.balance.minus(amount.value),
        });
      }

      // update balance of "to" source
      (IncomeSourceModel.isIncomeSource(sourceTo.id) ? IncomeSourceModel : ExpenseSourceModel).update({
        id: sourceTo.id,
        balance: sourceTo.balance.plus(amount.value),
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
          onSubmit={handleSumbit}
          onClose={handleClose}
          onLeave={handleLeave}
        />
      )}
      {children}
    </AddTransactionContext.Provider>
  );
};
