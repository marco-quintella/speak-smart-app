import { createSlice } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';
import { UserData } from '~/types';

const initialState: {
  user?: User;
  isAuthenticated?: boolean;
  userData?: UserData;
} = {
  user: undefined,
  isAuthenticated: undefined,
  userData: undefined
};

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