// Types
import { Story } from './story.model';

// 🚨 NOTE: Image hosting is hard.
// Let's start with movies and hot-linked images.
export const stories: Story[] = [
  {
    id: 0,
    hint: '👧🏻🐺👵',
    title: 'Little Red Riding Hood',
    color: '#b11b1b',
    image: {
      url: 'https://cdn.pixabay.com/photo/2016/01/09/14/02/little-red-riding-hood-1130258_1280.jpg',
      attribution: {
        author: {
          name: 'Kevin Phillips',
          url: 'https://pixabay.com/users/27707-27707/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1130258',
        },
        source: {
          description: 'Pixabay',
          url: 'https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1130258',
        },
      },
    },
  },
  {
    id: 1,
    hint: '👧⛄️❄️',
    title: 'Frozen',
    color: '#d3f8ff',
    imdbUrl: 'https://www.imdb.com/title/tt2294629/',
  },
  {
    id: 2,
    hint: '👧🐴🌊',
    title: 'Frozen 2',
    color: '#b0ffff',
    imdbUrl: 'https://www.imdb.com/title/tt4520988/',
  },
  {
    id: 3,
    hint: '👦🏻👧🏻🧞‍♂️',
    title: 'Aladdin',
    color: '#313cb9',
    imdbUrl: 'https://www.imdb.com/title/tt0103639/',
  },
  {
    id: 4,
    hint: '👸🧚🪡',
    title: 'Sleeping Beauty',
    color: '#fd1ca1',
    imdbUrl: 'https://www.imdb.com/title/tt0053285/',
  },
  {
    id: 5,
    hint: '👸🐭🎃',
    title: 'Cinderella',
    color: '#8bbedd',
    imdbUrl: 'https://www.imdb.com/title/tt0042332/',
  },
  {
    id: 6,
    hint: '👧🏻🌹🐺',
    title: 'Beauty and the Beast',
    color: '#e1ce10',
    imdbUrl: 'https://www.imdb.com/title/tt0101414/',
  },
  {
    id: 7,
    hint: '👧✂️👧🏻',
    title: 'Tangled',
    color: '#e5a3c9',
    imdbUrl: 'https://www.imdb.com/title/tt0398286/',
  },
  {
    id: 8,
    hint: '🧜🏻‍♀️🐠🦀',
    title: 'The Little Mermaid',
    color: '#6baf4f',
    imdbUrl: 'https://www.imdb.com/title/tt0103477/',
  },
];
