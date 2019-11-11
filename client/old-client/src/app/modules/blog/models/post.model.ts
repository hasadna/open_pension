import { Tag } from './tag.model';

export class Post {
  unique_id: string;
  title: string;
  body: string;
  author: string;
  created_at: string;
  publish: string;
  tags: Tag[];
}

export interface PostResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}
