import React from 'react';
import { Animated, Easing } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: any;
  isVisible: boolean;
  movement?: MOVEMENT;
  duration?: number;
}

type MOVEMENT = 'toTop' | 'toBottom';

export const AnimationSlide: React.FunctionComponent<Props> = ({
  children,
  style,
  isVisible,
  duration = 100,
  movement = 'toTop',
}: Props) => {
  const animation = React.useRef(new Animated.Value(0)).current;

  const slideIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration,
      easing: Easing.in(Easing.linear),
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration,
      easing: Easing.out(Easing.linear),
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    if (isVisible) {
      slideIn();
    } else {
      slideOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const AnimatedComponent = Animated.View;

  return (
    <AnimatedComponent
      style={[
        style,
        {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [movement === 'toTop' ? 40 : 40 * -1, 0],
              }),
            },
          ],
        },
      ]}
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      {children}
    </AnimatedComponent>
  );
};
