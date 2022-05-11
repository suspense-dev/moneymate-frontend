import React from 'react';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import { Slot, SlotAdd } from '@/shared/ui';

import { IncomeSourceModel, IncomeSource } from '../model';

interface Props {
  style?: Record<string, string>;

  onPress: (source: IncomeSource) => void;
  onPressAdd?: () => void;
}

export const IncomeSourcesList = observer(({ style, onPress, onPressAdd }: Props) => (
  <StyledRoot style={style}>
    {IncomeSourceModel.all.map((source) => (
      <Slot key={source.id} title={source.name} balance={source.balance} onPress={() => onPress(source)} />
    ))}
    <StyledSlotAdd onPress={onPressAdd} />
  </StyledRoot>
));

const StyledRoot = styled.View`
  display: flex;
  flex-flow: row wrap;
`;

const StyledSlotAdd = styled(SlotAdd)`
  margin-right: 15px;
  width: 70px;
`;
