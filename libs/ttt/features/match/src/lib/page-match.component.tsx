import { useCallback } from 'react';

// Third parties
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// Libs
import {
  matchActions,
  selectMatchBoard,
  selectMatchWinner,
} from '@playroom/ttt/state';

// Components
import { GameBoard } from './game-board.component';
import { GameCell } from './game-cell.component';

export const PageMatch = () => {
  const dispatch = useDispatch();
  const board = useSelector(selectMatchBoard);
  const winner = useSelector(selectMatchWinner);

  const resetMatch = useCallback(() => {
    dispatch(matchActions.resetMatch());
  }, [dispatch]);

  const registerMove = useCallback(
    (cellIndex: number) => {
      dispatch(matchActions.registerMove({ cellIndex }));
    },
    [dispatch]
  );

  return (
    <>
      <Header>
        <Title>TTT</Title>
        <NewGameButton onClick={resetMatch}>
          <span role="img" aria-label="">
            🔄
          </span>{' '}
          Reset match
        </NewGameButton>
      </Header>

      <Main>
        <GameBoard winner={winner}>
          {board.map((value, index) => (
            <GameCell
              key={index}
              value={value}
              onMove={registerMove}
              index={index}
            />
          ))}
        </GameBoard>
      </Main>
    </>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
  padding: 0;
`;

const Main = styled.main`
  padding: 0 1rem;
`;

const NewGameButton = styled.button`
  background-color: #fa0000;
`;
