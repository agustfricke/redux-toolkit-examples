// Creamos lo basico y lo importamos al store
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: '0', name: 'Agustin'},
    {id: '1', name: 'Carlos'},
    {id: '2', name: 'Pedro'},
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
