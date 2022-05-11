import React from 'react';
import styled from 'styled-components/native';

import { Text } from './text';

interface Props {
  children: React.ReactNode;
  style?: Record<string, string>;
}

export const Head: React.FunctionComponent<Props> = ({ children, style }: Props) => (
  <StyledRoot style={style} weight={600}>
    {children}
  </StyledRoot>
);

const StyledRoot = styled(Text)`
  font-size: 18px;
`;
