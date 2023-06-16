import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getCitiesAsync } from '../../../service';

interface CitiesState {
    value: object;
    status: 'idle' | 'loading' | 'failed';
}

const initialState : CitiesState = {
    value: [],
    status: 'idle',
};

export const setCitiesAsync = createAsyncThunk<
    object,
    {state: {cities: CitiesState}}
>('cities/getCities', async () => {
    return await getCitiesAsync();
});

export const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        setCitiesMock: state => {
            state.value = []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(setCitiesAsync.pending, state => {
            state.status = 'loading';
        })
        .addCase(setCitiesAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value = action.payload;
        });
    },
});

export const { setCitiesMock } = citiesSlice.actions;
export const selectCities = (state: RootState) => state.cities;
export default citiesSlice.reducer;