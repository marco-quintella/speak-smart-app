import { createSlice } from '@reduxjs/toolkit';
import type { Course, Language } from '~/types';

const initialState: {
  currentLanguage?: Language;
  currentCourse?: Course;

  languages?: Language[];
  courses?: Course[];
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
    },
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    }
  }
});

export const { setCurrentLanguage, setCurrentCourse, setLanguages, setCourses } = languageSlice.actions;
export default languageSlice.reducer;