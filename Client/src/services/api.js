import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        
        baseUrl: import.meta.env.VITE_API_BASE_URL,

        prepareHeaders: (headers, { getState }) => {
            return headers;
        },
        credentials: 'include',
    }),

    tagTypes: ['Post', 'User', 'Like'],
    endpoints: (builder) => ({
        
        fetchUser: builder.query({
            query: () => '/api/auth/me',
            providesTags: ['User'],
        }),

        fetchPosts: builder.query({
            query: () => '/api/post',
            providesTags: ['Post'],
        }),

        fetchPostsByUserId: builder.query({
            query: () => `/api/post/user`,
            providesTags: ["Post"],
        }),

        createPost: builder.mutation({
            query: (formData) => ({ url: '/api/post', method: 'POST', body: formData }),
            invalidatesTags: ['Post'],
        }),

        editPost: builder.mutation({
            query: ({ id, title, content }) => ({ url: `/api/post/${id}`, method: "PUT", body: { title, content } }),
            invalidatesTags: ["Post"]

        }),

        deletePost: builder.mutation({
            query: (id) => ({ url: `/api/post/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Post'],
        }),
    }),
});

export const {
    useFetchUserQuery,
    useFetchPostsQuery,
    useFetchPostsByUserIdQuery,
    useCreatePostMutation,
    useDeletePostMutation,
    useEditPostMutation,
} = api;
