import React from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent } from 'react-native';
import { observer } from 'mobx-react';

import { Slot, SlotAdd } from '@/shared/ui';

import { ExpenseSourceModel, ExpenseSource } from '../model';

interface Props {
  style?: Record<string, string>;

  onPress: (source: ExpenseSource) => void;
  onPressAdd: (event: GestureResponderEvent) => void;
}

export const ExpenseSourcesList = observer(({ style, onPress, onPressAdd }: Props) => (
  <StyledRoot style={style}>
    {ExpenseSourceModel.all.map((source) => (
      <StyledSlot key={source.id} title={source.name} balance={source.balance} onPress={() => onPress(source)} />
    ))}
    <StyledSlotAdd onPress={onPressAdd} />
  </StyledRoot>
));

const StyledRoot = styled.View`
  display: flex;
  flex-flow: row wrap;
`;

const StyledSlot = styled(Slot)`
  margin: 0 15px 15px 0;
  width: 70px;
`;

const StyledSlotAdd = styled(SlotAdd)`
  margin: 0 15px 15px 0;
  width: 70px;
`;
