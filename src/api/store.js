import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import customerReducer from "./bank/customerSlice"
import operationHistoryReducer from "./bank/operationHistorySlice"
import accountReducer from "./bank/accountSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,

        customers: customerReducer,

        accountHistory: operationHistoryReducer,
        accounts: accountReducer,
    },
});