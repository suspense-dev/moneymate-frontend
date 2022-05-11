import React from 'react';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';

import { Text } from '@/shared/ui';

import { MoneyVO } from '@/shared/lib';
import { TransactionType, Transaction } from '../model';

type Props = {
  style?: Record<string, string>;
  from: string;
  to: string;
  amount: MoneyVO;
  type: Transaction['type'];

  onPress?: () => any;
};

type StyledAmountProps = {
  type: Transaction['type'];
};

export const TransactionView = ({
  style,
  from,
  to,
  amount,
  type,

  onPress,
}: Props) => (
  <TouchableWithoutFeedback onPress={onPress ? () => onPress() : undefined}>
    <StyledRoot style={style}>
      <StyledSources>
        <StyledFrom>From: {from}</StyledFrom>
        <Text>To: {to}</Text>
      </StyledSources>
      <StyledTotal>
        <StyledAmount type={type}>
          {type === TransactionType.Expense ? '-' : '+'}&nbsp;
          {amount.value.toString()}&nbsp;
          {amount.currency.sign}
        </StyledAmount>
      </StyledTotal>
    </StyledRoot>
  </TouchableWithoutFeedback>
);

const StyledRoot = styled.View`
  padding: 10px 15px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
`;

const StyledSources = styled.View`
  display: flex;
  flex-flow: column nowrap;
`;

const StyledFrom = styled(Text)`
  margin-bottom: 7px;
`;

const StyledTotal = styled.View`
  display: flex;
  flex-flow: column nowrap;
`;

const StyledAmount = styled(Text)<StyledAmountProps>`
  color: ${({ type }) => (type === TransactionType.Expense ? 'red' : 'green')};
`;
