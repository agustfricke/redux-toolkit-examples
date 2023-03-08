import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// camiar por selectPostIds
import { selectPostIds, getPostsStatus, getPostsError, fetchPosts } from "../features/postsSlice";
import PostsExcerpt from "./PostsExcerpt";


const PostList = () => {

    const dispatch = useDispatch();
    
    // Cambiamos esto
    const orderedPostIds = useSelector(selectPostIds); // pasamos el estado normalizado
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        // Esto lo estamos haciendo en el postsSlice
        // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <div>
            {content}
        </div>
    )
}
export default PostList;
