import React from 'react';
import styled from 'styled-components/native';

import { NumpadSymbol } from '../atoms';

interface Props {
  style?: Record<string, string>;

  onPress: (value: string) => void;
}

const DIGITS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '', '0', ','];

export const NumpadKeys: React.FunctionComponent<Props> = ({ style, onPress }: Props) => (
  <StyledRoot style={style}>
    {DIGITS.map((digit: string) => (
      <StyledSymbolButton text={digit} onPress={digit !== '' ? onPress : undefined} key={digit} />
    ))}
  </StyledRoot>
);

const StyledRoot = styled.View`
  display: flex;
  flex-flow: row wrap;
`;

const StyledSymbolButton = styled(NumpadSymbol)`
  flex-basis: 33.3333%;
  height: 25%;
  aspect-ratio: 1;
`;
