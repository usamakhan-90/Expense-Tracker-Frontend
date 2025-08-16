import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const incomeApi = createApi({
    reducerPath: "incomeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://expense-tracker-backend-private-baxy8aea6.vercel.app/income",
        credentials: 'include'
    }),

    endpoints: (builder) => ({
        getAllIncome: builder.query({
            query: () => '/get-income',
            providesTags: ["Income"],
        }),

        addIncome: builder.mutation({
            query: (data) =>({
                url: '/create-income',
                method: "POST",
                body: data
            }),
            providesTags: ["Income"],
        }),

        deleteIncome: builder.mutation({
            query: (id) => ({
                url: `/delete-income/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Income"],
        }),

        downloadIncomeExcel: builder.mutation({
            query: () => ({
                url: "/downloadExcel",
                method: "GET",

                responseHandler: (response) =>{
                    return response.blob();
                },

                cache: 'no-store'
            })
         })
    })
})

export const {useGetAllIncomeQuery, useAddIncomeMutation, useDeleteIncomeMutation, useDownloadIncomeExcelMutation} = incomeApi