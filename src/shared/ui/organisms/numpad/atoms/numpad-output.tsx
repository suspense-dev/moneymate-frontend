import React from 'react';
import styled from 'styled-components/native';

import { Text } from '../../../atoms';

interface Props {
  value: string;
  style?: Record<string, string>;
}

export const NumpadOutput = ({ style, value }: Props) => (
  <StyledRoot style={style}>
    <StyledText weight={500}>{value}</StyledText>
  </StyledRoot>
);

const StyledRoot = styled.View`
  height: 100px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.2);
`;

const StyledText = styled(Text)`
  font-size: 40px;
  letter-spacing: 1.5px;
`;
