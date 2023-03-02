// Importamos useState para tener estaado temporal para el fromulario
import { useState } from "react";
// 2- Importar el useDispatch, y nanao id para generar id para el post
// 4- Sacamos el nanoId
//5- Importamos el useSlelector
import { useDispatch, useSelector } from "react-redux";
// 2- traemos el postadded de postSlice
import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
    // 2- creamos el dispatch
    const dispatch = useDispatch()
    // 1- ponemos el ttile y settitle
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    // 5 Ponemos el state de userId
    const users = useSelector(selectAllUsers)
    // 1- Ponemos el onTitle change y e.target.value para tener el tipico formulario que hariamos en react, poner el jsx sin el onCanSave
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    // 5 Ponemos el onChane de userId
    const onAuthorChanged = e => setUserId(e.target.value)
    // 2- Creamos el onSavePostClicked para ver si tenemos el titilo y titile
    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                // 2- pasamos el id, title y content
                
                postAdded(id:nanoId(), title, content)
                // 3- Ookey esto lo podriamos mejorar, basicamente aca el componente nesesita saber los detalles, queremos simplificar esto, para eso vamos a ir al postsSlice
                // 3- Ookey esto lo podriamos mejorar, basicamente aca el componente nesesita saber los detalles, queremos simplificar esto, para eso vamos a ir al postsSlice

                // 4- Ponemos esto y perfecto todo funciona, ver redux devtools y creamos el userSlice
                // 5- ponemos el userId
                postAdded(title, content, userId)
            )
            // 2- Y despues volvemos el estado temporal de titile y content a un string vacio, ponemos esta funcion en el boton, uimportar el addpost a app.js 
            setTitle('')
            setContent('')
        }
    }
    // Creamos el cansave, test y despues crear el PostAuthor commponente
    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

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
