import { useState } from 'react';

// Third parties
import { readableColor } from 'polished';
import styled, { css } from 'styled-components';

// Libs
import { Story } from '@playroom/guess-the-story/data';

// Components
import { StoryCardDetails } from './story-card-details.component';

// Types
import { StoryCardProps } from './story-card.props';

export const StoryCard = ({ color, hint, ...rest }: StoryCardProps) => {
  const [isSolutionVisible, setIsSolutionVisible] = useState(false);

  return (
    <Container
      isSolutionVisible={isSolutionVisible}
      color={color}
      onClick={() => setIsSolutionVisible(true)}
    >
      <Hint isSmall={isSolutionVisible}>{hint}</Hint>
      {isSolutionVisible ? <StoryCardDetails {...rest} /> : null}
    </Container>
  );
};

const defaultBackgroundColor = '#cccccc';

const Container = styled.article<
  Pick<Story, 'color'> & { isSolutionVisible: boolean }
>`
  background-color: ${({ color = defaultBackgroundColor }) => color};
  color: ${({ color = defaultBackgroundColor }) => readableColor(color)};
  display: grid;
  ${({ isSolutionVisible }) =>
    isSolutionVisible &&
    css`
      grid-template-rows: 2rem auto;
    `}
  align-content: center;
  text-align: center;
  height: 100vh;
  cursor: pointer;
`;

const emojiGap = '0.5em';

const Hint = styled.p<{ isSmall: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ isSmall }) => (isSmall ? '1rem' : '4rem')}};
  letter-spacing: ${emojiGap};
  margin: 0 -${emojiGap} 0 0;
`;
