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
            // Como vemos aqui ponemos prepare y le pasamos el title y content
            prepare(title, content) {
                // Luego retonamos el payload ya formateado, ahora podeos ir al AddPost y simplificar el componente
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                    }
                }
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
