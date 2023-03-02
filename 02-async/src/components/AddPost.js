import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// remplamos por el addNewPost
import { addNewPost } from "../features/postsSlice";
import { selectAllUsers } from "../features/usersSlice";

const AddPost = () => {

    const dispatch = useDispatch();

    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    // Nuevo estado
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    
    const onUserChange = e => setUserId(e.target.value);
    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);

    // Ponemos el can save para poder crear publicaciones
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePost = () => {
        if (canSave) {
            try {
                // Ponemos el estado a pending
                setAddRequestStatus('pending')
                // despacamos el addNewPost con el contenido, 
                // redux toolkit agrega la funcion unwrap para la promesa retonada y esta devolve una nueva promesa con el payload
                // o con un error, gracias a estoe s que podemos manejar esta logica try catch
                dispatch(addNewPost({ title, body: content, userId })).unwrap()
                // Volvemos al estado incial
                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                // tiramos el error
                console.error('Faild to save the post', err)
            } finally {
                // volvemos al estado inical 
                setAddRequestStatus('idle')
            }
        }
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <div className="flex justify-center">
        <form>
            <select className="p-2 rounded-lg" value={userId} onChange={onUserChange}>
            <option value=''></option>
            { userOptions }
            </select>
            <input value={title} onChange={onTitleChange} 
                    className='rounded-lg p-2 m-2'
                    type='text'
                    placeholder="Title"/>
            <input value={content} onChange={onContentChange} 
                    className='rounded-lg p-2 m-2'
                    type='text'
                    placeholder="Content"/>
            <button onClick={onSavePost} 
                    type='button'
                    className='bg-white p-2 rounded-lg'>
                    CREATE
            </button>
        </form>
        </div>
    )
}
export default AddPost;

