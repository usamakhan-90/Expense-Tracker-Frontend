import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import { authApi } from "../features/auth/authApi";
import { dashboardApi } from "../features/dashboard/dashboardApi";
import { incomeApi } from "../features/income/incomeApi";
import { expenseApi } from "../features/expense/expenseApi";
export const store = configureStore({
    reducer:{
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [incomeApi.reducerPath]: incomeApi.reducer,
        [expenseApi.reducerPath]: expenseApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            dashboardApi.middleware,
            incomeApi.middleware,
            expenseApi.middleware
        ),
});