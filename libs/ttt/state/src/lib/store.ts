// Third Parties
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Features
import { matchFeatureName, matchReducer } from './match';

const rootReducer = combineReducers({
  [matchFeatureName]: matchReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const initStore = () => {
  const persistConfig = {
    key: `trumbitta-ttt`,
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  const persistor = persistStore(store);

  return {
    persistor,
    store,
  };
};
