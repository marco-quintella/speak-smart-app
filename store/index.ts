import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './language.reducer';
import pathReducer from './path.reducer';
import userReducer from './user.reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
    path: pathReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export * from './hooks';
export * from './language.reducer';
export * from './path.reducer';
export * from './user.reducer';

