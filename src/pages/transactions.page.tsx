import React from 'react';
import { observer } from 'mobx-react';

import { RootTemplate } from '@/shared/ui';
import { TransactionModel, TransactionView } from '@/entities/transaction';
import { Header } from '@/widgets';
import { UpdateTransactionProvider, useUpdateTransaction } from '@/features/update-transaction';
import styled, { css } from 'styled-components/native';

type StyledTxnViewProps = {
  isLast: boolean;
};

const TransactionsPageView: React.FunctionComponent = observer(() => {
  const updateTransaction = useUpdateTransaction();

  const handlePressTxn = (id: string) => {
    updateTransaction(id);
  };

  return (
    <RootTemplate header={<Header />}>
      {TransactionModel.all.map((txn, index, txns) => {
        return (
          <StyledTransactionView
            key={txn.id}
            from={txn.from?.name}
            to={txn.to.name}
            amount={txn.amount}
            type={txn.type}
            isLast={index === txns.length - 1}
            onPress={() => handlePressTxn(txn.id)}
          />
        );
      })}
    </RootTemplate>
  );
});

export const TransactionsPage = () => (
  <UpdateTransactionProvider>
    <TransactionsPageView />
  </UpdateTransactionProvider>
);

const StyledTransactionView = styled(TransactionView)<StyledTxnViewProps>`
  ${({ isLast }) =>
    !isLast &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: rgba(0, 0, 0, 0.1);
      margin-bottom: 15px;
    `}
`;
