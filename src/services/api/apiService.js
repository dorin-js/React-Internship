import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, HEADERS } from './constants';

const invalidateUsersOnSuccess = (isSuccess) => {
  if (isSuccess) {
    return ['AllUsers'];
  }
  return [];
};

export const apiService = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, headers: HEADERS }),
  tagTypes: ['AllUsers', 'User'],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => '/users',
      providesTags: ['AllUsers'],
      transformResponse: (data) => data?.items?.map((item) => ({
        // eslint-disable-next-line no-underscore-dangle
        id: item._uuid,
        email: item.email,
        birth: item.birth,
        lastname: item.lastname,
        name: item.name,
      })),
    }),
    getUserById: builder.query({
      query: (userId) => `/users${userId}`,
    }),
    createNewUser: builder.mutation({
      query: (body) => ({ url: '/users', method: 'POST', body }),
      invalidatesTags: invalidateUsersOnSuccess,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({ url: `/users/${userId}`, method: 'DELETE' }),
      invalidatesTags: invalidateUsersOnSuccess,
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateNewUserMutation,
  useDeleteUserMutation,
} = apiService;