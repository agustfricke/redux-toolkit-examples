import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/postsSlice';
import usersReducer from '../features/usersSlice';


export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer
    }
})