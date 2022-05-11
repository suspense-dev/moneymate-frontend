import React from 'react';
import { Animated, Easing } from 'react-native';

interface Props {
  children: React.ReactNode;
  isVisible: boolean;
  style?: any;
  duration?: number;
  onEntered?: () => any;
  onLeave?: () => any;
}

export const AnimationFade = ({ children, style, duration = 100, isVisible, onEntered, onLeave }: Props) => {
  const animation = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && onEntered) {
        setTimeout(onEntered, duration);
      }
    });
  };

  const fadeOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (onLeave && finished) {
        setTimeout(onLeave, duration);
      }
    });
  };

  React.useEffect(() => {
    if (isVisible) {
      fadeIn();
    } else {
      fadeOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const AnimatedComponent = Animated.View;

  return (
    <AnimatedComponent style={[style, { opacity: animation }]} pointerEvents={isVisible ? 'auto' : 'none'}>
      {children}
    </AnimatedComponent>
  );
};
