// impotamos 
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authReducer from '../features/auth/authSlice'

// Cramos el store 
export const store = configureStore({
    reducer: {
        // Ponemos los reducers
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    // Nesesario para el rtk query 
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
