import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { register } from "module";
import { data } from "react-router-dom";



export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7000/auth',
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

export const {useLoginMutation, useRegisterMutation, useProfileQuery, useLogoutMutation} = authApi;