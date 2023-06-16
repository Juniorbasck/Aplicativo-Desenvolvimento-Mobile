import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getIssuersAsync } from '../../../service';

interface IssuersState {
    value: object;
    status: 'idle' | 'loading' | 'failed';
}

const initialState : IssuersState = {
    value: [],
    status: 'idle',
};

export const setIssuersAsync = createAsyncThunk<
    object,
    {state: {issuers: IssuersState}}
>('issuers/getIssuers', async () => {
    return await getIssuersAsync();
});

export const issuersSlice = createSlice({
    name: 'issuers',
    initialState,
    reducers: {
        setIssuersMock: state => {
            state.value = []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setIssuersAsync.pending, state => {
            state.status = 'loading';
        })
        .addCase(setIssuersAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value = action.payload;
        });
    },
});

export const { setIssuersMock } = issuersSlice.actions;
export const selectIssuers = (state: RootState) => state.issuers;
export default issuersSlice.reducer;
