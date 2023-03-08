import TimeAgo from "./TimeAgo";
import { Link } from 'react-router-dom';

import { useSelector } from "react-redux";
import { selectPostById } from "../features/postsSlice";
// importamos
import PostAuthor from "./PostAuthor";

const PostsExcerpt = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId))

    return (
            <div>
            <h2>{post.body}</h2>
                <Link to={`post/${post.id}`}>View Post</Link>
                <br/>
                <Link to={`post/edit/${post.id}`}>Edit Post</Link>
                <br/> 
                <TimeAgo timestamp={post.date} />
                <br/>
                <PostAuthor userId={post.userId}/>
            </div>
    )
}

export default PostsExcerpt
