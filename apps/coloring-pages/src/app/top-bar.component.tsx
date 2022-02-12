import { FC } from 'react';

// Third parties
import styled from 'styled-components';

// Configuration
import { colorPickerHeightInRem } from './color-picker.component';
import { colors } from './colors';

// Hooks
import { useAppContext } from './context/use-app-context.hook';

// Types
import { Drawing } from './context/app.context';

export const TopBar: FC = () => {
  const {
    currentColor: { code: currentColorCode },
    setCurrentColor,
    setDrawing,
  } = useAppContext();

  const updateState = (drawing: Drawing) => {
    setDrawing(drawing);
    setCurrentColor(colors[colors.length - 1]);
  }

  return (
    <Container>
      <CurrentColor color={currentColorCode} />
      <PickElsa onClick={() => updateState('elsa')}>Elsa</PickElsa>
      <PickAnna onClick={() => updateState('anna')}>Anna</PickAnna>
    </Container>
  );
};

const Container = styled.header`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  height: ${colorPickerHeightInRem / 2}rem;
`;

const CurrentColor = styled.aside<{ color: string }>`
  content: ' ';
  background-color: ${({ color }) => color};
`;

const PickButton = styled.button`
  border: none;
  display: inline-block;
  font-family: sans-serif;
  font-weight: bold;
  cursor: pointer;
  color: #000000;
`;

const PickAnna = styled(PickButton)`
  background-color: #cc2a86;
`;

const PickElsa = styled(PickButton)`
  background-color: #7debff;
`;
