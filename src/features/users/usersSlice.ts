import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getUsersAsync } from '../../../service';

interface UsersState {
    value: object;
    status: 'idle' | 'loading' | 'failed';
}

const initialState : UsersState = {
    value: [],
    status: 'idle',
};

export const setUsersAsync = createAsyncThunk<
    object,
    {state: {users: UsersState}}
>('users/getUsers', async () => {
    return await getUsersAsync();
});

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsersMock: state => {
            state.value = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setUsersAsync.pending, state => {
            state.status = 'loading';
        })
        .addCase(setUsersAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value = action.payload;
        });
    },
});

export const { setUsersMock } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;
export default usersSlice.reducer;
