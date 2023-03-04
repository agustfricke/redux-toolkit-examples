import { createSlice, nanoid } from "@reduxjs/toolkit";
// npm i dtae-fns para las fechas
import { sub } from "date-fns";

// Ponemos date al estado incial y lo convertimos a un string
const initialState = [
    {
        id: '0', 
        title: 'Redux Toolkit', 
        content: 'Me encanta Redux Toolki',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
    },
    {   id: '1', 
        title: 'JavaScript', 
        content: 'Me encanta JavaScript',
        date: sub(new Date(), { minutes: 5 }).toISOString(),
    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        // Ponemos la fecha en el payload
                        date: new Date().toISOString(),
                    }
                }
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
