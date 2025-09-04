import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4444/api",
        prepareHeaders: (headers, { getState }) => {
            // cookies sent automatically
            return headers;
        },
        credentials: 'include',
    }),

    tagTypes: ['Post', 'User'],  //use to make cache under the tags provided
    endpoints: (builder) => ({

        // signup: builder.mutation({
        //     query: (credentials) => ({ url: '/auth/signup', method: 'POST', body: credentials }),
        //     invalidatesTags: ['User'],
        // }),
        // login: builder.mutation({
        //     query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
        //     invalidatesTags: ['User'],
        // }),

        fetchUser: builder.query({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),
        
        fetchPosts: builder.query({
            query: () => '/post',
            providesTags: ['Post'],
        }),

        fetchPostsByUserId: builder.query ({
            query: ()=>`/post/user`,
            providesTags:["Post"],
        }),

        createPost: builder.mutation({
            query: (formData) => ({ url: '/post', method: 'POST', body: formData }),
            invalidatesTags: ['Post'],
        }),

        editPost: builder.mutation({
            query : ({id,title,content})=>({url: `/post/${id}`, method:"PUT", body :{title,content}}),
            invalidatesTags: ["Post"]

        }),

        deletePost: builder.mutation({
            query: (id) => ({ url: `/post/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Post'],
        }),
    }),
});

export const {
    // useSignupMutation,
    // useLoginMutation,
    useFetchUserQuery,
    useFetchPostsQuery,
    useFetchPostsByUserIdQuery,
    useCreatePostMutation,
    useDeletePostMutation,
    useEditPostMutation       
} = api;