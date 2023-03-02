// Mostrar codigo de incicio

// importamos el createSlice 
import { createSlice } from "@reduxjs/toolkit";

// Creamos el inital state
const initialState = [
    { id: '1', title:'Redux Toolkit', content: 'Me gusta el estado' },
    { id: '2', title:'JavaScript', content: 'Me gusta JavaScript' },
]

// Cremao el postsSlice
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {}
})

// Exportamos el reducer
export default postsSlice.reducer

// ####################################################################################

import { configureStore } from "@reduxjs/toolkit";
// Importamos el postsReducer al store
import postsReducer from '../features/posts/postsSlice';


export const store = configureStore({
    reducer: {
        // Agregamos el reducer
        posts: postsReducer,
    }
})

// ####################################################################################

// Cremos PostsList.js para mostrar todos los post de nuestro initialState 
// Importamos el useSelector
import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/postsSlice";

import React from 'react'

const PostList = () => {

    const posts = useSelector(selectAllPosts);

    const renderedPosts = posts.map (post => (
        <div key={post.id} className='bg-gray-300 m-4 p-3 rounded-lg'>
            <p className="text-xl">{post.title}</p>
            <p className="text-sm">{post.content}</p>
        </div>
    ))
  return (
    <div className="flex justify-center">
        <div>
            {renderedPosts}
        </div>
    </div>
  )
}

export default PostList

//  habalemos de este useSelector porque como vemos recibe el estado y despues 
// tenemos state.posts, pero que pasaria si la escriuctura de nuesto esdtado cambia?
// Ahora es state.posts pero en un futuro lo podriamos cambiar por algo como state.posts.posts 
// y basicamente tendriamos que cambiar todos los componentes donde estamso mostrando el state.posts,
// asi que por buenas practicas vamos a poner esta logica de state.posts en el SLice, asi si la estrucutra 
// de nuestro estado cambia solo lo vamos a tener que cambiar alli

// postsSlice.js => 
export const selectAllPosts = (state) => state.posts;

// PostsList.js => 

import { selectAllPosts } from "./postsSlice";

    const posts = useSelector(selectAllPosts)

// Okey ahora creemos la funcionalidad para crear nuevas publicaciones


// Dentro del reduceres vamos a crear action postAdded
// Okey Lo que estamos haciendo aca es anadir un objecto dentro del arreglo, 
// Pero si sabes react sabes que no podemos usar este metodo push ya que estaria mutando 
// el estado, lo que podriamos hacer es algo como esto [...state, action.payload] 
// donde copiamos el estado y luego agregamos el action.payloaod,esto seria la forma tipia y correcta, 
// pero com redux toolkit trata de simpficar mucho el tema del estado, entonces basicamente el 
// .push esta permitido en redux toolkit, solo dentro del createSlice ya que redux 
// toolkit utiliza algo que  se llama immerjs, que este esta creando nuevo estado por debajo usando immer js,
// entonces no estamos mutando nada, te dejo docuemntacion de immerjs en comentarios por si quieres saber mas sobre immerjs 

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded(state, action){
            state.push(action.payload)
            // [...state, action.payload]
        }
    }
})
// Luego exportamos el action asi lo podemos usar en nuestros componentes
export const { postAdded } = postsSlice.actions

// ##############################################################################

// Okey ahora creemos el componente AddPost.js para crear nuevas publicaciones

// Importamos useState para tener estaado temporal para el fromulario
import { useState } from "react";
// Importar el useDispatch y nanoId para generar id para el post
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
// Traemos el postadded de postSlice
import { postAdded } from "./postsSlice";

const AddPostForm = () => {

    // Creamos el dispatch
    const dispatch = useDispatch()

    // Ponemos el ttile y setTitle
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    // Ponemos el onTitle change y e.target.value para tener el tipico formulario que hariamos en react, poner el jsx sin el onCanSave
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    // Creamos el onSavePostClicked para ver si tenemos el titilo y titile
    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded({ id:nanoId(), title, content })
            )
            // Y despues volvemos el estado temporal de titile y content a un string vacio, ponemos esta funcion en el boton, uimportar el addpost a app.js 
            setTitle('')
            setContent('')
        }
    }
    // Creamos el cansave, test y despues crear el PostAuthor commponente
    const canSave = Boolean(title) && Boolean(content) 
    <div className="flex justify-center">
        <form className="mt-3">
            <input
            value={title}
            onChange={onTitleChange}
            className="rounded-lg p-2 m-2"
            type='text'
            placeholder="Title"/>
            <input
            value={content}
            onChange={onContentChange}
            className="rounded-lg p-2 m-2"
            type='text'
            placeholder="Title"/>
            <button 
            onClick={onSavePost}
            disabled={!canSave}
            className="bg-white text-black p-2 rounded-lg">CREATE</button>
        </form>
    </div>
export default AddPostForm // Exporar a App.js y test

// #################################################################################

// Okey esto lo podriamos mejorar, vamos a crear un callback en postsSlice asi simpficamos 
// los componentes
// Importamos el nanoId
import { createSlice, nanoid } from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            // Aqui vamos a crear algo que se llama un prepare callback, 
            // este callback puede generar ids, formatear los datos y devolver el objecto con el payload
            // , y vamos a poner eso para simplificar nuestro compnente y tambien para tner esta logica 
            // en el SLice, le pasamos el titile y content
            prepare(title, content) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                    }
                }
            }
        },
    }
})

