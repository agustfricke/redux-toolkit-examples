import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Importamos el nuevo action
import { addNewPost } from "../features/postsSlice";
import { selectAllUsers } from "../features/usersSlice";

const AddPost = () => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    // Extra useState
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    const onUserIdChange = e => setUserId(e.target.value);

    // Ponemos ese can save
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePost = () => {
        // verificamos si esta todo ok
        if (canSave) {
            try {
                // Ponemos el status a pending
                setAddRequestStatus('pending')
                // Dsespachamos el payload y unwrap que es una funcion de redux toolkit, 
                // donde devolve una nueva promesa que tiene el action.payload o el error, basicamente nos permite
                // tener esta logica de try catch error
                dispatch(addNewPost({ title, body: content,userId })).unwrap()
            } catch (err) {
                // SI haye error
                console.error('Failed', err)
            } finally {
                // Siempre volvemos al estado incial
                setAddRequestStatus('idle')
            }
        }
    }
    
    const users = useSelector(selectAllUsers);

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
