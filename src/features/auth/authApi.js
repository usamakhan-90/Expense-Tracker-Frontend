import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://expense-tracker-backend-rkl09vo60.vercel.app/auth',
        credentials: 'include'
    }),

    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: "POST",
                body: data
            })
        }),

        register: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: "POST",
                body: data
            })
        }),

        getProfile: builder.query({
            query: () => '/profile'
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: "POST"
            })
        })
    })
})

export const {useLoginMutation, useRegisterMutation, useGetProfileQuery, useLogoutMutation, useLazyGetProfileQuery } = authApi;