// Third Parties
import styled from 'styled-components';

// Components
import { ColorPicker, colorPickerHeightInRem } from './color-picker.component';
import { ColoringPage } from './coloring-page.component';
import { TopBar } from './top-bar.component';

// Configurations
import { AppContextProvider } from './context/app-context-provider.component';

export const App = () => {
  return (
    <AppContextProvider>
      <Container>
        <TopBar />
        <ColoringPageStyled />
        <ColorPicker />
      </Container>
    </AppContextProvider>
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
