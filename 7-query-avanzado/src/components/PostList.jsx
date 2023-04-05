import { useSelector } from "react-redux";
import { selectPostIds } from "../features/postsSlice";
import { useGetPostsQuery } from "../features/postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import Loader from "./Loader";
import AddPost from "./AddPost";
import toast from 'react-hot-toast';

const PostList = () => {

    const { isLoading, isSuccess, isError, error } = useGetPostsQuery();
    
    const orderedPostIds = useSelector(selectPostIds);

    const err = (err) => toast.error(err);

    let content;
    if (isLoading) {
        content = <Loader/>
    } else if (isSuccess) {
        content = orderedPostIds.map(postId =>         
            <PostsExcerpt key={postId} postId={postId}/>
        )
    } else if (isError) {
        err(error)
    }


  return (
    <>
        <AddPost />
        {content}
    </>
  )
}

export default PostList