import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logInStart(state) {
      state.loading = true;
      state.error = null;
    },
    logInSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = true;
    },
    logInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    signOutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {
  logInStart,
  logInSuccess,
  logInFailure,
  signOutSuccess,
} = adminSlice.actions;

export default adminSlice.reducer;
