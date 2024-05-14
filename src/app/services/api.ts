import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:3000/api`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token || localStorage.getItem('token');
    if (token) {
      headers.set('authorizatiom', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
