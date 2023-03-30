import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostById, updatePost, deletePost } from '../features/postsSlice'
import { useParams, useNavigate } from 'react-router-dom'

import { selectAllUsers } from '../features/usersSlice';

const EditPost = () => {

    const { postId } = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    const onUserIdChange = e => setUserId(Number(e.target.value));

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

    const onSavePost= () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const userOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >{user.name}</option>
    ))

    const onDeletePost = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    return (
        <form>
            <select value={userId} onChange={onUserIdChange}>
                <option value=''></option>
            { userOptions }
            </select>
            <input value={title} onChange={onTitleChange} placeholder='Title'/>
            <input value={content} onChange={onContentChange} placeholder='Content'/>
            <button onClick={onSavePost} type='button'>POST</button>
            <button onClick={onDeletePost} type='button'>DELETE</button>
        </form>
    )
}

export default EditPost
