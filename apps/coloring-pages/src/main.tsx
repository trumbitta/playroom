import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

// Third Parties
import { Normalize } from 'styled-normalize';

// Components
import { App } from './app/app.component';

ReactDOM.render(
  <StrictMode>
    <Normalize />
    <App />
  </StrictMode>,
  document.getElementById('root')
);
