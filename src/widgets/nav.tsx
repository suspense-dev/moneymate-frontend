import React from 'react';
import styled, { css } from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { capitalize } from 'lodash';

import { paths } from '@/shared/config';
import { Block, Text } from '@/shared/ui';

type Props = {
  style?: Record<string, string>;
};

const NAV_ITEMS_LIST = [
  {
    name: capitalize(paths.dashboard.pathname),
    pathname: paths.dashboard.pathname,
  },
  {
    name: capitalize(paths.transactions.pathname),
    pathname: paths.transactions.pathname,
  },
];

export const Nav = ({ style }: Props) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <StyledRoot style={style}>
      {NAV_ITEMS_LIST.map((item) => (
        <StyledNavButton
          key={item.pathname}
          isActive={item.pathname === route.name}
          onPress={() => navigation.navigate(item.pathname as never)}
        >
          <StyledText isActive={item.pathname === route.name}>{item.name}</StyledText>
        </StyledNavButton>
      ))}
    </StyledRoot>
  );
};

const StyledRoot = styled.View`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 150px;
`;

const StyledText = styled(Text)<{ isActive: boolean }>`
  text-align: center;

  ${({ isActive }) =>
    isActive &&
    css`
      color: #637ae2;
    `}
`;

const StyledNavButton = styled(Block)<{ isActive: boolean }>`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  opacity: 0.4;
  ${({ isActive }) =>
    isActive &&
    css`
      opacity: 1;
    `}
`;
