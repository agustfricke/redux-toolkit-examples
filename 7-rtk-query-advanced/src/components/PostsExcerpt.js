import TimeAgo from "./TimeAgo";
import { Link } from 'react-router-dom';

import { useSelector } from "react-redux";
import { selectPostById } from "../features/postsSlice";

const PostsExcerpt = ({ postId }) => {
    const post = useSelector(state => selectPostById(state, postId))

    return (
        <article>
            <h2>{post.title}</h2>
            <p className="excerpt">{post.body}</p>
            <p className="postCredit">
                <Link to={`post/${post.id}`}>View Post</Link>
                <Link to={`edit/${post.id}`}>Edit Post</Link>
                <TimeAgo timestamp={post.date} />
            </p>
        </article>
    )
}

export default PostsExcerpt
