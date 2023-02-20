import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "../features/postsSlice";
import { selectAllUsers } from "../features/usersSlice";


const AddPost = () => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState('');
    
    const users = useSelector(selectAllUsers);

    const handleSubmit = () => {
        if (title) {
            dispatch(
                postAdded(title, userId)
            )
            setTitle('')
        }
    }
    return (
        <div className="flex justify-center">
            <form className="mt-3">
                <select
                className="rounded-lg p-2"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                    {user.name}
                    </option>
                ))}
                </select>
                <input
                className="rounded-lg p-2 m-2"
                type='text'
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}/>
                <button 
                className="bg-white text-black p-2 rounded-lg"
                onClick={handleSubmit} 
                type="button">Create</button>
            </form>
        </div>
    )
}
export default AddPost;
