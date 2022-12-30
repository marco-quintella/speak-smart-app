import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  user?: unknown;
  isAuthenticated?: boolean;
} = {};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  }
});

export const { setUser, setAuthentication } = userSlice.actions;
export default userSlice.reducer;