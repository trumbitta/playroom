import { FC } from 'react';

// Third Parties
import VisuallyHidden from '@reach/visually-hidden';
import styled from 'styled-components';

// Configurations
import { colors } from './colors';

// Hooks
import { useAppContext } from './context/use-app-context.hook';

export const ColorPicker: FC = () => {
  const { setCurrentColor } = useAppContext();

  return (
    <article>
      <ColorList>
        {colors.map((color) => (
          <li key={color.code} onClick={() => setCurrentColor(color)}>
            <ColorButton color={color.code}>
              <VisuallyHidden>{color.name}</VisuallyHidden>
            </ColorButton>
          </li>
        ))}
      </ColorList>
    </article>
  );
};

export const colorPickerHeightInRem = 6;

const ColorList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

const ColorButton = styled.button<{ color: string }>`
  width: 100%;
  height: ${colorPickerHeightInRem / 2}rem;
  border-radius: 0;
  border: none;
  background-color: ${({ color }) => color};
  cursor: pointer;
`;
