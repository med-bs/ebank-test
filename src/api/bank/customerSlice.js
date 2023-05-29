import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CustomerService from "./customerService";

const initialState = {
    customers: [],
    customer: null,
    isErrorCus: false,
    isSuccessCus: false,
    isLoadingCus: false,
    messageCus: "",
};

// Create new Customer
export const createCustomer = createAsyncThunk(
    "customer/create",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user;
            return await CustomerService.addCustomer(data, token);
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

// get all Customers
export const getAllCustomers = createAsyncThunk(
    "customer/getall",
    async (_,thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user;
            return await CustomerService.getAllCustomers(token);
        } catch (error) {
            console.log(error)
            console.log(thunkAPI)
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

// get Customer
export const getCustomer = createAsyncThunk(
    "customer/get",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user;
            return await CustomerService.getCustomer(id, token);
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

// delete Customer
export const deleteCustomer = createAsyncThunk(
    "customer/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user;
            return await CustomerService.deleteCustomer(id, token);
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

// update new Customer
export const updateCustomer = createAsyncThunk(
    "customer/update",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user;
            return await CustomerService.updateCustomer(data, token);
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

export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder

            .addCase(createCustomer.pending, (state) => {
                state.isLoadingCus = true;
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.isLoadingCus = false;
                state.isSuccessCus = true;
                state.customers.push(action.payload);

            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.isLoadingCus = false;
                state.isErrorCus = true;
                state.messageCus = action.payload;
            })


            .addCase(getAllCustomers.pending, (state) => {
                state.isLoadingCus = true;
            })
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                state.isLoadingCus = false;
                state.isSuccessCus = true;
                state.customers = action.payload;
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                state.isLoadingCus = false;
                state.isErrorCus = true;
                state.messageCus = action.payload;
            })

            .addCase(getCustomer.pending, (state) => {
                state.isLoadingCus = true;
            })
            .addCase(getCustomer.fulfilled, (state, action) => {
                state.isLoadingCus = false;
                state.isSuccessCus = true;
                state.customer = action.payload;
            })
            .addCase(getCustomer.rejected, (state, action) => {
                state.isLoadingCus = false;
                state.isErrorCus = true;
                state.messageCus = action.payload;
            })

            .addCase(updateCustomer.pending, (state) => {
                state.isLoadingCus = true;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.isLoadingCus = false;
                state.isSuccessCus = true;
                state.customers = state.customers.map((customer) =>
                    customer.id === action.payload.id ? action.payload : customer
                );
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.isLoadingCus = false;
                state.isErrorCus = true;
                state.messageCus = action.payload;
            })

            .addCase(deleteCustomer.pending, (state) => {
                state.isLoadingCus = true;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.isLoadingCus = false;
                state.isSuccessCus = true;
                state.customers = state.customers.filter(
                    (customer) => customer.id !== action.payload._id
                );
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.isLoadingCus = false;
                state.isErrorCus = true;
                state.messageCus = action.payload;
            });
    },
});

export const { reset } = customerSlice.actions;
export default customerSlice.reducer;