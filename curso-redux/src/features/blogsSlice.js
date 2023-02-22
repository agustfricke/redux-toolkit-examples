import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'http://127.0.0.1:8000/api'


const initialState = {
    blogs: [],
    status: 'idle', // idle, loading, success, fail
    error: null
}

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
    const response = await axios.get(`${URL}/get/`)
    return response.data
})

export const addNewBlog = createAsyncThunk('blogs/addNewBlog', async (initialBlog) => {
    const response = await axios.post(`${URL}/post/`, initialBlog)
    return response.data
})

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchBlogs.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchBlogs.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.blogs = state.blogs.concat(action.payload)
        })
        .addCase(fetchBlogs.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(addNewBlog.fulfilled, (state, action) => {
            state.blogs.push(action.payload)
        })
    }
})

export const selectAllBlogs = (state) => state.blogs.blogs;
export const getBlogsStatus = (state) => state.blogs.status;
export const getBlogError = (state) => state.blogs.error;


export default blogsSlice.reducer;