import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import { ExpenseSourceEntity, ExpenseSourceModel } from '@/entities/expense-source';
import { IncomeSourceEntity, IncomeSourceModel } from '@/entities/income-source';
import { MoneySourceEntity, MoneySourceModel } from '@/entities/money-source';
import { TransactionModel } from '@/entities/transaction';
import { UserModel } from '@/entities/user';
import { MoneyVO } from '@/shared/lib';
import { Numpad, NumpadSource, NumpadSubmitParams, SelectGrid, Slot } from '@/shared/ui';

type FromSource = IncomeSourceEntity;
type ToSource = ExpenseSourceEntity | MoneySourceEntity;
type AddTransactionFunction = (params: { from: FromSource; to: ToSource }) => void;
export enum TargetType {
  Expense = 'Expense',
  Money = 'Money',
}
type Props = {
  children: ReactNode;
};

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

export const AddTransactionProvider = observer(({ children }: Props) => {
  const [isNumpadVisible, setIsNumpadVisible] = useState(false);
  const [selectedSourceFrom, setSelectedSourceFrom] = useState<NumpadSource>();
  const [selectedSourceTo, setSelectedSourceTo] = useState<NumpadSource>();
  const [targetType, setTargetType] = useState<TargetType>();
  const isTargetTypeExpense = targetType === TargetType.Expense;

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

    setSelectedSourceFrom(sourceFrom);
    setSelectedSourceTo(sourceTo);
    setTargetType(to instanceof ExpenseSourceEntity ? TargetType.Expense : TargetType.Money);
    setIsNumpadVisible(true);
  }, []);

  const handleSelectFrom = (source: FromSource) => {
    setSelectedSourceFrom({
      id: source.id,
      name: source.name,
      currency: source.balance.currency,
    });
  };

  const handleSelectTo = (source: ToSource) => {
    setSelectedSourceTo({
      id: source.id,
      name: source.name,
      currency: source.balance.currency,
    });
  };

  const handleSumbit = ({ from, to, amount }: NumpadSubmitParams) => {
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
    setIsNumpadVisible(false);
  };

  const handleClose = () => {
    setIsNumpadVisible(false);
  };

  const handleLeave = () => {
    setSelectedSourceFrom(undefined);
    setSelectedSourceTo(undefined);
    setTargetType(undefined);
  };

  return (
    <AddTransactionContext.Provider value={init}>
      {selectedSourceFrom && selectedSourceTo && (
        <SelectGrid<ToSource>
          title={isTargetTypeExpense ? 'Select expense source' : 'Select money source'}
          columns={2}
          options={isTargetTypeExpense ? ExpenseSourceModel.all : MoneySourceModel.all}
          renderOption={(option) => (
            <StyledCell>
              <Slot title={option.name} balance={option.balance} />
            </StyledCell>
          )}
          onSelect={handleSelectTo}
        >
          {({ open: openToSelect }) => (
            <SelectGrid<FromSource>
              title="Select income source"
              columns={2}
              options={IncomeSourceModel.all}
              renderOption={(option) => (
                <StyledCell>
                  <Slot title={option.name} balance={option.balance} />
                </StyledCell>
              )}
              onSelect={handleSelectFrom}
            >
              {({ open: openFromSelect }) => (
                <Numpad
                  isVisible={isNumpadVisible}
                  from={selectedSourceFrom}
                  to={selectedSourceTo}
                  amount={MoneyVO.fromZero(UserModel.defaultCurrency.code)}
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
});

const StyledCell = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 20px 0;
  border: 1px solid #ccc;
`;
