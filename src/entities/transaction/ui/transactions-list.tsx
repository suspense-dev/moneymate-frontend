import React from 'react';
import styled, { css } from 'styled-components/native';
import { observer } from 'mobx-react';
import { View } from 'react-native';

import { TransactionView } from './transaction-view';

import { TransactionModel } from '../model';

interface Props {
  style?: Record<string, string>;

  onPress: (data: string) => void;
}

type StyledTxnViewProps = {
  isLast: boolean;
};

export const TransactionsList = observer(({ style, onPress }: Props) => (
  <View style={style}>
    {TransactionModel.all.map((txn, index, txns) => {
      return (
        <StyledTransactionView
          key={txn.id}
          from={txn.from.name}
          to={txn.to.name}
          amount={txn.amount}
          type={txn.type}
          isLast={index === txns.length - 1}
          onPress={() => onPress(txn.id)}
        />
      );
    })}
  </View>
));

const StyledTransactionView = styled(TransactionView)<StyledTxnViewProps>`
  ${({ isLast }) =>
    !isLast &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: rgba(0, 0, 0, 0.1);
      margin-bottom: 15px;
    `}
`;
