import React from 'react';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const RootTemplate = ({ header, children }: Props) => (
  <StyledRoot>
    <StyledHeaderWrapper>{header}</StyledHeaderWrapper>
    <StyledContentWrapper>{children}</StyledContentWrapper>
  </StyledRoot>
);

const StyledRoot = styled.View`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  padding-top: ${getStatusBarHeight() + 10}px;
`;

const StyledHeaderWrapper = styled.View`
  height: 50px;
`;

const StyledContentWrapper = styled.ScrollView`
  padding: 20px;
  min-height: 30px;
  flex: 1;
`;
