export type User = {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
  bio?: string;
  location?: string;
  posts: Post[];
  following: Follows[];
  followers: Follows[];
  like: Like[];
  comments: Comment[];
  isFollowing?: boolean;
};

export type UserDto = Omit<User, 'password' | 'email'>;

export type Follows = {
  id: string;
  follower: {
    name: string;
    avatarUrl: string;
    id: string;
  };
  followerId: string;
  following: {
    name: string;
    avatarUrl: string;
    id: string;
  };
  followingId: string;
};
export type Post = {
  id: string;
  content: string;
  author: { avatarUrl: string; name: string };
  authorId: string;
  likes: Like[];
  comments: Comment[];
  likedByUser: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Like = {
  id: string;
  user: User;
  userId: string;
  post: Post;
  postId: string;
};

export type Comment = {
  id: string;
  content: string;
  user: {
    avatarUrl: string;
    name: string;
  };
  userId: string;
  post: Post;
  postId: string;
};
export type TestUser = {
  name: string;
  id: string;
};
