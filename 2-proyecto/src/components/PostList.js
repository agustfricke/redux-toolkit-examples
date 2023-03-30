import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostList = () => {
    
    const posts = useSelector(selectAllPosts);

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map(post => (
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <PostAuthor userId={post.userId}/>
            <ReactionButtons post={post}/>
            <TimeAgo timestamp={post.date}/>
        </div>
    ))

    return (
        <div>
        { renderedPosts }  
        </div>
    )
}
export default PostList;
