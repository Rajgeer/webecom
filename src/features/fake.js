import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null,
    token: window.localStorage.getItem('token') || null,
    isAuthenticated: window.localStorage.getItem('token')?true:false,
  },
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      window.localStorage.setItem('user', JSON.stringify(action.payload.token));
      window.localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state?.auth.user;
export const selectCurrentToken = (state) => state?.auth.token;
export const selectIsAuthenticated = (state) => state?.auth.isAuthenticated;