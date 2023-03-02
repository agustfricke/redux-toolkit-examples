import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "../features/postsSlice";
import { selectAllUsers } from "../features/usersSlice";

const AddPost = () => {

    const dispatch = useDispatch();

    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    
    const onUserChange = e => setUserId(e.target.value);
    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);

    const onSavePost = () => {
        if (title, content, userId) {
            dispatch(
                postAdded(title, content, userId)
            )
            setTitle('')
            setContent('')
        }
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
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
    )
}
export default AddPost;

