import React from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent } from 'react-native';

import { Text } from '@/shared/ui/atoms/text';
import { MoneyVO } from '@/shared/lib';
import { Block } from './block';

interface Props {
  title: string;
  balance: MoneyVO;
  children?: React.ReactNode;
  style?: Record<string, string>;

  onPress?: (event: GestureResponderEvent) => any;
}

export const Slot: React.FunctionComponent<Props> = ({ title, balance, children, style, onPress }: Props) => {
  return (
    <StyledRoot style={style} onPress={onPress}>
      <Text ellipsizeMode="tail" numberOfLines={1}>
        {title}
      </Text>
      <StyledSlot>{children}</StyledSlot>
      <StyledValue>{balance.format()}</StyledValue>
    </StyledRoot>
  );
};

const StyledRoot = styled(Block)`
  width: 70px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const StyledSlot = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  width: 40px;
  height: 40px;
  border: 1px solid rgb(0, 0, 0);
  margin-bottom: 7px;
  margin-top: 7px;
`;

const StyledValue = styled(Text)`
  color: #ccc;
  font-size: 10px;
`;
