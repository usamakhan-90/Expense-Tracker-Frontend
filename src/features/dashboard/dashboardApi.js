import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://expense-tracker-backend-private-baxy8aea6.vercel.app/dashboard',
        credentials: 'include'
    }),

    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: () => '/',
            providesTags: "Dashboard"
        }),
    })
})

export const {useGetDashboardQuery} = dashboardApi