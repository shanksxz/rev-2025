export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

let posts: Post[] = [
  {
    id: 1,
    userId: 1,
    title: "First Post",
    body: "This is the first post content",
  },
  {
    id: 2,
    userId: 1,
    title: "Second Post",
    body: "This is the second post content",
  },
];

export const db = {
  posts: {
    getAll: () => posts,
    getById: (id: number) => posts.find((post) => post.id === id),
    create: (post: Omit<Post, "id">) => {
      const newPost = {
        ...post,
        id: Math.max(...posts.map((p) => p.id)) + 1,
      };
      posts.push(newPost);
      return newPost;
    },
    update: (id: number, post: Partial<Post>) => {
      const index = posts.findIndex((p) => p.id === id);
      if (index === -1) return null;
      posts[index] = { ...posts[index], ...post };
      return posts[index];
    },
    delete: (id: number) => {
      const index = posts.findIndex((p) => p.id === id);
      if (index === -1) return false;
      posts = posts.filter((p) => p.id !== id);
      return true;
    },
  },
};