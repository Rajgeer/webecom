import { createSlice } from "@reduxjs/toolkit";
// import Cookies from 'js-cookie';
const authSlice= createSlice({
    name:'auth',
    initialState:{
        count:0,
        // user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
        // token: Cookies.get('token') || null,
    },    
    reducers: {
        setCredentials:(state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
            // state.isAdmin = isAdmin;
            // Cookies.set('user', JSON.stringify(user));
            // Cookies.set('token', token);
        },
        increment: (state) => {
            state.count+=1;
        },
        decrement:(state) => {
            state.count -= 1;
        }, 
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.isAdmin = false;
            // Cookies.remove('user');
            // Cookies.remove('token');
        }
    }
});

export const { setCredentials, logOut, increment, decrement } = authSlice.actions;
export default authSlice.reducer;

export const selectCount = (state) => state?.auth.count; 
export const selectCurrentUser = (state) => state?.auth.user;
export const selectCurrentToken = (state) => state?.auth.token;