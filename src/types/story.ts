import { IGenre } from './genre';
import { ITag } from './tag';
import { IUser } from './user';

export interface IStory {
  id: number;
  creator_id: IUser;
  created: string;
  genre: IGenre;
  tags: ITag[];
  views_counter: number;
  comments_count: number;
  dislikes_count: number;
  likes_count: number;
  post_description: string;
  post_image: string;
  post_text: string;
  post_title: string;
}
