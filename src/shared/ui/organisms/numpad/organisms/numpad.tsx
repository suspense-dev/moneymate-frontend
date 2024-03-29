import React, { useState } from 'react';
import { Portal } from 'react-native-paper';
import styled from 'styled-components/native';
import { observer } from 'mobx-react';

import { CurrencyVO, MoneyVO, Vibration } from '@/shared/lib';

import { AnimationFade, AnimationSlide, Block } from '../../../atoms';
import { NumpadOutput, NumpadSourceView } from '../atoms';
import { NumpadControls, NumpadKeys } from '../molecules';

export type NumpadSource = {
  id: string;
  name: string;
  currency: CurrencyVO;
};

export type NumpadSubmitParams = {
  from: NumpadSource;
  to: NumpadSource;
  amount: MoneyVO;
};

type Props = {
  isVisible: boolean;
  from: NumpadSource;
  to: NumpadSource;
  amount: MoneyVO;

  onClickFrom?: () => void;
  onClickTo?: () => void;
  onSubmit: (data: NumpadSubmitParams) => Promise<void> | void;
  onClose?: () => void;
  onLeave?: () => void;
};

const INITIAL_INPUT_VALUE = '0';

export const Numpad = observer(
  ({ isVisible, from, to, amount, onClickFrom, onClickTo, onSubmit, onClose, onLeave }: Props) => {
    const [inputCurrency] = useState<CurrencyVO>(amount.currency);
    const [inputValue, setInputValue] = useState<string>(amount.value.toString());
    const inputValueAsNumber = parseFloat(inputValue);
    const isSubmitDisabled = inputValueAsNumber <= 0;

    const handlePressKey = (value: string): void => {
      const regExp = /^(\d*\.{0,1}\d{0,18}$)/;

      if (regExp.exec(value)) {
        setInputValue(inputValue === INITIAL_INPUT_VALUE ? value : inputValue + value);
      }
    };

    const handlePressRemove = (): void => {
      const newInputValue = inputValue.slice(0, inputValue.length - 1);

      if (newInputValue.length) {
        setInputValue(newInputValue);
      } else {
        setInputValue(INITIAL_INPUT_VALUE);
      }
    };

    const handleLongPressRemove = () => {
      if (inputValue !== INITIAL_INPUT_VALUE) {
        Vibration.light();
      }

      setInputValue(INITIAL_INPUT_VALUE);
    };

    const handleLeave = () => {
      setInputValue(INITIAL_INPUT_VALUE);
      onLeave?.();
    };

    const handleSubmit = () => {
      onSubmit({
        from,
        to,
        amount: new MoneyVO(inputValueAsNumber, inputCurrency.code),
      });
      Vibration.success();
    };

    return (
      <Portal>
        <StyledAnimationFade isVisible={isVisible} onLeave={handleLeave}>
          <StyledBackground onPress={onClose} />

          <StyledAnimatedRoot isVisible={isVisible} movement="toTop">
            <StyledSourcesWrapper>
              {from && <StyledMoneySource name={from.name} onPress={onClickFrom} />}
              <StyledMoneySource name={to.name} onPress={onClickTo} />
            </StyledSourcesWrapper>

            <NumpadOutput value={`${inputValue} ${inputCurrency.sign}`} />

            <StyledNumpadControlsWrapper>
              <StyledNumpadKeys onPress={handlePressKey} />
              <StyledNumpadControls
                onRemove={handlePressRemove}
                onLongRemove={handleLongPressRemove}
                isSubmitDisabled={isSubmitDisabled}
                onSubmit={handleSubmit}
              />
            </StyledNumpadControlsWrapper>
          </StyledAnimatedRoot>
        </StyledAnimationFade>
      </Portal>
    );
  },
);

const StyledAnimationFade = styled(AnimationFade)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

const StyledSourcesWrapper = styled.View`
  display: flex;
  flex-flow: row nowrap;
`;

const StyledMoneySource = styled(NumpadSourceView)`
  flex-grow: 1;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const StyledAnimatedRoot = styled(AnimationSlide)`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  background: #fff;
  padding-bottom: 30px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const StyledBackground = styled(Block)`
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const StyledNumpadControlsWrapper = styled.View`
  height: 400px;
  display: flex;
  flex-flow: row nowrap;
`;

const StyledNumpadControls = styled(NumpadControls)`
  flex: 1;
`;

const StyledNumpadKeys = styled(NumpadKeys)`
  flex: 3;
`;
