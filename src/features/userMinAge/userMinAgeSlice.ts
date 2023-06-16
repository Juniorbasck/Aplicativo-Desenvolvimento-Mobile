import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getUserMinAgeAsync } from '../../../service';

interface UserMinAgeState {
    value: number;
    status: 'idle' | 'loading' | 'failed';
}

const initialState : UserMinAgeState = {
    value: 0,
    status: 'idle',
};

export const setUserMinAgeAsync = createAsyncThunk<
    number,
    {state: {userMinAge: UserMinAgeState}}
>('userMinAge/getUserMinAge', async () => {
    return await getUserMinAgeAsync();
});

export const userMinAgeSlice = createSlice({
    name: 'userMinAge',
    initialState,
    reducers: {
        setUserMinAgeMock: state => {
            state.value = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setUserMinAgeAsync.pending, state => {
            state.status = 'loading';
        })
        .addCase(setUserMinAgeAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value = action.payload;
        });
    },
});

export const { setUserMinAgeMock } = userMinAgeSlice.actions;
export const selectUserMinAge = (state: RootState) => state.userMinAge;
export default userMinAgeSlice.reducer;
