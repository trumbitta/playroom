import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

// Third parties
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

// Libs
import { initStore } from '@playroom/ttt/state';
import { globalStyleMixin } from '@playroom/ttt/ui';

// Components
import { App } from './app/app.component';

const { store, persistor } = initStore();

const GlobalStyle = createGlobalStyle`
  html, body, #app-root {
    height: 100%;
  }

  ${globalStyleMixin}
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Normalize />

    <GlobalStyle />

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
