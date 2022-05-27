import React, { ReactNode } from 'react';
import { Portal } from 'react-native-paper';
import styled from 'styled-components/native';

import { AnimationFade, AnimationSlide, Block, Text } from '../atoms';

type ModalViewProps = {
  title: ReactNode;
  style?: Record<string, string>;
  children?: React.ReactNode;

  onClose?: () => any;
};

type ModalProps = ModalViewProps & {
  isOpened: boolean;
};

// TODO: использовать VirtualizedList для оптимизации
const ModalView = ({ style, title, children, onClose }: ModalViewProps) => {
  const [isModalVisible, setModalVisible] = React.useState<boolean>(true);

  return (
    <Portal>
      <StyledAnimationFade style={style} isVisible={isModalVisible} onLeave={onClose}>
        <StyledBackground onPress={() => setModalVisible(false)} />
        <StyledAnimationSlide isVisible={isModalVisible} movement="toTop">
          <StyledHeader>
            <StyledTitle>{title}</StyledTitle>
          </StyledHeader>
          <StyledContent>{children}</StyledContent>
        </StyledAnimationSlide>
      </StyledAnimationFade>
    </Portal>
  );
};

export const Modal = ({ isOpened, onClose, ...rest }: ModalProps) => {
  if (!isOpened || !onClose) {
    return null;
  }
  return <ModalView onClose={onClose} {...rest} />;
};

const StyledAnimationFade = styled(AnimationFade)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const StyledAnimationSlide = styled(AnimationSlide)`
  background: #fff;
  width: 70%;
  max-height: 80%;
`;

const StyledContent = styled.ScrollView`
  padding: 20px;
`;

const StyledHeader = styled.View`
  padding: 15px 20px;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
`;

const StyledTitle = styled(Text)`
  font-size: 16px;
`;

const StyledBackground = styled(Block)`
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
