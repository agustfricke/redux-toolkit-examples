// Ahora lo sigueinte seria traer los usarios desde la api, vamos al userSlice
// Importamos el createAsyncThunk
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Importamos axios
import axios from "axios";

// Definimos el users_url
const USERS_URL = 'https"//jsonplaceholder.typicode.com/users';

// ponemos una arreglo vacio al initialState
const initialState = []

// creamos y exportmaos la funcion fetchUsers con el createAsyncThunk
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL)
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    // creamos el extraReducers
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload
        })
    }
})


export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;



