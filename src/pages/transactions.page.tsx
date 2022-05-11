import React from 'react';

import { RootTemplate } from '@/shared/ui';
import { TransactionsList } from '@/entities/transaction';
import { Header } from '@/widgets';
import { UpdateTransaction, useUpdateTransaction } from '@/features/update-transaction';

const TransactionsPageView: React.FunctionComponent = () => {
  const updateTransaction = useUpdateTransaction();

  const handlePressTxn = (id: string) => {
    updateTransaction(id);
  };

  return (
    <RootTemplate header={<Header />}>
      <TransactionsList onPress={handlePressTxn} />
    </RootTemplate>
  );
};

export const TransactionsPage = () => (
  <UpdateTransaction>
    <TransactionsPageView />
  </UpdateTransaction>
);
