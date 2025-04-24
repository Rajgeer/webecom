import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from '../features/authSlice';
export const useAppDispatch= () => useDispatch();
export const useAppSelector =  useSelector; 
export const store = configureStore({
    reducer: {
       auth: authReducer 
    }
})