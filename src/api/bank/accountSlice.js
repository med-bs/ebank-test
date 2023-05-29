import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "./accountService";


const initialState = {
    accounts: [],
    account: null,
    isErrorAcc: false,
    isSuccessAcc: false,
    isLoadingAcc: false,
    messageAcc: "",
};

// add saving account
export const addSavingAccount = createAsyncThunk(
    "account/saving",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user;
            return await accountService.addSavingAccount(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// add current account
export const addCurrentAccount = createAsyncThunk(
    "account/current",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user;
            return await accountService.addCurrentAccount(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// get all accounts
export const getAllAccounts = createAsyncThunk(
    "account/getAll",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user;
            return await accountService.getAllAccounts(data, token);
        } catch (error) {
            console.log(error)
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// get account
export const getAccount = createAsyncThunk(
    "account/get",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user;
            return await accountService.getAccount(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// debit
export const debit = createAsyncThunk(
    "account/debit",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user;
            return await accountService.debit(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// credit
export const credit = createAsyncThunk(
    "account/credit",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user;
            return await accountService.credit(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// transfer
export const transfer = createAsyncThunk(
    "account/transfer",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user;
            return await accountService.transfer(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder

            .addCase(addSavingAccount.pending, (state) => {
                state.isLoadingAcc = true;
            })
            .addCase(addSavingAccount.fulfilled, (state, action) => {
                state.isLoadingAcc = false;
                state.isSuccessAcc = true;
                state.isErrorAcc = false;
                state.accounts.push(action.payload);

            })
            .addCase(addSavingAccount.rejected, (state, action) => {
                state.isLoadingAcc = false;
                state.isErrorAcc = true;
                state.messageAcc = action.payload;
            })

            .addCase(addCurrentAccount.pending, (state) => {
                state.isLoadingAcc = true;
            })
            .addCase(addCurrentAccount.fulfilled, (state, action) => {
                state.isLoadingAcc = false;
                state.isSuccessAcc = true;
                state.isErrorAcc = false;
                state.accounts.push(action.payload);

            })
            .addCase(addCurrentAccount.rejected, (state, action) => {
                state.isLoadingAcc = false;
                state.isErrorAcc = true;
                state.messageAcc = action.payload;
            })

            .addCase(getAllAccounts.pending, (state) => {
                state.isLoadingAcc = true;
            })
            .addCase(getAllAccounts.fulfilled, (state, action) => {
                state.isLoadingAcc = false;
                state.isSuccessAcc = true;
                state.isErrorAcc = false;
                state.accounts = action.payload;

            })
            .addCase(getAllAccounts.rejected, (state, action) => {
                state.isLoadingAcc = false;
                state.isErrorAcc = true;
                state.messageAcc = action.payload;
            })

            .addCase(getAccount.pending, (state) => {
                state.isLoadingAcc = true;
            })
            .addCase(getAccount.fulfilled, (state, action) => {
                state.isLoadingAcc = false;
                state.isSuccessAcc = true;
                state.isErrorAcc = false;
                state.account = action.payload;

            })
            .addCase(getAccount.rejected, (state, action) => {
                state.isLoadingAcc = false;
                state.isErrorAcc = true;
                state.messageAcc = action.payload;
            })

            .addCase(debit.pending, (state) => {
                state.isLoadingAcc = true;
            })
            .addCase(debit.fulfilled, (state, action) => {
                state.isLoadingAcc = false;
                state.isSuccessAcc = true;
                state.isErrorAcc = false;
                state.accounts = state.accounts.map((account) => {
                    if (account.id === action.payload.accountId) {
                        return { ...account, balance: account.balance - action.payload.amount }
                    }
                    return account;
                })
            })
            .addCase(debit.rejected, (state, action) => {
                state.isLoadingAcc = false;
                state.isErrorAcc = true;
                state.isErrorAcc = false;
                state.messageAcc = action.payload;
            })

            .addCase(credit.pending, (state) => {
                state.isLoadingAcc = true;
            })
            .addCase(credit.fulfilled, (state, action) => {
                state.isLoadingAcc = false;
                state.isSuccessAcc = true;
                state.isErrorAcc = false;
                state.accounts = state.accounts.map((account) => {
                    if (account.id === action.payload.accountId) {
                        return { ...account, balance: account.balance + action.payload.amount }
                    }
                    return account;
                })

            })
            .addCase(credit.rejected, (state, action) => {
                state.isLoadingAcc = false;
                state.isErrorAcc = true;
                state.messageAcc = action.payload;
            })

            .addCase(transfer.pending, (state) => {
                state.isLoadingAcc = true;
            })
            .addCase(transfer.fulfilled, (state, action) => {
                state.isLoadingAcc = false;
                state.isSuccessAcc = true;
                state.isErrorAcc = false;
                state.accounts = state.accounts.map((account) => {

                    if (account.id === action.payload.accountSource) {
                        return { ...account, balance: account.balance - action.payload.amount }
                    }

                    if (account.id === action.payload.accountDestination) {
                        return { ...account, balance: account.balance + action.payload.amount }
                    }

                    return account;
                })

            })
            .addCase(transfer.rejected, (state, action) => {
                state.isLoadingAcc = false;
                state.isErrorAcc = true;
                state.messageAcc = action.payload;
            })


    },
});

export const { reset } = accountSlice.actions;
export default accountSlice.reducer;