// Types
import { Story } from './story.model';

// π¨ NOTE: Image hosting is hard.
// Let's start with movies and hot-linked images.
export const stories: Story[] = [
  {
    id: 0,
    hint: 'π§π»πΊπ΅',
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
    hint: 'π§βοΈβοΈ',
    title: 'Frozen',
    color: '#d3f8ff',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_.jpg',
    },
  },
  {
    id: 2,
    hint: 'π§π΄π',
    title: 'Frozen 2',
    color: '#b0ffff',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_.jpg',
    },
  },
  {
    id: 3,
    hint: 'π¦π»π§π»π§ββοΈ',
    title: 'Aladdin',
    color: '#313cb9',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BY2Q2NDI1MjUtM2Q5ZS00MTFlLWJiYWEtNTZmNjQ3OGJkZDgxXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_.jpg',
    },
  },
  {
    id: 4,
    hint: 'πΈπ§πͺ‘',
    title: 'Sleeping Beauty',
    color: '#fd1ca1',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BOTJmZjA3MjMtMWNmZS00YTliLWFhMWUtZDU2NGJhNTlmY2ZkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    },
  },
  {
    id: 5,
    hint: 'πΈπ­π',
    title: 'Cinderella',
    color: '#8bbedd',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BOGU0NGQ1MzEtODIwZS00YTdiLWJhMzQtN2RkN2YzNGVjNDZkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    },
  },
  {
    id: 6,
    hint: 'π§π»πΉπΊ',
    title: 'Beauty and the Beast',
    color: '#e1ce10',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BMzE5MDM1NDktY2I0OC00YWI5LTk2NzUtYjczNDczOWQxYjM0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    },
  },
  {
    id: 7,
    hint: 'π§βοΈπ§π»',
    title: 'Tangled',
    color: '#ebafcf',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BMTAxNDYxMjg0MjNeQTJeQWpwZ15BbWU3MDcyNTk2OTM@._V1_.jpg',
    },
  },
  {
    id: 8,
    hint: 'π§π»ββοΈπ π¦',
    title: 'The Little Mermaid',
    color: '#6baf4f',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BN2JlZTBhYTEtZDE3OC00NTA3LTk5NTQtNjg5M2RjODllM2M0XkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_.jpg',
    },
  },
  {
    id: 9,
    hint: 'π°πΉπ»',
    title: 'Brave',
    color: '#be6627',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BMzgwODk3ODA1NF5BMl5BanBnXkFtZTcwNjU3NjQ0Nw@@._V1_.jpg',
    },
  },
  {
    id: 10,
    hint: 'π¦π³π',
    title: 'The Lion King',
    color: '#f7b501',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_.jpg',
    },
  },
  {
    id: 11,
    hint: 'π§π»πΈπ',
    title: 'Lilo & Stitch',
    color: '#7e96cb',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BMTkwOTU5MTA2M15BMl5BanBnXkFtZTYwMjYyNTc3._V1_.jpg',
    },
  },
  {
    id: 12,
    hint: 'π§π»ππͺ',
    title: 'Moana',
    color: '#56d7b0',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_.jpg',
    },
  },
  {
    id: 13,
    hint: 'π§π»ππ€΄πΌ',
    title: 'Snow White and the Seven Dwarfs',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BMTQwMzE2Mzc4M15BMl5BanBnXkFtZTcwMTE4NTc1Nw@@._V1_.jpg',
    },
  },
  {
    id: 14,
    hint: 'πππ¦',
    title: 'Despicable Me',
    color: '#f2df92',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BMTY3NjY0MTQ0Nl5BMl5BanBnXkFtZTcwMzQ2MTc0Mw@@._V1_.jpg',
    },
  },
  {
    id: 15,
    hint: 'π¦π’π§',
    title: 'Madagascar',
    color: '#949a55',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BN2I5YzFlYWEtZjRhNy00ZmQzLWJhNTktZGIwYjFjODdmNDgxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    },
  },
  {
    id: 16,
    hint: 'π¦πͺπ―',
    title: 'Madagascar 3',
    color: '#e37b23',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BZjEzYTZjMmYtZGRjMy00ZGNjLThkMzAtY2Y4Y2E5YWYxNWU2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg',
    },
  },
  {
    id: 17,
    hint: 'π¦π»ππ§π»',
    title: 'Wish Dragon',
    color: '#ee358a',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BNDg0N2NiZTAtZWVjNy00YmJlLWI0NDktMjFkMmRiZGIyNzRmXkEyXkFqcGdeQXVyMTA1OTcyNDQ4._V1_.jpg',
    },
  },
  {
    id: 18,
    hint: 'π§π»ππ',
    title: 'Raya and the Last Dragon',
    color: '#9bdfe2',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BZWNiOTc4NGItNGY4YS00ZGNkLThkOWEtMDE2ODcxODEwNjkwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
  },
];
