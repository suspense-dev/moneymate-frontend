import React from 'react';
import { Text } from '@/shared/ui';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

type Props = {
  style?: Record<string, string>;
};

export const Nav = ({ style }: Props) => {
  const navigation = useNavigation();

  return (
    <StyledRoot style={style}>
      <StyledText onPress={() => navigation.navigate({ name: 'Dashboard' as never, key: 'Dashboard' })}>
        Dashboard
      </StyledText>
      <StyledText onPress={() => navigation.navigate({ name: 'Transactions' as never, key: 'Transactions' })}>
        Transactions
      </StyledText>
    </StyledRoot>
  );
};

const StyledRoot = styled.View`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 70px;
`;

const StyledText = styled(Text)`
  text-align: center;
  flex: 1;
`;
