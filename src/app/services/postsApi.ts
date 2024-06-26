import { Post } from '../types';
import { api } from './api';

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<Post, { content: string }>({
      query: (postData) => ({
        url: '/posts',
        method: 'POST',
        body: postData,
      }),
    }),
    getAllPosts: builder.query<Post[], void>({
      query: (postData) => ({
        url: '/posts',
        method: 'GET',
        body: postData,
      }),
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} = postsApi;

export const {
  endpoints: { createPost, getAllPosts, getPostById, deletePost },
} = postsApi;
