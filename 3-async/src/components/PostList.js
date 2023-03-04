// Importamos useEffect, useDispatch, los status y fetch posts
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "../features/postsSlice";
// Creamos postExcerpt y camos estos imports
// Impoamos el PostsExerpt
import PostsExcerpt from "./PostsExcerpt";


const PostList = () => {

    // Creamos el dipatch
    const dispatch = useDispatch();
    
    const posts = useSelector(selectAllPosts);
    // Ponemos el status y error
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        // Si no se ha hecho el request, lo hacemos solo una vez
        if (postStatus === 'idle') {
            // Despachamos el fetchPosts
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content;
    if (postStatus === 'loading') {
        // SI el estatusd el loding
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        // Si es exitosos
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
    } else if (postStatus === 'failed') {
        // Si hay error
        content = <p>{error}</p>;
    }

    return (
        <div>
            {content}
        </div>
    )
}
export default PostList;
