import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

// Third parties
import { BrowserRouter } from 'react-router-dom';
import { Normalize } from 'styled-normalize';

// Components
import { App } from './app/app.component';

ReactDOM.render(
  <StrictMode>
    <Normalize />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
