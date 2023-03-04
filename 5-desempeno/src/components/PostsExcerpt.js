import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
// importamos link para rediregir
import { Link } from "react-router-dom";

const PostsExcerpt = ({ post }) => {
    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
                <Link to={`post/${post.id}`}>See more</Link>
            </p>
            <ReactionButtons post={post} />
        </div>
    )
}
export default PostsExcerpt
