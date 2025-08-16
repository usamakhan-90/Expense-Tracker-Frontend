import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://expense-tracker-backend-rkl09vo60.vercel.app/dashboard',
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