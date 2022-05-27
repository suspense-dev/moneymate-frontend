import React from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent } from 'react-native';
import { Text } from './text';
import { Block } from './block';

interface Props {
  style?: Record<string, string>;

  onPress?: (event: GestureResponderEvent) => any;
}

export const SlotAdd: React.FunctionComponent<Props> = ({ style, onPress }: Props) => {
  return (
    <StyledRoot style={style} onPress={onPress}>
      <StyledSlot>
        <Text>&#43;</Text>
      </StyledSlot>
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
  border: 1px dashed rgb(0, 0, 0);
  margin-bottom: 7px;
  margin-top: 7px;
`;
