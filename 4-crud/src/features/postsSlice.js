import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

// Estamos descructurando y obtenidendo el id desde ese initialPost porque neseitamos el id en la url
export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    } catch (err) {
        return err.message;
    }
})

// Seguimos reciviendo el initialPost y descructuramos el id
export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        // Esto es por nuestra fake api, ya que jsonplaceholder no manda devuelta el id
        // asi que aca checkiamos si el estatus es 200, y si es asi devolvemos el initialPost para poder agarrar el id
        if (response?.status === 200) return initialPost;
        // Si el estatos no es 200 vamos a mandar un msj con el estatus que sea
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            like:0,
                            unlike: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        like: 0,
                        unlike:0
                    }
                    return post;
                });

                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    like:0,
                    unlike:0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                // aqui estamos recibiendo informacion con el action payload
                // pero basicamente podriamos tener un put request con estados 200 de exitoso
                // cuando en realidad no es exitoso entonces nos queremos asegurar que el 
                // post se halla actualizado, 
                // Basicamente si el payload no treae el id, vamos a poner losiguiente por consola
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                // Si todo va bien descontruimos el id del action.payload
                const { id } = action.payload;
                // Le ponemos una nueva fecha
                action.payload.date = new Date().toISOString();
                // Y aca filtramos el post con el mismo id
                const posts = state.posts.filter(post => post.id !== id);
                // y despues actualizamos el estado con todos los posts y con el post actualizado
                state.posts = [...posts, action.payload];
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                // Esto es lo mismo que teniamos en el delete
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                // descructurando el id
                const { id } = action.payload;
                // Filtramos el post que eliminamos
                const posts = state.posts.filter(post => post.id !== id);
                // Actualizamos el estado sin el post que eliminamos
                state.posts = posts;
            })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

// Solo blog
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
