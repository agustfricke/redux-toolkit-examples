import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
// importamos link para rediregir
import { Link } from "react-router-dom";
// IMportamos react
import React from "react";

let PostsExcerpt = ({ post }) => {
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
// Lo que hace es que este componente no se va a renderizar nuevamente si el prop que reciee no cambio
PostsExcerpt  = React.memo(PostsExcerpt)

export default PostsExcerpt
