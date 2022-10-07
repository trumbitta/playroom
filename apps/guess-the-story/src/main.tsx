import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

// Third parties
import { BrowserRouter } from 'react-router-dom';
import { Normalize } from 'styled-normalize';

// Components
import { App } from './app/app.component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Normalize />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
