import { createSlice } from '@reduxjs/toolkit';
import type { Unit } from '../types';

const initialState: {
  units?: Unit[];
} = {};

const pathSlice = createSlice({
  name: 'path',
  initialState: initialState,
  reducers: {
    setUnits: (state, action) => {
      state.units = action.payload;
    }
  }
});

export const { setUnits } = pathSlice.actions;
export default pathSlice.reducer;