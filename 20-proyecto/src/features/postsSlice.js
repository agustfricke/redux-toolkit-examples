// importamos como siempre el createSlice
import { createSlice } from "@reduxjs/toolkit";

// Creamos el initalState que basicamente es un array con 2 objectos dentro, que tienen los campos de id, title y content
const initialState = [
    { id: '0', title: 'Redux Toolkit', content: 'Me encanta Redux Toolki' },
    { id: '1', title: 'JavaScript', content: 'Me encanta JavaScript' },
]

// Creamos el postsSlice
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {}
})

// exportamos el reducer y lo importamos en el store
export default postsSlice.reducer;
