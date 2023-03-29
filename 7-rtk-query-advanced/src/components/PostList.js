import { useSelector } from "react-redux";
import { selectPostIds } from "../features/postsSlice";
import { useGetPostsQuery } from "../features/postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostList = () => {

    const { isLoading, isSuccess, isError, error } = useGetPostsQuery();
    
    const orderedPostIds = useSelector(selectPostIds);

    let content;
    if (isLoading) {
        content = <p> Loading.. </p>
    } else if (isSuccess) {
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId}/>)
    } else if (isError) {
        content = <p> Error: {error} </p>
    }

    return (
        <div>
            { content }
        </div>
    )
}
export default PostList;


