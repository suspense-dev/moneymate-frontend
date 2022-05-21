import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import { RootTemplate, Text } from '@/shared/ui';
import { TransactionView } from '@/entities/transaction';
import { Header } from '@/widgets';
import { UpdateTransactionProvider, useUpdateTransaction } from '@/features/update-transaction';
import styled, { css } from 'styled-components/native';
import { TransactionsPageModel } from '../model';

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
      {Object.entries(TransactionsPageModel.txnsGroupedByDate).map(([date, txns]) => (
        <Fragment key={date}>
          <StyledDate>{date}</StyledDate>

          {txns.map((txn, index, array) => (
            <StyledTransactionView
              key={txn.id}
              from={txn.from?.name}
              to={txn.to.name}
              amount={txn.amount}
              type={txn.type}
              isLast={index === array.length - 1}
              onPress={() => handlePressTxn(txn.id)}
            />
          ))}
        </Fragment>
      ))}
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

const StyledDate = styled(Text)`
  margin-bottom: 12px;
`;
