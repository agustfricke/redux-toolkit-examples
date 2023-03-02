// 1- importamos creatSlice
// 1- importamos creatSlice
import { createSlice, nanoid } from "@reduxjs/toolkit";
// 6- Importamos sub
import { sub } from 'date-fns';
// 3- Ahora queremos agregar nuevas publicaciones
// dentro del reduceres crear action:
// postAdded(state, action) {state.push(action.payload)}
// Okey Lo que estamos haciendo aca es anadir un objecto dentro del arreglo, Pero si sabes react sabes que nopodemos usar este metodo push ya que estaria mutando el estado, lo que podriamos hacer es algo como esto [...state, action.payload] donde copiamos el estado y luego agregamos el action.payloaod,esto seria la forma tipia , pero com redux toolkit trata de simpficar mucho el tema del estado, pero basicamente el .push esta permitido en redux toolkit, solo dentro del createSlice ya que redux toolkit utiliza algo que  se llama immerjs, pero con el .psuh no estamos mutando el estado, solo estamos creando nuevo estado por debajo usando immer js, te dejo docuemntacion en losc comentarios 

// 1- Crear inital State
const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        // 6- Ponemos el date, tambien en el prepare, cr4eamos componente de time
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
]
// Crear postsSlice
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            // 4- Empioeza aqui
            reducer(state, action) {
                state.push(action.payload)
            },
            //4- Aqui vamos a crear algo que se llama un prepare callback, este callback puede generar ids, formatear los datos y devolver el objecto con el payload, y vamos a poner eso para simplificar nuestro compnente y tambien para tner esta logica en el SLice, le pasamos el titile y content

            //5 Ponemso el userID para asociar el usuario al post que se creo
            prepare(title, content, userId) {
                return {
                    payload: {
                        // 4- 
                        id: nanoid(),
                        title,
                        content,
                        // 4- Hasta aqui, importamos nanoId y volvemos al form
                        date: new Date().toISOString(),
                        userId,
                        // 6- Poner las reactions en el callback
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        // 6- Crear action apra las reacciones
        reactionAdded(state, action) {
            // Descontruimos le postId y el reaction
            const { postId, reaction } = action.payload
            // Creamos el existing post y lo intentamos encontrar con el Id
            const existingPost = state.find(post => post.id === postId)
            // Si existe lo vamos a agregar la reaccion
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

// 2- Crear el slelectAllPosts 
export const selectAllPosts = (state) => state.posts;

// 3- Exportar postAdded
// 6- Exportamos el reactionAdded y creo componente ReactionButton
export const { postAdded, reactionAdded } = postsSlice.actions
// 1- Export reducer 
export default postsSlice.reducer
