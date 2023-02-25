import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, selectBlogById, updateBlog } from "../features/blogsSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditBlogForm = () => {

    const { blogId } = useParams();

    const navigate = useNavigate();

    const blog = useSelector((state) => selectBlogById(state, Number(blogId)));

    const [body, setBody] = useState(blog?.body);
    const [requestStatus, setRequestStatus] = useState('idle');

    const dispatch = useDispatch();

    if (!blog) {
        return (
            <h1>No Blogs!</h1>
        )
    }

    const handleSave = () => {
        if (Boolean(body) && requestStatus === 'idle') {
            try {
                setRequestStatus('pending')
                dispatch(updateBlog({ id: blog.id, body }))

                    setBody('');
                    navigate('/')
            } catch (err) {
                console.log('Faild to save the blog', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const deleteHandler = () => {
        try {
            setRequestStatus('pending')
            dispatch(deleteBlog({ id: blog.id })).unwrap()

            setBody('')
            navigate('/')
        } catch (err) {
            console.log('Faild to delete blog', err)
        } finally {
            setRequestStatus('idle')
        }
    }
    return (
        <div className="flex justify-center">
            <form className="mt-3">
                <input
                className="rounded-lg p-2 m-2"
                type='text'
                placeholder="Title"
                value={body}
                onChange={(e) => setBody(e.target.value)}/>
                <button 
                onClick={handleSave}
                className="bg-white text-black p-2 rounded-lg"
                type="button">Create</button>
                <button 
                onClick={deleteHandler}
                className="bg-white text-black p-2 rounded-lg"
                type="button">Delete</button>
            </form>
        </div>
    )
};

export default EditBlogForm;

