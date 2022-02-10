import { FC } from 'react';

// Third parties
import styled from 'styled-components';

// Configuration
import { colorPickerHeightInRem } from './color-picker.component';

// Hooks
import { useAppContext } from './context/use-app-context.hook';

export const TopBar: FC = () => {
  const {
    currentColor: { code: currentColorCode },
    setDrawing,
  } = useAppContext();

  return (
    <Container>
      <CurrentColor color={currentColorCode} />
      <PickElsa onClick={() => setDrawing('elsa')}>Elsa</PickElsa>
      <PickAnna onClick={() => setDrawing('anna')}>Anna</PickAnna>
    </Container>
  );
};

const Container = styled.header`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
`;

const CurrentColor = styled.aside<{ color: string }>`
  content: ' ';
  height: ${colorPickerHeightInRem / 4}rem;
  background-color: ${({ color }) => color};
`;

const PickButton = styled.button`
  border: none;
  height: ${colorPickerHeightInRem / 4}rem;
  display: inline-block;
  font-family: sans-serif;
  font-weight: bold;
  cursor: pointer;
`;

const PickAnna = styled(PickButton)`
  background-color: #cc2a86;
`;

const PickElsa = styled(PickButton)`
  background-color: #7debff;
`;
