import { IPoem } from '../types/poem';

const totallyNotFakeData: IPoem[] = [
  {
    created_at: '6 months ago',
    creator: {
      id: 1,
      subscribers_counter: 23,
      total_likes_counter: 56,
      total_story_views_counter: 12,
      writer_pseudo: 'John Doe',
    },
    description: 'Amazing description',
    genre: {
      genre: 'Horror',
      id: 1,
    },
    id: 2,
    image: 'https://media1.tenor.com/m/E-u6yuhVldsAAAAd/fireflysegsalarm-star-rail.gif',
    tags: [
      {
        id: 1,
        tag: 'tag1',
      },
      {
        id: 2,
        tag: 'tag2',
      },
    ],
    title: 'The title',
    views_counter: 12,
  },
  {
    created_at: '8 months ago',
    creator: {
      id: 2,
      subscribers_counter: 323,
      total_likes_counter: 5456,
      total_story_views_counter: 1234,
      writer_pseudo: 'Jane Doe',
    },
    description: 'Epic description',
    genre: {
      genre: 'Fantasy',
      id: 2,
    },
    id: 1,
    image: 'https://media1.tenor.com/m/E-u6yuhVldsAAAAd/fireflysegsalarm-star-rail.gif',
    tags: [
      {
        id: 1,
        tag: 'tag1',
      },
      {
        id: 3,
        tag: 'tag3',
      },
    ],
    title: 'The amazing title',
    views_counter: 12312,
  },
  {
    created_at: '4 months ago',
    creator: {
      id: 3,
      subscribers_counter: 2,
      total_likes_counter: 4,
      total_story_views_counter: 7,
      writer_pseudo: 'Random Person',
    },
    description: 'Description',
    genre: {
      genre: 'Thriller',
      id: 3,
    },
    id: 3,
    image: 'https://media1.tenor.com/m/E-u6yuhVldsAAAAd/fireflysegsalarm-star-rail.gif',
    tags: [
      {
        id: 1,
        tag: 'tag1',
      },
      {
        id: 2,
        tag: 'tag2',
      },
      {
        id: 3,
        tag: 'tag3',
      },
    ],
    title: 'Title',
    views_counter: 2,
  },
];

export const fetchPoems = async (): Promise<IPoem[]> => {
  // TODO: Change to an actual request
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(totallyNotFakeData);
    }, 1000);
  });
};
