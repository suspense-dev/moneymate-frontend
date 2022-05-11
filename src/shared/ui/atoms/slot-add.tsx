import React from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent, TouchableWithoutFeedback } from 'react-native';
import { Text } from './text';

interface Props {
  style?: Record<string, string>;

  onPress?: (event: GestureResponderEvent) => any;
}

export const SlotAdd: React.FunctionComponent<Props> = ({ style, onPress }: Props) => {
  return (
    <TouchableWithoutFeedback delayPressIn={0} onPress={onPress ? (onPress as any) : undefined}>
      <StyledRoot style={style}>
        <StyledSlot>
          <Text>&#43;</Text>
        </StyledSlot>
      </StyledRoot>
    </TouchableWithoutFeedback>
  );
};

const StyledRoot = styled.View`
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
