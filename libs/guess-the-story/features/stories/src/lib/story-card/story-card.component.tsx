import { useState } from 'react';

// Third parties
import { readableColor } from 'polished';
import styled from 'styled-components';

// Libs
import { Story } from '@playroom/guess-the-story/data';

// Components
import { StoryCardDetails } from './story-card-details.component';

// Types
import { StoryCardProps } from './story-card.props';

export const StoryCard = ({ color, hint, ...rest }: StoryCardProps) => {
  const [isSolutionVisible, setIsSolutionVisible] = useState(false);

  return (
    <Container color={color} onClick={() => setIsSolutionVisible(true)}>
      <Hint>{hint}</Hint>
      {isSolutionVisible ? <StoryCardDetails {...rest} /> : null}
    </Container>
  );
};

const defaultBackgroundColor = '#cccccc';

const Container = styled.article<Pick<Story, 'color'>>`
  background-color: ${({ color = defaultBackgroundColor }) => color};
  color: ${({ color = defaultBackgroundColor }) => readableColor(color)};
  display: grid;
  align-content: center;
  text-align: center;
  height: 100vh;
  cursor: pointer;
`;

const emojiGap = '0.5em';

const Hint = styled.span`
  font-size: 4rem;
  letter-spacing: ${emojiGap};
  margin-right: -${emojiGap};
`;
