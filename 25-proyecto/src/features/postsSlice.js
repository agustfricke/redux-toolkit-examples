import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

// Agregamos las reaciones al estado inicial
const initialState = [
    {
        id: '0', 
        title: 'Redux Toolkit', 
        content: 'Me encanta Redux Toolki',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            like: 0,
            unlike: 0
        }
    },
    {   id: '1', 
        title: 'JavaScript', 
        content: 'Me encanta JavaScript',
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            like: 0,
            unlike: 0
        }
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
                        date: new Date().toISOString(),
                        // Ponemos las reaciones en el prepare callback
                        reactions: {
                            like: 0,
                            unlike: 0
                        }
                    }
                }
            }
        }, 
        // creamos el action reactionAdded y le pasamos el state y el action
        reactionAdded(state, action) {
            // Descontruimos el postId y la reacion desde el action payload
            const { postId, reaction } = action.payload
            // cremos el exising post donde encontramos el id donde vamos a poner la reacion
            const existingPost = state.find(post => post.id === postId)
            // Si existe le agreamos 1 como hicimos con el contador en el capitulo anterior
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts;

// Exportamos el action
export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
