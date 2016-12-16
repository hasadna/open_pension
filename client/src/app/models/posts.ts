import { Post } from './post';

export const Posts: Post[] = [
	{unique_id: 1, title: 'Post title1', body: 'Body of post1.', author: 'James Richardson', created_at: new Date(), publish: new Date(), tags: ['boom', 'bam'] },
	{unique_id: 2, title: 'Post title2', body: 'Body of post2.', author: 'Billy Nols', created_at: new Date(), publish: new Date(), tags: ['pow', 'wow'] },
	{unique_id: 3, title: 'Post title3', body: 'Body of post3.', author: 'Jerry Tank', created_at: new Date(), publish: new Date(), tags: ['banana', 'apple', 'watermelon-seeds'] }
];