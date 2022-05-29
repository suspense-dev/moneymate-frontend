import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import { ExpenseSourceEntity, ExpenseSourceModel } from '@/entities/expense-source';
import { IncomeSourceEntity, IncomeSourceModel } from '@/entities/income-source';
import { MoneySourceEntity, MoneySourceModel } from '@/entities/money-source';
import { TransactionModel } from '@/entities/transaction';
import { MoneyVO } from '@/shared/lib';
import { Numpad, NumpadSource, NumpadSubmitParams, SelectGrid, Slot } from '@/shared/ui';

import { TargetType, UpdateTransactionModel } from '../model';

type FromSource = IncomeSourceEntity;
type ToSource = ExpenseSourceEntity | MoneySourceEntity;
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

export const UpdateTransactionProvider = observer(({ children }: Props) => {
  const [isNumpadVisible, setIsNumpadVisible] = useState(false);
  const [txnId, setTxnId] = useState<string>();
  const [presetSourceFrom, setPresetSourceFrom] = useState<NumpadSource>();
  const [presetSourceTo, setPresetSourceTo] = useState<NumpadSource>();
  const [selectedSourceFrom, setSelectedSourceFrom] = useState<NumpadSource>();
  const [selectedSourceTo, setSelectedSourceTo] = useState<NumpadSource>();
  const [presetAmount, setPresetAmount] = useState<MoneyVO>();
  const [targetType, setTargetType] = useState<TargetType>();
  const isTargetTypeExpense = targetType === TargetType.Expense;

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

      setPresetSourceFrom(sourceFrom);
      setPresetSourceTo(sourceTo);
      setSelectedSourceFrom(sourceFrom);
      setSelectedSourceTo(sourceTo);
      setTargetType(txn.to instanceof ExpenseSourceEntity ? TargetType.Expense : TargetType.Money);
      setPresetAmount(txn.amount);
      setTxnId(txn.id);
      setIsNumpadVisible(true);
    }
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
    if (presetSourceFrom && presetSourceTo && targetType && txnId && presetAmount) {
      UpdateTransactionModel.updateTransaction({
        id: txnId,
        from,
        to,
        presetFrom: presetSourceFrom,
        presetTo: presetSourceTo,
        amount,
        presetAmount,
        targetType,
      });
    }
    setIsNumpadVisible(false);
  };

  const handleClose = () => {
    setIsNumpadVisible(false);
  };

  const handleLeave = () => {
    setPresetSourceFrom(undefined);
    setPresetSourceTo(undefined);
    setSelectedSourceFrom(undefined);
    setSelectedSourceTo(undefined);
    setTargetType(undefined);
    setPresetAmount(undefined);
    setTxnId(undefined);
  };

  return (
    <AddTransactionContext.Provider value={init}>
      {selectedSourceFrom && selectedSourceTo && presetAmount && (
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
                  amount={presetAmount}
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
