// Aqui importamos el createEntityAdapter 
import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// aqui tenemos el postsAdapter que podemos poner un sortComparer que basicamente estamos comparando aquien el slice 
// y no en el compnente donde tenemos la compracion por fecha
const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

// Aqui le pasamos el postsAdapter al initialState y fijate que elimine el array vacio de posts porque
// nuestro initialState ya va a devolver ese estado normalizado con el array de los ids
const initialState = postsAdapter.getInitialState({
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    count: 0
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            // Aqui!
            const existingPost = state.entities[postId] // pasamos el postId porque lo pasamois como un Objecto lookup
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }, 
        increaseCount(state, action) {
            state.count = state.count + 1
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

                // Aqui!!
                // Este postsAdapter tiene sus propios metodos CRUD
                postsAdapter.upsertMany(state, loadedPosts)
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
                // Aqui!
                postsAdapter.addOne(state, action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                //Esta linea tampoco!!!!!
                //const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                // sacar Linea de abajo!!!!!
                // const posts = state.filter(post => post.id !== id);
                // aqui!!
                postsAdapter.upsertOne(state, action.payload)
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                // Sacar linea de abajo!!!!
                // const posts = state.filter(post => post.id !== id);
                // Aqui!!
                postsAdapter.removeOne(state, id)
            })
    }
})

// el getSelectors crea estos selectors y nosotros los podemos renombrar
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds  // pasamos el estado normalizado
    // pasamos el selector que retorna el state de post slice
} = postsAdapter.getSelectors(state => state.posts)

// Eliminar esta linea
// export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

// Eliminar esta linea
// export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
)

export const getCount = (state) => state.posts.count;

export const { increaseCount, reactionAdded } = postsSlice.actions

export default postsSlice.reducer