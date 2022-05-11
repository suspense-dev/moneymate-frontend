import React from 'react';
import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

import { Button, Modal } from '@/shared/ui';
import { ExpenseSourceModel } from '@/entities/expense-source';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const AddExpenseModal = ({ isVisible, onClose }: Props) => {
  const [value, setValue] = React.useState<string>('');

  const handleSubmit = () => {
    ExpenseSourceModel.create(value);
    onClose();
  };

  return (
    <Modal title="Put name for a new expense source" isVisible={isVisible} onClose={onClose}>
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
