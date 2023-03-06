import { useSelector } from "react-redux";
import { selectPostById } from "../features/postsSlice";
import TimeAgo from "./TimeAgo";
import { useParams, Link } from "react-router-dom";

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
            <h2> { post.title } </h2>
            <p> { post.body } </p>
            <TimeAgo timestamp={post.date}/>
        </div>
    )
}
export default SoloPost;
