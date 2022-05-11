import React from 'react';
import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

import { Button, Modal } from '@/shared/ui';
import { IncomeSourceModel } from '@/entities/income-source';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const AddIncomeModal = ({ isVisible, onClose }: Props) => {
  const [value, setValue] = React.useState<string>('');

  const handleSubmit = () => {
    IncomeSourceModel.create(value);
    onClose();
  };

  return (
    <Modal title="Put name for a new income source" isVisible={isVisible} onClose={onClose}>
      <StyledRoot>
        <StyledTextInput label="Name" value={value} onChangeText={setValue} accessibilityTraits="" dense />
        <StyledButton onPress={handleSubmit}>Create</StyledButton>
      </StyledRoot>
    </Modal>
  );
};

const StyledRoot = styled.View``;

const StyledTextInput = styled(TextInput)`
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
`;
