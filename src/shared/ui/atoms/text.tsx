import React from 'react';
import styled from 'styled-components/native';

type Weight = 200 | 300 | 400 | 500 | 600 | 800;

type Props = {
  style?: Record<string, string>;
  children: React.ReactNode;
  weight?: Weight;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  numberOfLines?: number;
  onPress?: () => void;
};

export const Text: React.FunctionComponent<Props> = ({ style, children, weight = 500, ...rest }: Props) => (
  <StyledRoot {...rest} style={[{ fontFamily: `Gilroy${weight}` }, style]}>
    {children}
  </StyledRoot>
);

const StyledRoot = styled.Text`
  font-size: 14px;
  letter-spacing: 1px;
`;
