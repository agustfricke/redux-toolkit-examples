import { useSelector } from "react-redux";
import { selectPostIds } from "../features/postsSlice";
import { useGetPostsQuery } from "../features/postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import AddNewPost from "./AddNewPost";

const PostList = () => {

    // Ponemos los diferentes estados que podemos recibir de useGetPostsQuery
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
            <AddNewPost/>
            { content }
        </div>
    )
}
export default PostList;


