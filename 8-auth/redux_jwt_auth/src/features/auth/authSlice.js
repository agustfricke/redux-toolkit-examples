// importamos el create slice
import { createSlice } from "@reduxjs/toolkit"

// Creamos el authSlice
const authSlice = createSlice({
    name: 'auth',// name
    // El inital state va a ser un obecjto que va a tener un user y un token, que va a ser un access tokenque va a venir desde nuestra api
    initialState: { user: null, token: null }, 
    // vamos a tener 2 reducers
    reducers: {
        // El primero 
        setCredentials: (state, action) => {
            // descrtucuramos el user y accestoken que recivimos del action.payload
            const { user, accessToken } = action.payload
            // y ahora ponmos el este.user = 
            state.user = user
            state.token = accessToken
        },
        // El segundo va a ser el logout donde vamos a poner el sstate devuielta a  null
        logOut: (state, action) => {
            state.user = null
            state.token = null
        }
    },
})

// exportamos los 2 actions
export const { setCredentials, logOut } = authSlice.actions

// Y el reducer
export default authSlice.reducer

// creamos los selector donde obtenemos el usuario y el token
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
