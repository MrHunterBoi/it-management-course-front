import { IGenre } from './genre';
import { ITag } from './tag';

export interface IPoem {
  id: number;
  creator: ICreator;
  created_at: string;
  description: string;
  genre: IGenre;
  image: string;
  tags: ITag[];
  title: string;
  views_counter: number;
}

export interface ICreator {
  id: number;
  subscribers_counter: number;
  total_likes_counter: number;
  total_story_views_counter: number;
  writer_pseudo: string;
}
