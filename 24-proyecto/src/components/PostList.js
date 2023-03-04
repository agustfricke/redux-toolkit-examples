import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/postsSlice";
import PostAuthor from "./PostAuthor";
// Importamos y se lo pasamos en renderedPosts
import TimeAgo from "./TimeAgo";

const PostList = () => {
    
    const posts = useSelector(selectAllPosts);

    // Estamos tomando todos los posts, y este localeCompare va a devolver un 1, un -1 p un 0 basado en si uno es mas grade que otro
    // y este metodo sort hace la comparacion y luego con el slice estamos haciendo una copia de este array y eso es lo que tenemos en el orderedPosts
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    // Despues mapiamos sobre esa constante
    const renderedPosts = orderedPosts.map(post => (
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <PostAuthor userId={post.userId}/>
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
