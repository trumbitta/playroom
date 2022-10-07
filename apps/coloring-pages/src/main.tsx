import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

// Third Parties
import { Normalize } from 'styled-normalize';

// Components
import { App } from './app/app.component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Normalize />
    <App />
  </StrictMode>
);
