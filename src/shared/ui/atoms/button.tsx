import React from 'react';
import styled from 'styled-components/native';
import { TouchableWithoutFeedback } from 'react-native';

import { Text } from './text';

interface Props {
  children: React.ReactNode;
  style?: Record<string, string>;

  onPress?: () => void;
}

export const Button: React.FunctionComponent<Props> = ({ children, style, onPress }: Props) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <StyledRoot style={[{ alignSelf: 'flex-start' }, style]}>
      <StyledText>{children}</StyledText>
    </StyledRoot>
  </TouchableWithoutFeedback>
);

const StyledRoot = styled.View`
  background: #4051b5;
  padding: 10px 18px;
`;

const StyledText = styled(Text)`
  color: #fff;
`;
