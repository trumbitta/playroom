// Third Parties
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Libs
import { CellValue, MoveValue } from '@playroom/ttt/shared/types';

export type MoveData = {
  cellIndex: number;
};

export type MatchState = {
  board: CellValue[];
  nowMoving: MoveValue;
  winner: MoveValue | null;
};

const initialState: MatchState = {
  // prettier-ignore
  board: [
    -1, -1, -1,
    -1, -1, -1,
    -1, -1, -1
  ],
  nowMoving: 0,
  winner: null,
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    resetMatch(state) {
      return initialState;
    },
    registerMove(state, { payload: { cellIndex } }: PayloadAction<MoveData>) {
      const { board, nowMoving } = state;
      const newBoard = board.map((cellValue, index) =>
        index === cellIndex ? nowMoving : cellValue
      );

      const winner = deriveWinnerFromBoard(newBoard);
      const newState = {
        ...state,
        board: newBoard,
        winner,
      };

      return winner
        ? newState
        : {
            ...newState,
            // TypeScript wasn't happy with state.nowMoving ^ 1
            nowMoving: nowMoving === 0 ? 1 : 0,
          };
    },
  },
});

export const matchActions = matchSlice.actions;
export const { reducer: matchReducer, name: matchFeatureName } = matchSlice;

function deriveWinnerFromBoard(board: CellValue[]): MoveValue | null {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningCombinations) {
    if (board[a] !== -1 && board[a] === board[b] && board[a] === board[c]) {
      return board[a] === -1 ? null : (board[a] as MoveValue);
    }
  }

  return null;
}
