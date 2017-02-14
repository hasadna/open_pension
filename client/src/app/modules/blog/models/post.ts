import { Tag } from './tag';

export class Post {
  unique_id: string;
  title: string;
  body: string;
  author: string;
  created_at: string;
  publish: string;
  tags: Tag[];
}
