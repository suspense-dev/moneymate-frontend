import React from 'react';

import { NumpadSource } from '../numpad.types';

type UseNumpadState = {
  from: NumpadSource | null;
  to: NumpadSource | null;
  amount: number | null;
};

type SetNumpadStateBody = {
  from: NumpadSource;
  to: NumpadSource;
  amount: number;
};

type SetNumpadState = {
  (data: Partial<SetNumpadStateBody>): void;
};

type ClearNumpadState = {
  (): void;
};

type UseKeyboardHandlers = {
  setKeyboardState: SetNumpadState;
  clearKeyboardState: ClearNumpadState;
};

export const useNumpad = (): [UseNumpadState, UseKeyboardHandlers] => {
  const [keyboardFrom, setFrom] = React.useState<NumpadSource | null>(null);
  const [keyboardTo, setTo] = React.useState<NumpadSource | null>(null);
  const [keyboardAmount, setAmount] = React.useState<number | null>(null);

  const setKeyboardState = (data: Partial<SetNumpadStateBody>): void => {
    if (data.from && data.from !== keyboardFrom) setFrom(data.from);
    if (data.to && data.to !== keyboardTo) setTo(data.to);
    if (data.amount && data.amount !== keyboardAmount) setAmount(data.amount);
  };

  const clearKeyboardState = (): void => {
    setFrom(null);
    setTo(null);
    setAmount(null);
  };

  return [
    { from: keyboardFrom, to: keyboardTo, amount: keyboardAmount },
    { setKeyboardState, clearKeyboardState },
  ];
};
