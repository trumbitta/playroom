// Third Parties
import { createSelector } from '@reduxjs/toolkit';

// State
import { AppState } from '../store';
import { matchFeatureName } from './match.slice';

export const selectMatch = (state: AppState) => state[matchFeatureName];

export const selectMatchBoard = createSelector(
  [selectMatch],
  (state) => state.board
);

export const selectMatchNowMoving = createSelector(
  [selectMatch],
  (state) => state.nowMoving
);

export const selectMatchWinner = createSelector(
  [selectMatch],
  (state) => state.winner
);
