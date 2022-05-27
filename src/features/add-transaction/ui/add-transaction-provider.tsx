import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import styled from 'styled-components/native';

import { ExpenseSource, ExpenseSourceModel } from '@/entities/expense-source';
import { IncomeSource, IncomeSourceModel } from '@/entities/income-source';
import { TransactionModel } from '@/entities/transaction';
import { UserModel } from '@/entities/user';
import { MoneyVO } from '@/shared/lib';
import { Numpad, NumpadSource, NumpadSubmitParams, SelectGrid, Slot } from '@/shared/ui';

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

  const handleSelectExpense = (expense: ExpenseSource) => {
    setSourceTo({
      id: expense.id,
      name: expense.name,
      currency: expense.balance.currency,
    });
  };

  const handleSelectIncome = (income: IncomeSource) => {
    setSourceFrom({
      id: income.id,
      name: income.name,
      currency: income.balance.currency,
    });
  };

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
        <SelectGrid<ExpenseSource>
          title="Select expense source"
          columns={2}
          options={ExpenseSourceModel.all}
          renderOption={(option) => (
            <StyledCell>
              <Slot title={option.name} balance={option.balance} />
            </StyledCell>
          )}
          onSelect={handleSelectExpense}
        >
          {({ open: openToSelect }) => (
            <SelectGrid<IncomeSource>
              title="Select income source"
              columns={2}
              options={IncomeSourceModel.all}
              renderOption={(option) => (
                <StyledCell>
                  <Slot title={option.name} balance={option.balance} />
                </StyledCell>
              )}
              onSelect={handleSelectIncome}
            >
              {({ open: openFromSelect }) => (
                <Numpad
                  isVisible={isNumpadVisible}
                  from={sourceFrom}
                  to={sourceTo}
                  amount={amount}
                  onSubmit={handleSumbit}
                  onClose={handleClose}
                  onLeave={handleLeave}
                  onClickFrom={openFromSelect}
                  onClickTo={openToSelect}
                />
              )}
            </SelectGrid>
          )}
        </SelectGrid>
      )}
      {children}
    </AddTransactionContext.Provider>
  );
};

const StyledCell = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 20px 0;
  border: 1px solid #ccc;
`;
