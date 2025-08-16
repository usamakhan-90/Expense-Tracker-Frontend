import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const expenseApi = createApi({
    reducerPath: "expenseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://expense-tracker-backend-rkl09vo60.vercel.app/expense",
        credentials: 'include'
    }),

    endpoints: (builder) => ({
        getAllExpense: builder.query({
            query: () => '/get-expense',
            providesTags: ["Expense"]
        }),

        addExpense: builder.mutation({
            query: (data) =>({
                url: '/create-expense',
                method: "POST",
                body: data
            }),
            providesTags: ["Expense"],
        }),

        deleteExpense: builder.mutation({
            query: (id) => ({
                url: `/delete-expense/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Expense"],
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