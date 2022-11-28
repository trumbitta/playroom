import { useCallback } from 'react';

// Libs
import { CellValue } from '@playroom/ttt/shared/types';

export const useCellDisplay = () => {
  const valueToDisplay = useCallback(
    (value: CellValue) => ['⭕️', '❌', ''].at(value),
    []
  );

  return { valueToDisplay };
};
