import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    {id: '1', title: 'Aprendiendo Redux Toolkit'},
    {id: '2', title: 'JavaScript'}
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, userId) {
                return {
                    payload: {
                    id: nanoid(),
                    title,
                    userId
                    }
                }
            }
        }
    }
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
