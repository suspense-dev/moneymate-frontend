import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from 'styled-components/native';

interface Props {
  header: React.ReactNode;
  nav: React.ReactNode;
  children: React.ReactNode;
}

export const RootTemplate = ({ header, nav, children }: Props) => (
  <StyledRoot>
    <StyledHeaderWrapper>{header}</StyledHeaderWrapper>
    <StyledContentWrapper>{children}</StyledContentWrapper>
    {nav}
  </StyledRoot>
);

const StyledRoot = styled.View`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  padding-top: ${getStatusBarHeight()}px;
`;

const StyledHeaderWrapper = styled.View`
  height: 50px;
`;

const StyledContentWrapper = styled.ScrollView`
  padding: 20px;
  min-height: 30px;
  flex: 1;
`;
