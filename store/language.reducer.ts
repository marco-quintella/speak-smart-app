import { createSlice } from '@reduxjs/toolkit';
import type { Language } from '../types/language';

const initialState: {
  currentLanguage?: Language;
} = {};

const languageSlice = createSlice({
  name: 'language',
  initialState: initialState,
  reducers: {
    setCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    }
  }
});

export const { setCurrentLanguage } = languageSlice.actions;
export default languageSlice.reducer;