import React, { useState } from 'react';
import styled from 'styled-components/native';

import { RootTemplate, Head, SlotAdd, Slot } from '@/shared/ui';
import { Header } from '@/widgets';
import { IncomeSource, IncomeSourceModel } from '@/entities/income-source';
import { ExpenseSource, ExpenseSourceModel } from '@/entities/expense-source';
import { AddIncomeModal } from '@/features/add-income-source';
import { AddExpenseModal } from '@/features/add-expense-source';
import { AddTransactionProvider, useAddTransaction } from '@/features/add-transaction';

const DashboardPageView = () => {
  const [isAddIncomeSourceModalVisible, setIsAddIncomeSourceModalVisible] = useState(false);
  const [isAddExpenseSourceModalVisible, setIsAddExpenseSourceModalVisible] = useState(false);
  const addTransaction = useAddTransaction();

  const handlePressIncome = (incomeSource: IncomeSource) => {
    if (incomeSource) {
      addTransaction({
        to: incomeSource,
      });
    }
  };

  const handlePressExpense = (expenseSource: ExpenseSource) => {
    const incomeSource = IncomeSourceModel.getDefault();

    if (incomeSource) {
      addTransaction({
        from: incomeSource,
        to: expenseSource,
      });
    }
  };

  return (
    <>
      <RootTemplate header={<Header />}>
        <StyledHead>Income sources</StyledHead>
        <StyledIncomeSourcesContainer>
          {IncomeSourceModel.all.map((source) => (
            <StyledExpenseSource
              key={source.id}
              title={source.name}
              balance={source.balance}
              onPress={() => handlePressIncome(source)}
            />
          ))}
          <StyledSlotAdd onPress={() => setIsAddIncomeSourceModalVisible(true)} />
        </StyledIncomeSourcesContainer>

        <StyledHead>Expenses sources</StyledHead>
        <StyledExpenseSourcesContainer>
          {ExpenseSourceModel.all.map((source) => (
            <StyledExpenseSource
              key={source.id}
              title={source.name}
              balance={source.balance}
              onPress={() => handlePressExpense(source)}
            />
          ))}
          <StyledSlotAdd onPress={() => setIsAddExpenseSourceModalVisible(true)} />
        </StyledExpenseSourcesContainer>
      </RootTemplate>

      <AddIncomeModal
        isVisible={isAddIncomeSourceModalVisible}
        onClose={() => setIsAddIncomeSourceModalVisible(false)}
      />

      <AddExpenseModal
        isVisible={isAddExpenseSourceModalVisible}
        onClose={() => setIsAddExpenseSourceModalVisible(false)}
      />
    </>
  );
};

export const DashboardPage = () => (
  <AddTransactionProvider>
    <DashboardPageView />
  </AddTransactionProvider>
);

const StyledHead = styled(Head)`
  margin-bottom: 12px;
`;

const StyledIncomeSourcesContainer = styled.View`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 20px;
`;

const StyledExpenseSourcesContainer = styled.View`
  display: flex;
  flex-flow: row wrap;
`;

const StyledExpenseSource = styled(Slot)`
  margin: 0 15px 15px 0;
  width: 70px;
`;

const StyledSlotAdd = styled(SlotAdd)`
  margin: 0 15px 15px 0;
  width: 70px;
`;
