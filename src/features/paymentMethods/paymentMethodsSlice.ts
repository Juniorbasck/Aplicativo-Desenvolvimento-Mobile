import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getPaymentMethodsAsync } from '../../../service';

interface PaymentMethodsState {
    value: object;
    status: 'idle' | 'loading' | 'failed';
}

const initialState : PaymentMethodsState = {
    value: [],
    status: 'idle',
};

export const setPaymentMethodsAsync = createAsyncThunk<
    object,
    {state: {paymentMethods: PaymentMethodsState}}
>('paymentMethods/getPaymentMethods', async () => {
    return await getPaymentMethodsAsync();
});

export const paymentMethodsSlice = createSlice({
    name: 'paymentMethods',
    initialState,
    reducers: {
        setPaymentMethodsMock: state => {
            state.value = []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setPaymentMethodsAsync.pending, state => {
            state.status = 'loading';
        })
        .addCase(setPaymentMethodsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value = action.payload;
        });
    },
});

export const { setPaymentMethodsMock } = paymentMethodsSlice.actions;
export const selectPaymentMethods = (state: RootState) => state.paymentMethods;
export default paymentMethodsSlice.reducer;
