import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './language.reducer';
import userReducer from './user.reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer
  }
});