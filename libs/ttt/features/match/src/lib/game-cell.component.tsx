import { MouseEventHandler, useCallback } from 'react';

// Third parties
import styled from 'styled-components';

// Libs
import { CellValue } from '@playroom/ttt/shared/types';

// Hooks
import { useCellDisplay } from './use-cell-display.hook';

export type GameCellProps = {
  index: number;
  onMove: (cellIndex: number) => void;
  value: CellValue;
};

export const GameCell = ({ index, onMove, value }: GameCellProps) => {
  const { valueToDisplay } = useCellDisplay();

  const handleClick: MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      event.preventDefault();

      onMove(index);
    },
    [index, onMove]
  );

  return <Cell onClick={handleClick}>{valueToDisplay(value)}</Cell>;
};

const Cell = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  border: 1px solid black;
  border-collapse: collapse;
  margin: 0.05rem;
  border-radius: 0.1rem;
`;
