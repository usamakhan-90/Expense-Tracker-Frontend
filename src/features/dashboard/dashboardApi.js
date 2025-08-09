import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7000/dashboard',
        credentials: 'include'
    }),

    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: () => '/'
        })
    })
})

export const {useGetDashboardQuery} = dashboardApi