import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/', // Example API
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<any[], void>({
      query: () => 'posts',
    }),
  }),
});

export const { useGetPostsQuery } = api;
