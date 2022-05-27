import React from 'react';
import styled from 'styled-components/native';

import { Text } from './text';
import { Block } from './block';

interface Props {
  children: React.ReactNode;
  style?: Record<string, string>;

  onPress?: () => void;
}

export const Button: React.FunctionComponent<Props> = ({ children, style, onPress }: Props) => (
  <StyledRoot style={[{ alignSelf: 'flex-start' }, style]} onPress={onPress}>
    <StyledText>{children}</StyledText>
  </StyledRoot>
);

const StyledRoot = styled(Block)`
  background: #4051b5;
  padding: 10px 18px;
`;

const StyledText = styled(Text)`
  color: #fff;
`;
