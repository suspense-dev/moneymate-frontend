import React, { useState } from 'react';
import styled from 'styled-components/native';

import { RootTemplate, Head } from '@/shared/ui';
import { Header } from '@/widgets';
import { IncomeSourceModel, IncomeSourcesList } from '@/entities/income-source';
import { ExpenseSource, ExpenseSourcesList } from '@/entities/expense-source';
import { AddIncomeModal } from '@/features/add-income-source';
import { AddExpenseModal } from '@/features/add-expense-source';
import { AddTransaction, useAddTransaction } from '@/features/add-transaction';

const DashboardPageView = () => {
  const [isAddIncomeSourceModalVisible, setIsAddIncomeSourceModalVisible] = useState(false);
  const [isAddExpenseSourceModalVisible, setIsAddExpenseSourceModalVisible] = useState(false);
  const addTransaction = useAddTransaction();

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
        <StyledIncomeSourcesList
          onPress={() => {
            console.log('press');
          }}
          onPressAdd={() => setIsAddIncomeSourceModalVisible(true)}
        />

        <StyledHead>Expenses sources</StyledHead>
        <ExpenseSourcesList onPress={handlePressExpense} onPressAdd={() => setIsAddExpenseSourceModalVisible(true)} />
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
  <AddTransaction>
    <DashboardPageView />
  </AddTransaction>
);

const StyledHead = styled(Head)`
  margin-bottom: 12px;
`;

const StyledIncomeSourcesList = styled(IncomeSourcesList)`
  margin-bottom: 20px;
`;
