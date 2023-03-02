import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: '0', name: 'Carlos'},
    {id: '1', name: 'Agus'},
    {id: '2', name: 'Pepe'},
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})


export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;

