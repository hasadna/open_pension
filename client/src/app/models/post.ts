export interface Post {
  unique_id: number;
  title: string;
  body: string;
  author: string;
  created_at: Date;
  publish: Date;
  tags: string[];
}
