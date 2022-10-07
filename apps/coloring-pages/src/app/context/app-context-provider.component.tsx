import { useMemo, useState } from 'react';

// Configuration
import { Color, colors } from '../colors';

// Types
import { AppContext, AppContextType, Drawing } from './app.context';

export const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [currentColor, setCurrentColor] = useState<Color>(
    colors[colors.length - 1]
  );

  const [drawing, setDrawing] = useState<Drawing>('anna');

  const value = useMemo<AppContextType>(
    () => ({ currentColor, setCurrentColor, drawing, setDrawing }),
    [currentColor, drawing]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
