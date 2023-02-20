import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { postAdded } from "../features/postsSlice";

const AddPost = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    
    const handleSubmit = () => {
        if (title) {
            dispatch(
                postAdded({
                    id: nanoid(),
                    title
                })
            )
            setTitle('')
        }
    }
    return (
        <div>
            <form>
                <input 
                type='text'
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}/>
                <button onClick={handleSubmit} type="button">Create</button>
            </form>
        </div>
    )
}
export default AddPost;
