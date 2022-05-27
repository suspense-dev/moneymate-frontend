import React, { ReactNode, useState } from 'react';
import styled from 'styled-components/native';
import _chunk from 'lodash/chunk';
import { nanoid } from 'nanoid/non-secure';

import { Block } from '../atoms';
import { Modal } from './modal';

type Props<Option> = {
  title: ReactNode;
  columns: number;
  options: Option[];

  children: (props: { open: () => void }) => ReactNode;
  renderOption: (option: Option) => ReactNode;
  onSelect: (option: Option) => any;
};

export const SelectGrid = <Option extends any>({
  children,
  title,
  columns,
  options,
  renderOption,
  onSelect,
}: Props<Option>) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleSelect = (option: Option) => {
    onSelect(option);
    setIsOpened(false);
  };

  return (
    <>
      <Modal isOpened={isOpened} title={title} onClose={() => setIsOpened(false)}>
        {_chunk(options, columns).map((chunk) => (
          <StyledRow key={nanoid()}>
            {chunk.map((option: Option) => (
              <StyledCell key={nanoid()} width={100 / columns} onPress={() => handleSelect(option)}>
                {renderOption(option)}
              </StyledCell>
            ))}
          </StyledRow>
        ))}
      </Modal>
      {children({
        open: () => setIsOpened(true),
      })}
    </>
  );
};

const StyledRow = styled.View`
  display: flex;
  flex-flow: row nowrap;
`;

const StyledCell = styled(Block)<{ width: number }>`
  width: ${({ width }) => `${width}%`};
`;
