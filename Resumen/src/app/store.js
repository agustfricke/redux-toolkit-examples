import { configureStore } from "@reduxjs/toolkit";
// 1- Import post Reducer
import postsReducer from '../features/posts/postsSlice';
// Importmaos el uysersreducer
import usersReducer from '../features/users/usersSlice';


export const store = configureStore({
    reducer: {
        // 1- Ponerlo en el reducer
        posts: postsReducer,
        users: usersReducer
    }
})