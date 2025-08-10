import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const incomeApi = createApi({
    reducerPath: "incomeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:7000/income",
        credentials: 'include'
    }),

    endpoints: (builder) => ({
        getAllIncome: builder.query({
            query: () => '/get-income'
        }),

        addIncome: builder.mutation({
            query: (data) =>({
                url: '/create-income',
                method: "POST",
                body: data
            })
        }),

        deleteIncome: builder.mutation({
            query: (id) => ({
                url: `/delete-income/${id}`,
                method: "DELETE"
            })
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