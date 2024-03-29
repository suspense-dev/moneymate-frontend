import React from 'react';
import styled, { css } from 'styled-components/native';

import { Block, Text } from '../../../atoms';

type Props = {
  text: string | number;
  style?: Record<string, string>;

  isDisabled?: boolean;
  onPress?: (value: string) => any;
  onLongPress?: () => any;
};

type RootProps = {
  isDisabled: boolean;
  isPressed: boolean;
};

export const NumpadSymbol: React.FunctionComponent<Props> = ({
  text,
  style,
  isDisabled = false,
  onPress,
  onLongPress,
}: Props) => {
  const [isPressed, setPressed] = React.useState<boolean>(false);

  return (
    <StyledRoot
      style={style}
      isPressed={isPressed}
      isDisabled={isDisabled}
      onPressIn={!isDisabled && onPress ? () => setPressed(true) : undefined}
      onPressOut={!isDisabled && onPress ? () => setPressed(false) : undefined}
      onPress={!isDisabled && onPress ? () => onPress(String(text)) : undefined}
      onLongPress={onLongPress ? () => onLongPress() : undefined}
    >
      <StyledTextWrapper>
        <StyledText>{text}</StyledText>
      </StyledTextWrapper>
    </StyledRoot>
  );
};

const StyledRoot = styled(Block)<RootProps>`
  position: relative;
  ${({ isPressed }) =>
    isPressed &&
    css`
      background: gray;
    `}
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.4;
    `}
`;

const StyledTextWrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled(Text)`
  font-size: 18px;
`;
