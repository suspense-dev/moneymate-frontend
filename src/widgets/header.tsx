import React from 'react';
import styled from 'styled-components/native';

import { Text } from '@/shared/ui/atoms';

export const Header: React.FunctionComponent = () => (
  <StyledRoot>
    <StyledText weight={600}>Money Mate</StyledText>
  </StyledRoot>
);

const StyledRoot = styled.View`
  height: 100%;
  width: 100%;
  background: #fff;
  box-shadow: 0 4px 3px rgba(0, 0, 0, 0.07);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled(Text)`
  color: rgb(0, 0, 0);
  text-transform: uppercase;
`;
