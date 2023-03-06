import { useState } from "react";
import { selectPostById } from "../features/postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdatePostMutation, useDeletePostMutation } from "../features/postsSlice";
import { useSelector } from "react-redux";

const EditPost = () => {

    const { postId } = useParams()

    const navigate = useNavigate()

    const [updatePost, {isLoading}] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation()

    const post = useSelector((state) => selectPostById(state, Number(postId)))


    const [body, setBody] = useState(post?.body)
    
    const onBodyChange = e => setBody(e.target.value)

    const canSave = Boolean(body) && !isLoading

    const onSavePost = async () => {
        if (canSave) {
            try {
                await updatePost({ id: post.id, body }).unwrap()
                setBody('')
                navigate('/')
            } catch (err) {
                console.error('Failed', err)
            }
        }
    }

    const onDeletePost = async () => {
        try {
            await deletePost({ id:post.id }).unwrap() 
            navigate('/')
        } catch (err) {
            console.error('Failed', err)
        } 
    }
    
    if (!post) {
        return (
            <div> 
                <p> No posts here! </p>     
            </div>
        )
    }
    return (

        <form>
            <input value={body} onChange={onBodyChange} placeholder="Add New Post"/>
            <button type='button' onClick={onSavePost}>Edit</button>
            <button type='button' onClick={onDeletePost}>Delete</button>
        </form>
    )
}
export default EditPost;
