import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";


export const expenseApi = createApi({
    reducerPath: "expenseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:7000/expense",
        credentials: 'include'
    }),

    endpoints: (builder) => ({
        getAllExpense: builder.query({
            query: () => '/get-expense'
        }),

        addExpense: builder.mutation({
            query: (data) =>({
                url: '/create-expense',
                method: "POST",
                body: data
            })
        }),

        deleteExpense: builder.mutation({
            query: (id) => ({
                url: `/delete-expense/${id}`,
                method: "DELETE"
            })
        }),

        downloadExpenseExcel: builder.mutation({
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

export const {useGetAllExpenseQuery, useAddExpenseMutation, useDeleteExpenseMutation, useDownloadExpenseExcelMutation} = expenseApi