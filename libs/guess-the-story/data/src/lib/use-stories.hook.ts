import { useMemo } from 'react';

// Configuration
import { stories } from './stories.config';

export const useStories = () => {
  const shuffled = useMemo(() => {
    for (let index = 0; index < stories.length; index++) {
      const newIndex = Math.floor(Math.random() * (index + 1));
      const swap = stories[index];
      stories[index] = stories[newIndex];
      stories[newIndex] = swap;
    }

    return { stories };
  }, []);

  return shuffled;
};
