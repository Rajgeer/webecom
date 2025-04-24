import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from '../features/authSlice';
import cartReducer from '../features/cartSlice';
import { apiSlice } from "./apiSlice";
export const useAppDispatch= () => useDispatch();
export const useAppSelector =  useSelector; 
export const store = configureStore({
    reducer: {
       auth: authReducer ,
       cart: cartReducer,
       [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
    devTools: true,
})