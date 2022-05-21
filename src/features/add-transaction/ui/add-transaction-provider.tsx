import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { Numpad, NumpadSource, NumpadSubmitParams } from '@/shared/ui';
import { IncomeSource, IncomeSourceModel } from '@/entities/income-source';
import { ExpenseSource, ExpenseSourceModel } from '@/entities/expense-source';
import { TransactionModel } from '@/entities/transaction';
import { MoneyVO } from '@/shared/lib';
import { UserModel } from '@/entities/user';

type Source = IncomeSource | ExpenseSource;

type AddTransactionFunction = (params: { from?: Source; to: Source }) => void;

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

export const AddTransactionProvider = ({ children }: Props) => {
  const [isNumpadVisible, setIsNumpadVisible] = useState(false);
  const [sourceFrom, setSourceFrom] = useState<NumpadSource>();
  const [sourceTo, setSourceTo] = useState<NumpadSource>();
  const [amount] = useState<MoneyVO>(MoneyVO.fromZero(UserModel.defaultCurrency.code));

  const init = useCallback<AddTransactionFunction>(({ from, to }) => {
    const sourceTo: NumpadSource = {
      id: to.id,
      name: to.name,
      currency: to.balance.currency,
    };

    if (from) {
      setSourceFrom({
        id: from.id,
        name: from.name,
        currency: from.balance.currency,
      });
    }

    setSourceTo(sourceTo);
    setIsNumpadVisible(true);
  }, []);

  const handleSumbit = ({ from, to, amount }: NumpadSubmitParams) => {
    const sourceTo = ExpenseSourceModel.get(to.id) || IncomeSourceModel.get(to.id);

    if (sourceTo) {
      if (!from) {
        // income
        TransactionModel.addIncome({
          to: sourceTo,
          amount,
        });

        IncomeSourceModel.update({
          ...sourceTo,
          balance: sourceTo.balance.plus(amount.value),
        });

        setIsNumpadVisible(false);
      } else {
        // expense
        const sourceFrom = ExpenseSourceModel.get(from.id) || IncomeSourceModel.get(from.id);

        if (sourceFrom) {
          TransactionModel.addExpense({ from: sourceFrom, to: sourceTo, amount });

          IncomeSourceModel.update({
            ...sourceFrom,
            balance: sourceFrom.balance.minus(amount.value),
          });

          ExpenseSourceModel.update({
            id: sourceTo.id,
            balance: sourceTo.balance.plus(amount.value),
          });

          setIsNumpadVisible(false);
        }
      }
    }
  };

  const handleClose = () => {
    setIsNumpadVisible(false);
  };

  const handleLeave = () => {
    setSourceFrom(undefined);
    setSourceTo(undefined);
  };

  return (
    <AddTransactionContext.Provider value={init}>
      {sourceTo && (
        <Numpad
          isVisible={isNumpadVisible}
          from={sourceFrom}
          to={sourceTo}
          amount={amount}
          onSubmit={handleSumbit}
          onClose={handleClose}
          onLeave={handleLeave}
        />
      )}
      {children}
    </AddTransactionContext.Provider>
  );
};
