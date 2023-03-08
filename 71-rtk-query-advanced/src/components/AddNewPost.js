import { useState } from 'react';
import { useAddNewPostMutation } from '../features/postsSlice';
import { useNavigate } from 'react-router-dom';
// importamos
import { selectAllUsers } from '../features/usersSlice';
import { useSelector } from 'react-redux';

const AddNewPost = () => {

    const navigate = useNavigate()

    const [addNewPost, {isLoading}] = useAddNewPostMutation();

    const [body, setBody] = useState('')
    // Aqui
    const [ userId, setUserId] = useState('')

    const onBodyChange = e => setBody(e.target.value);
    // aqui
    const onUserIdChange = e => setUserId(e.target.value);

    // aqui
    const users = useSelector(selectAllUsers)
    
    // Agregamos el useriD
    const canSave = [body, userId].every(Boolean) && !isLoading;

    const onSavePost = async () => {
        if (canSave) {
            try {
                await addNewPost({ body, userId }).unwrap()
                setBody('')
                // vuelta a 0
                setUserId('')
                navigate('/')
            } catch (err) {
                console.log('Faild', err)
            }
        }
    }
    
    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <form>
            <input value={body} onChange={onBodyChange} placeholder="Add New Post"/>
            <select value={userId} onChange={onUserIdChange}>
                { userOptions }
            </select>
            <button type='button' onClick={onSavePost}>Post</button>
        </form>
    )
}
export default AddNewPost;
