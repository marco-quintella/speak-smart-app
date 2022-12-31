import { createSlice } from '@reduxjs/toolkit';
import { Lesson, UserLesson } from '../types/lessons';

const initialState: {
  lessons?: Lesson[];
  userLessons?: UserLesson[];
} = {};

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: initialState,
  reducers: {
    setLessons: (state, action) => {
      state.lessons = action.payload;
    },
    setUserLessons: (state, action) => {
      state.userLessons = action.payload;
    }
  }
});

export const { setLessons, setUserLessons } = lessonsSlice.actions;
export default lessonsSlice.reducer;