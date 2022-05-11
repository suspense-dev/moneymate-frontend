import React from 'react';
import styled from 'styled-components/native';

import { Text } from '../../../atoms';

interface Props {
  name: string;
  style?: Record<string, string>;
}

export const NumpadSourceView = ({ name, style }: Props) => (
  <StyledRoot style={style}>
    <Text>{name}</Text>
  </StyledRoot>
);

const StyledRoot = styled.View`
  height: 70px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
