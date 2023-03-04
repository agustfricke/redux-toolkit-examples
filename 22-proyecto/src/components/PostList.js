import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/postsSlice";

const PostList = () => {
    
    const posts = useSelector(state => state.posts);

    const renderedPosts = posts.map(post => (
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    ))

    return (
        <div>
        { renderedPosts }  
        </div>
    )
}
export default PostList;
