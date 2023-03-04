import { useSelector } from "react-redux";

const PostList = () => {
    
    // Como vemos aqui estamos useando el useSelector para trer todas las publicaciones
    const posts = useSelector(state => state.posts);

    // Cremos una constante que contiene los posts ya mapiados y luego en el jsx paramos la constante
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
// Expotamos y lo importamos en App.js
export default PostList;
