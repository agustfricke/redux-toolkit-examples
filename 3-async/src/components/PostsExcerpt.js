import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

// Pasamos el post como prop y cambiamos el content por body
const PostsExcerpt = ({ post }) => {
    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </div>
    )
}
export default PostsExcerpt
