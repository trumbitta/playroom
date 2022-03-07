import styled from 'styled-components';

// Types
import { StoryCardProps } from './story-card.props';

export type StoryCardDetailsProps = Omit<StoryCardProps, 'color' | 'hint'>;

export const StoryCardDetails = ({
  title,
  image,
  imdbUrl,
}: StoryCardDetailsProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      {image ? <Image src={image.url.toString()} alt={title} /> : null}
      {imdbUrl ? (
        <Link href={imdbUrl.toString()} rel="noopener noreferrer">
          ImDB{' '}
          <span role="img" aria-label="Go to website">
            ↗️
          </span>
        </Link>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  overflow-y: scroll;
`;

const Title = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0.5rem 0;
`;

const Image = styled.img`
  width: 100%;
`;

const Link = styled.a`
  display: inline-block;
  padding: 1em 2.5em;
  border-radius: 0.25em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: lightseagreen;
  color: white;
  text-decoration: none;
  font-weight: 700;
`;
