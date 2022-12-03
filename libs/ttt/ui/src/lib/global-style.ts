// Third Parties
import { css } from 'styled-components';

export const globalStyleMixin = css`
  html,
  body {
    font-size: 20px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  em {
    font-style: italic;
  }
`;
