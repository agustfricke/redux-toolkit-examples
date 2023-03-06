import { useState } from 'react';
import { useAddNewPostMutation } from '../features/postsSlice';
import { useNavigate } from 'react-router-dom';

const AddNewPost = () => {

    const navigate = useNavigate()

    const [addNewPost, {isLoading}] = useAddNewPostMutation();

    const [body, setBody] = useState('')

    const onBodyChange = e => setBody(e.target.value);

    const canSave = Boolean(body) && !isLoading;

    const onSavePost = async () => {
        if (canSave) {
            try {
                await addNewPost({ body }).unwrap()
                setBody('')
                navigate('/')
            } catch (err) {
                console.log('Faild', err)
            }
        }
    }

    return (
        <form>
            <input value={body} onChange={onBodyChange} placeholder="Add New Post"/>
            <button type='button' onClick={onSavePost}>Post</button>
        </form>
    )
}
export default AddNewPost;
