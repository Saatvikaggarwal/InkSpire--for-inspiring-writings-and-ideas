import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        
        baseUrl: "http://localhost:4444/api",

        prepareHeaders: (headers, { getState }) => {
            return headers;
        },
        credentials: 'include',
    }),

    tagTypes: ['Post', 'User', 'Like','Gemini'],
    endpoints: (builder) => ({
        
        fetchUser: builder.query({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),

        fetchPosts: builder.query({
            query: () => '/post',
            providesTags: ['Post'],
        }),

        fetchPostsByUserId: builder.query({
            query: () => `/post/user`,
            providesTags: ["Post"],
        }),

        createPost: builder.mutation({
            query: (formData) => ({ url: '/post', method: 'POST', body: formData }),
            invalidatesTags: ['Post'],
        }),

        editPost: builder.mutation({
            query: ({ id, title, content }) => ({ url: `/post/${id}`, method: "PUT", body: { title, content } }),
            invalidatesTags: ["Post"]

        }),

        deletePost: builder.mutation({
            query: (id) => ({ url: `/post/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Post'],
        }),

        fetchGemini: builder.mutation({
            query: ({prompt})=>({url:"/gemini", method:"POST", body:{prompt}}),
            invalidatesTags: ['Gemini'],
        }),

        fetchHasLiked: builder.query({
            query: (postId) => `/like/hasLiked/${postId}`,
            providesTags: ['Like']
        }),

        toggleLike: builder.mutation({
            query: (postId) => ({ url: `/like/toggle/${postId}`, method: "POST",body: {}}),
            invalidatesTags: ['Like'],
        }),

        fetchLikeCount: builder.query({
            query: (postId) => `/like/${postId}`,
            providesTags: ['Like']
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
    useFetchGeminiMutation,
    useFetchHasLikedQuery,
    useFetchLikeCountQuery,
    useToggleLikeMutation,

} = api;
