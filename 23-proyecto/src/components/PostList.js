import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/postsSlice";
// importamos el PostAuthor y pasamos el prop userId que es el user de la publicacion
import PostAuthor from "./PostAuthor";

const PostList = () => {
    
    const posts = useSelector(selectAllPosts);

    const renderedPosts = posts.map(post => (
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <PostAuthor userId={post.userId}/>
        </div>
    ))

    return (
        <div>
        { renderedPosts }  
        </div>
    )
}
export default PostList;
