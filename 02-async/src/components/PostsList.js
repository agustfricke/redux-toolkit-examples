import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, getPostsError, getPostStatus, fetchPosts } from "../features/postsSlice";
import { useEffect } from "react";
import PostsExcerpt from './PostsExcerpt';

const PostList = () => {

    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (postsStatus === 'idle'){
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])

    let content;
    if (postsStatus === 'loading') {
        content = <p>Loading ... </p>
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post}/>)
    } else if (postsStatus === 'failed') {
        content = <p> {error} </p>
    }
    return (
        <div>
            { content }
        </div>
    )
}
export default PostList;
