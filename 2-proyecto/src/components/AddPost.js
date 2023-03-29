import { useState } from "react";
// impotamos el useSelector
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "../features/postsSlice";
// importamos el selectAllUsers
import { selectAllUsers } from "../features/usersSlice";

const AddPost = () => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // Agregamos estado temporal para el userId
    const [userId, setUserId] = useState('');

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    // mas estado temporal
    const onUserIdChange = e => setUserId(e.target.value);

    const onSavePost = () => {
        // verificamos que tamvien estemos postiando un user
        if (title && content && userId) {
            // Despachamos el userId
            dispatch(postAdded(title, content, userId))
            setTitle('')
            setContent('')
            // Volvemos a su estado original
            setUserId('')
        }
    }
    
    // Creamos la constante users con el estado de los usuarios
    const users = useSelector(selectAllUsers);

    // Los mapiamos para poner las diferentes opciones 
    // lo pasamos en el jsx
    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <form>
            <select value={userId} onChange={onUserIdChange}>
                <option value=''></option>
            { userOptions }
            </select>
            <input value={title} onChange={onTitleChange} placeholder='Title'/>
            <input value={content} onChange={onContentChange} placeholder='Content'/>
            <button onClick={onSavePost} type='button'>POST</button>
        </form>
    )
}
export default AddPost;
