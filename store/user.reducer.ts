import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  user?: unknown;
  isAuthenticated?: boolean;
  userData?: {
    currentLanguage?: any;
  };
} = {};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  }
});

export const { setUser, setUserData, setAuthentication } = userSlice.actions;
export default userSlice.reducer;