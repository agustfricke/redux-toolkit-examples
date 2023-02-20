import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: '1', name: 'Tech con Agust'},
    {id: '2', name: 'Agustin'}
];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;