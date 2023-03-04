import { configureStore } from "@reduxjs/toolkit";
// importamos el reducer
import postsReducer from "../features/postsSlice";

export const store = configureStore ({
    reducer: {
        posts: postsReducer,
    }
})


