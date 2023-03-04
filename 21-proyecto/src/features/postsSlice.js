import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', title: 'Redux Toolkit', content: 'Me encanta Redux Toolki' },
    { id: '1', title: 'JavaScript', content: 'Me encanta JavaScript' },
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // Creamos el action
        // Recibe el estado y el action, y pasamos el action.payload con el state.push 
        // que serian los datos que vamos a tener en el formulario
        // pero si lo vemos mas de cerca en react en realidad no podemos usar muy frecuentemente este metodo push
        // ya que estaria mutando el estado, entonmces lo que teniramos que hacer en React seria [...state, action.payload]
        // donde basicamente copiamos el estado y depues agregamos el action.payload, pero en realidad eso no hace falta
        // hacerlo con redux toolkit, mas especificamente dentro de este createSlice, ya que este utiliza immerJS, donde 
        // este no esta mutando el estado, esta creando nuevo estado por debajo sin que nosotros nos demos cuenta y es por eso
        // que podemos utilizar el metodo push en este caso
        postAdded(state, action) {
            state.push(action.payload)
        }
    }
})

// Okey aqui vamos a poner lo siguente que es bien parecido a lo que teniamos en el componente PostList
// Ahora lo podemos importar en el PostList
export const selectAllPosts = (state) => state.posts;

// Destructuramos y exportamos el action
export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
