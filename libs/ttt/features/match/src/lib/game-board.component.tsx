import { ReactNode } from 'react';

// Third parties
import styled from 'styled-components';

// Libs
import { MoveValue } from '@playroom/ttt/shared/types';

// Hooks
import { useCellDisplay } from './use-cell-display.hook';

export type GameBoardProps = {
  children: ReactNode;
  winner: MoveValue | null;
};

export const GameBoard = ({ children, winner }: GameBoardProps) => {
  const { valueToDisplay } = useCellDisplay();

  return (
    <>
      {winner !== null ? <p>Winner: {valueToDisplay(winner)}</p> : null}
      <Board>{children}</Board>
    </>
  );
};

const Board = styled.article`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  aspect-ratio: calc(1 / 1);
`;
