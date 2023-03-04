// Importamos axios y createAsyncThunk
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

//Okey ahora  debemos cambiar donde tenemos state porque la estructura de nuestro estado aaba de cambiar ahora
//tenemos el name de postsSlice que es posts y luego en el inital state tenemos posts y luego un arreglo de objectos
//asi que vamos a tener que cambiar algunas cosas, y eso es lo que me referia en el anterior captiulo donde basicamente
//ahora como tenemso esta logica de selectAllPosts aqui no tenemos que ir cambiando todos los componentes
//solo tenemos que actualizar este archivo postsSlice

// Okey aqui estamos exportando fetchPosts que usea createAsyncThunk, este createAsyncThunk recibe 2 argumentos
// el primero es un string que se usa como un nombre para el action type 
// el segundo es un callback para crear el payload, y esta funcion deberia retornar una promesa que contiene los datos o
// una promsea rechazada con un error
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

// Fijate que recibe el initalPost, basicamente esto es body del post request
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                // Aqui!
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
            // Aqui!
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    // Aveces el slice reducer nesesita responder a otras acciones que no fueron definidas dentro del slice reducer
    // y eso es lo que pasa aqui con nuestro fetchPosts asi que aqui vamos a agreagar un extra reducer
    // aqui ponemos extrareducers que este recibe el parametro builder, este builder es un objecto que nos permite
    // definir reducers adicionales que corren con los action definidos fuera del Slice, justo como este fetchPosts
    extraReducers(builder) {
        builder
        // hay 3 casos, donde vamos reasignando el status
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Adding date and reactions
                // definimos 1 min para que las publicaciones tengan fechas diferentes
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    // Cada publicacion le ponemos un  imuto mas asi no tienen la misma fecha
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    // Les ponemos las reacciones
                    post.reactions = {
                        like: 0,
                        unlike:0
                    }
                    // Devolvemos el post
                    return post;
                });

                // Agregamos los posts al state
                state.posts = state.posts.concat(loadedPosts)
            })
            // En caso de error
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                // Agregamos el mensaje dee error
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                // Fix for API post IDs:
                // Creating sortedPosts & assigning the id 
                // would be not be needed if the fake API 
                // returned accurate new post IDs
                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                // End fix for fake API post IDs 
                
                // convertimos el userId a number
                action.payload.userId = Number(action.payload.userId)
                // Ponemos la fecha
                action.payload.date = new Date().toISOString();
                // Y reacciones
                action.payload.reactions = {
                    like:0,
                    unlike:0
                }
                // Mostremos el payload por consola
                console.log(action.payload)
                // Agregamos el payload al state
                state.posts.push(action.payload)
            })
    }
})

// Aqui!  
export const selectAllPosts = (state) => state.posts.posts;
// Creamos el status y error
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
