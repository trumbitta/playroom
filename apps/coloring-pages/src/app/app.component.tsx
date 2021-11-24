import React from 'react';
import { useState } from 'react';

// Third Parties
import styled from 'styled-components';

// Components
import { ColorPicker, colorPickerHeightInRem } from './color-picker.component';
import { ColoringPage } from './coloring-page.component';

// Configurations
import { Color, colors } from './colors';

export const App = () => {
  const [currentColor, setCurrentColor] = useState<Color>(
    colors[colors.length - 1]
  );

  return (
    <Container>
      <CurrentColor color={currentColor.code} />
      <ColoringPageStyled currentColorCode={currentColor.code} />
      <ColorPicker onChooseColor={(color) => setCurrentColor(color)} />
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - ${colorPickerHeightInRem * 1.25}rem);
  text-align: center;
`;

const ColoringPageStyled = styled(ColoringPage)`
  width: auto;
  height: 100%;
`;

const CurrentColor = styled.aside<{ color: string }>`
  content: ' ';
  width: 50%;
  height: ${colorPickerHeightInRem / 4}rem;
  background-color: ${({ color }) => color};
`;
