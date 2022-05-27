import React, { ReactNode } from 'react';
import { TouchableWithoutFeedback, TouchableWithoutFeedbackProps, View } from 'react-native';

type Props = TouchableWithoutFeedbackProps & {
  style?: Record<string, any>;
  children?: ReactNode;
};

export const Block = ({ style, children, onPress }: Props) => {
  if (onPress) {
    return (
      <TouchableWithoutFeedback delayPressIn={0} onPress={onPress}>
        <View style={style}>{children}</View>
      </TouchableWithoutFeedback>
    );
  }

  return <View style={style}>{children}</View>;
};
