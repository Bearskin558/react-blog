import { User } from '../types';
import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),
    registration: builder.mutation<
      { email: string; password: string; name: string },
      { email: string; password: string; name: string }
    >({
      query: (userData) => ({
        url: '/registration',
        method: 'POST',
        body: userData,
      }),
    }),
    current: builder.query<User, void>({
      query: (userData) => ({
        url: '/current',
        method: 'GET',
        body: userData,
      }),
    }),
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
        body: id,
      }),
    }),
    updateUser: builder.mutation<User, { userData: FormData; id: string }>({
      query: ({ userData, id }) => ({
        url: `/updateUser/${id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
} = userApi;

export const {
  endpoints: { login, registration, current, getUserById, updateUser },
} = userApi;
