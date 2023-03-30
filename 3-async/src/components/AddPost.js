import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../features/postsSlice";
import { selectAllUsers } from "../features/usersSlice";

const AddPost = () => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    const onUserIdChange = e => setUserId(e.target.value);

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePost = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content,userId })).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                console.error('Failed', err)
            } finally {
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
