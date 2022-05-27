import React from 'react';
import styled from 'styled-components/native';
import { Portal } from 'react-native-paper';

import { AnimationFade, AnimationSlide, Block, Text } from '../atoms';

type ModalViewProps = {
  title: string;
  style?: Record<string, string>;
  children?: React.ReactNode;

  onClose?: () => any;
};

type ModalProps = ModalViewProps & {
  isVisible: boolean;
};

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

export const Modal: React.FunctionComponent<ModalProps> = ({ isVisible, onClose, ...rest }: ModalProps) => {
  if (!isVisible || !onClose) {
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
`;

const StyledContent = styled.View`
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
