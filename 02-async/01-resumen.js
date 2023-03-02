// hey hola! En este capitulo vamos a ver Redux Toolkit para acciones asyncronas con axios!

// Reudx Toolkit hace todo sinconricamente, asi que en teroria todo lo que pase asinconrmante tendria
// que pasar fuera del store, pero ahi es donde entra el reduxMiddleware, hoty en dia el middleware que mas
// se usa es el Redux Thunk, basicamente el termino thunk en programacion siginfica codigo que hace trabajo
// con deplay

// En este capitulo vamos a seguir donde dejamos en el capitulo anterior
// Lo primero que vamos a hacer es modificar alunas cosas en el features/postsSlice.js

// 2- Okey ahora lo sigiente que queremos hacer es importar el createAsyncThunk para manejar la logica asyncrona con redux toolkit
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import sub from "date-fns/sub";
// 3- Tambien importemos e instalemos axios
import axios from "axios";

// 2- Tambien voy a definfir una URL base de donde vamos a estar haciendo las peticiones a la API
const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

// 1- Lo primero que vamos a hacer es eliminar este estado incial estatico y lo vamos a cambiar
// ya que vamos a estar trayendo datos desde una API
const initialState = {
    posts: [], // Ahora como vemos tenemos posts y un arreglo vacio, porque lo vamos a llenar de datos con la API
    status: 'idle', // idle | loading | succeded | faild => vamos a estar trabajando con estos 4 estados
    error: null, // Despues tenemos error, por si llegamos a tener algun error, lo queremos maipular tambien
}
// 1- Ahora como la estructura de nuestro estado acaba de cambiar tenemos que modificar algunas lineas de codigo
// asi que encontremos las refencias hechas al estado inicial
// Ahora tenemos state.posts.posts porque en nuestro createSlice tenemos el nombre posts y despues en el initialState tambien tenemos posts
// Y basicamente es por eso que en el capitulo anterior creamos este selectAllPosts, basicamente como la estructura de nuestro estado cambio
// solo debemos modificar este archivo y no los componentes.

// 4- Okey ahora vamos a exportar una funcion con el createAsyncThunk
// createAsyncThunk recibe 2 argumentos, el primero es un string para el action type, que basicamente es como un nombre que le tenemos que poner
// el segundo argumento es una funcion callback que crea el payload, esta retorna o una promsea con los datos, o por contrario
// una promesa rchazada
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POST_URL)
    return response.data
})

// 5- Como vemos aca tenemos el postsSlice tenemos el reducer y todo el codigo que pusimos en el anterior capitulo
// pero aveces este el slice reducer nesesita responser a otros action, ahi es donde entran los extraReducers
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                // Aqui hay que cambiar el estado
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title, 
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            like: 0,
                            unlike: 0,
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            // Aqui hay que cambiar el estado
            const existingPosts = state.posts.find(post => post.id === postId)
            if (existingPosts) {
                existingPosts.reactions[reaction]++
            }
        }
    },
    // 5- Aca vamos a poner el extraReducer donde recibe como paramtro un builder, este paramtro es un ojbecto que nos permite definir
    // diferentes metodos que nos permite definir casos de reducers adicionales, que van a correr con loas actiones definidos fuera del slice
    extraReducers(builder) {
        builder
            // Okey como vemos vamos a manejar 3 action types que pueden ser despachados con el thunk, basada en la promesa que retorna
            // cuando el request comienze el estatus va a cambiar a loading
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            // si el request es exitoso, vamos a cambiar el estatus a succeded y vamos a mostrar todos los posts con el state.posts
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Aqui definimos la variable 5 min que nos va a serivir para no mostrar todas las fechas iguales
                let min = 5 
                // Okey creamos la const loaded post donde mapeamos el action.payload para mapear los posts cargados
                const loadedPosts = action.payload.map(post => {
                    // Aqui le agreamos la fecha las publicaciones, donde le agreamos 5 min entre ellas, asi no tienen la misma fecha
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    // despues aca estamos poniendo las reacciones, que comienzan todas en 0
                    post.reactions = {
                        like: 0,
                        unlike: 0
                    }
                    // Y despues aca retonamos el post carado
                    return post
                });
                // despues aca agreamos loas posts cargados al estado, con el metodo concat
                state.posts = state.posts.concat(loadedPosts);
            })
            // Luego aqui si el estado no es exitoso vamos a cambiar el estatus a failed, y mostramos el mensage del error
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { postAdded, reactionAdded } = postsSlice.actions;

// Aqui tambien
export const selectAllPosts = (state) => state.posts.posts;
// 5- Okey exportemos el state.status 
export const getPostStatus = (state) => state.posts.status;
// 5- Okey exportemos el state.error
export const getPostsError = (state) => state.posts.error;

export default postsSlice.reducer;
