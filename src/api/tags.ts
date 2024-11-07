import { ITag } from '../types/tag';

const totallyNotFakeData: ITag[] = [
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
  {
    id: 4,
    tag: 'tag4',
  },
  {
    id: 5,
    tag: 'boss',
  },
  {
    id: 6,
    tag: 'big boss',
  },
  {
    id: 7,
    tag: 'ocelot',
  },
  {
    id: 8,
    tag: 'miller',
  },
  {
    id: 9,
    tag: 'zero',
  },
  {
    id: 10,
    tag: 'afghanistan',
  },
];

export const fetchTags = async (): Promise<ITag[]> => {
  // TODO: Change to an actual request
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(totallyNotFakeData);
    }, 1000);
  });
};
