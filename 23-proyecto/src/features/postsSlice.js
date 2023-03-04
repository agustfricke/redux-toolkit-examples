import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', title: 'Redux Toolkit', content: 'Me encanta Redux Toolki' },
    { id: '1', title: 'JavaScript', content: 'Me encanta JavaScript' },
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            // Ponemos el userId en el action asi le podemos asignar usuarios
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                    }
                }
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
