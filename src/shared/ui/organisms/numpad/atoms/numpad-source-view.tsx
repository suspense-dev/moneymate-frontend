import React from 'react';
import { TouchableWithoutFeedbackProps } from 'react-native';
import styled from 'styled-components/native';

import { Block, Text } from '../../../atoms';

type Props = TouchableWithoutFeedbackProps & {
  name: string;
  style?: Record<string, string>;
};

export const NumpadSourceView = ({ name, ...rest }: Props) => (
  <StyledRoot {...rest}>
    <Text>{name}</Text>
  </StyledRoot>
);

const StyledRoot = styled(Block)`
  height: 70px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
