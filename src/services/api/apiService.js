import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, HEADERS } from './constants';

const invalidateUsersOnSuccess = (result) => {
  if (result) {
    return ['AllUsers'];
  }
  return [];
};

export const apiService = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, headers: HEADERS }),
  tagTypes: ['AllUsers'],
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
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body: [body],
      }),
      invalidatesTags: invalidateUsersOnSuccess,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: invalidateUsersOnSuccess,
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: invalidateUsersOnSuccess,
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateNewUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = apiService;
