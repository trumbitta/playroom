// Configuration
import { createContext } from 'react';
import { Color, colors } from '../colors';

export type Drawing = 'anna' | 'elsa';

export interface AppContextType {
  currentColor: Color;
  drawing: Drawing;
  setCurrentColor: (color: Color) => void;
  setDrawing: (drawing: Drawing) => void;
}

export const defaultAppContext: AppContextType = {
  currentColor: colors[colors.length - 1],
  drawing: 'anna',
  setCurrentColor: () => null,
  setDrawing: () => null,
};

export const AppContext = createContext<AppContextType>(defaultAppContext);
AppContext.displayName = 'AppContext';
