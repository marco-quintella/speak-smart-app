import { createSlice } from '@reduxjs/toolkit';
import type { Course } from '../types/course';
import type { Language } from '../types/language';

const initialState: {
  currentLanguage?: Language;
  currentCourse?: Course;
} = {};

const languageSlice = createSlice({
  name: 'language',
  initialState: initialState,
  reducers: {
    setCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    }
  }
});

export const { setCurrentLanguage, setCurrentCourse } = languageSlice.actions;
export default languageSlice.reducer;