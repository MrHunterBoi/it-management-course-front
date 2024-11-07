import { IGenre } from '../types/genre';

const totallyNotFakeData: IGenre[] = [
  {
    id: 1,
    genre: 'Horror',
  },
  {
    id: 2,
    genre: 'Fantasy',
  },
  {
    id: 3,
    genre: 'Thriller',
  },
  {
    id: 4,
    genre: 'Romance',
  },
  {
    id: 5,
    genre: 'Drama',
  },
  {
    id: 6,
    genre: 'Comedy',
  },
  {
    id: 7,
    genre: 'Action',
  },
  {
    id: 8,
    genre: 'Mystery',
  },
  {
    id: 9,
    genre: 'Sci-Fi',
  },
  {
    id: 10,
    genre: 'Adventure',
  }
];

export const fetchGenres = async (): Promise<IGenre[]> => {
  // TODO: Change to an actual request
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(totallyNotFakeData);
    }, 1000);
  });
};
