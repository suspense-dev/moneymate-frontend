import React from 'react';
import styled from 'styled-components/native';

import { NumpadSymbol } from '../atoms';

interface Props {
  style?: Record<string, string>;

  isSubmitDisabled: boolean;
  onSubmit: () => any;
  onRemove: () => any;
  onLongRemove: () => any;
}

export const NumpadControls: React.FunctionComponent<Props> = ({
  style,
  isSubmitDisabled,
  onSubmit,
  onRemove,
  onLongRemove,
}: Props) => (
  <StyledRoot style={style}>
    <StyledSymbolButton text="Remove" onPress={onRemove} onLongPress={onLongRemove} />
    <StyledSymbolButton text="Enter" onPress={onSubmit} isDisabled={isSubmitDisabled} />
  </StyledRoot>
);

const StyledRoot = styled.View`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`;

const StyledSymbolButton = styled(NumpadSymbol)`
  flex: 1;
  padding-top: 75%;
`;
