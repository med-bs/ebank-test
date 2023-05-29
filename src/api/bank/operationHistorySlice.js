import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import operationHistoryService from "./operationHistoryService";

const initialState = {
    accountHistory: "",
    isErrorOpHis: false,
    isSuccessOpHis: false,
    isLoadingOpHis: false,
    messageOpHis: "",
};

export const getAccountHistoryPage = createAsyncThunk(
    "account/operation/history/getpage",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user;
            return await operationHistoryService.getAccountHistoryPage(data, token);
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

export const operationHistorySlice = createSlice({
    name: "operationHistory",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder

            .addCase(getAccountHistoryPage.pending, (state) => {
                state.isLoadingOpHis = true;
            })
            .addCase(getAccountHistoryPage.fulfilled, (state, action) => {
                state.isLoadingOpHis = false;
                state.isSuccessOpHis = true;
                state.accountHistory = action.payload;
            })
            .addCase(getAccountHistoryPage.rejected, (state, action) => {
                state.isLoadingOpHis = false;
                state.isErrorOpHis = true;
                state.messageOpHis = action.payload;
            });
    },
});

export const { reset } = operationHistorySlice.actions;
export default operationHistorySlice.reducer;