import { useSelector } from "react-redux";
import { selectPostById } from "../features/postsSlice";
import TimeAgo from "./TimeAgo";
import { useParams, Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const SoloPost = () => {

    const { postId } = useParams();

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <div>
                <p> No post found! </p>
            </div>
        )
    }

    return (
        <div>
            <h2> { post.body } </h2>
                <br/> 
                <TimeAgo timestamp={post.date} />
                <br/>
                <PostAuthor userId={post.userId}/>
                <br/>
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
            <TimeAgo timestamp={post.date}/>
        </div>
    )
}
export default SoloPost;
