import { useContext } from 'react';

// Context
import { AppContext, AppContextType } from './app.context';

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'useAppContext must be used from within a AppContextProvider'
    );
  }

  return context;
};
