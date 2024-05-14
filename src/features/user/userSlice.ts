import { createSlice } from '@reduxjs/toolkit';

import { User } from '../../app/types';
import { build } from 'vite';
import { userApi } from '../../app/services/userApi.ts';

interface InitialState {
  user: User | null;
  isAuthentificated: boolean;
  users: User[] | null;
  current: User | null;
  token?: string;
}
const initialState: InitialState = {
  user: null,
  isAuthentificated: false,
  users: null,
  current: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isAuthentificated = true;
    });
    builder.addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
      state.isAuthentificated = true;
      state.current = action.payload;
    });
    builder.addMatcher(userApi.endpoints.getUserById.matchFulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
export const { logout, resetUser } = slice.actions;
export default slice.reducer;
