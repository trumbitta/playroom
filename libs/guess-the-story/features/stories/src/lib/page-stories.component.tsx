// Third parties
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Libs
import { useStories } from '@playroom/guess-the-story/data';

// Components
import { StoryCard } from './story-card';

export const PageStories = () => {
  const { stories } = useStories();

  return (
    <Swiper>
      {stories.map(({ id, ...rest }) => (
        <SwiperSlide>
          <StoryCard {...rest} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