// Ahora podemos volver a AddPost.js y modificar algunas cosas => sacamos el nanoID

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content, userId)
            )
            setTitle('')
            setContent('')
        }
    }

// Okey perfecto, ahora veamos redux devtools
// Okey ahora queremos agregar usuarios a nuestras publicaciones
// asi que creemos dentro de features/userSlice.js



import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', name: 'Agustin' },
    { id: '1', name: 'Carlos' },
    { id: '2', name: 'Pedro' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer

// Ahora lo tenemos que importar en el store.js
 
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer
    }
})

// Ahora agregemos la funcionalidad para agregar usuarios a nuestros publicaciones
// Para eso debemos modificar nuestro callback end postSlice

            prepare(title, content, userId) {
                return {
                    payload: {
                        // 4- 
                        id: nanoid(),
                        title,
                        content,
                        userId,
                    }
                }
            }
// Ahora vallamos a AddPost


// Sacamos el id y traemos el useSelector para obtener los usarios del arreglo
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
// traemos el selectAllUsers
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
    const [userId, setUserId] = useState('')
    
    const users = useSelector(selectAllUsers)

    const onAuthorChanged = e => setUserId(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                
                // Ponemos el userId
                postAdded(title, content, userId)
            )
            setTitle('')
            setContent('')
        }
    }

    // Creamos las opciones para los usuarios y el jsx
    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"

                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}
export default AddPostForm

// Okey ahora debemos mostrar los usuarios correspondiees de cada publicacione


// Traemos el arreglo de usuarios
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

// Pasamos el prop
const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers)
    // Encontramos el userId 
    const author = users.find(user => user.id === userId);
    // vemos si hay un autor y si no ponemos no hay autor e importaos a postLiist
    return <span>by {author ? author.name : 'Unknown author'}</span>
}
export default PostAuthor

// Importamos a PostsList
 import PostAuthor from "./PostAuthor";

 const PostsList = () => {

     const renderedPosts = orderedPosts.map(post => (
         <article key={post.id}>
             <h3>{post.title}</h3>
             <p>{post.content.substring(0, 100)}</p>
             <p className="postCredit">
                 <PostAuthor userId={post.userId} />
             </p>
         </article>
     ))

     return (
         <section>
             <h2>Posts</h2>
             {renderedPosts}
         </section>
     )
 }
 export default PostsList
 
// Okey perfecto ahora queremos agregar fechas a cada publicacion
// para eso debemos ir a postSlice y npm i date-fns 

import { sub } from 'date-fns';

    // Esto en el initialState con 10 y 5
        date: sub(new Date(), { minutes: 10 }).toISOString(),
    // Esto en el action
        date: new Date().toISOString(),


// Despues tenemos que crear un TimeAgo.js

import { parseISO, formatDistanceToNow } from 'date-fns';

// Psamos el timestamp como pprop
const TimeAgo = ({ timestamp }) => {
    let timeAgo = '' // decalramos variable
    if (timestamp) { // Si hay timestamp creamos el la fecha
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date) // Para que diga hace 5 min se creo esta publicacion
        timeAgo = `${timePeriod} ago` // ir a postList
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i> // Aqui solo devolvemos el timeAgo de arriba
        </span>
    )
}
export default TimeAgo

// Ahora importemos esto en el PostsList
import TimeAgo from "./TimeAgo";

const PostsList = () => {
    // 6- Poner los utimos posts al principio, este  localecompare va a devolver un -1,un 1
    // o un 0, basado en si uno es mas grade que otro, estamos pondiedo sort para ordenrlo, poemos el 
    // slice porque estamos creando un nuevo arreglo que lo estamos pondiedo dentro del orderedPosts 
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
        </article>
    ))
    // 1-c mostrar en jsx
    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}
export default PostsList

// Okey perfecto ahora lo que nos quedaria seria crear emoticones que lleven un contador


// Dentro del initialState
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
// Dentro del action 

                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }

// Dentro del reducer
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

// Exportamos el reactionAdded
export const { postAdded, reactionAdded } = postsSlice.actions


// Ahora creemos el compoennte que se va a encargar de esto:

// Importamos
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

// Ponemos los Emoji
const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

// Pasamos el prop post
const ReactionButtons = ({ post }) => {
    // Variable dispatch
    const dispatch = useDispatch()
    // Aqui estamos mapeando todo donde tenemso el key que es el name y el valor el emoji, y bueno cada boton seria un emoji
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        // Depachamos el reactionadded con el postId y la reaccion que esperamos recibir en el postSlice donde tenemos el reducer, importamos esto
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() =>
                    dispatch(reactionAdded({ postId: post.id, reaction: name }))
                }
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })
        // pasamos la contante donde tenemos los botones de arriba
    return <div>{reactionButtons}</div>
}
export default ReactionButtons


// Ahora lo que quedaria seria importar esto al PostList:

import ReactionButtons from "./ReactionButtons";

const PostsList = () => {
    const renderedPosts = orderedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    ))
    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}
export default PostsList

// Y perfecto ya estaria todo









