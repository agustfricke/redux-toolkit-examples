import { useSelector } from "react-redux";
// Lo importamos aqui
import { selectAllPosts } from "../features/postsSlice";

const PostList = () => {
    
    // Este componente se puede mejorar, hablemos de este useSelector donde basicamente recibe el estado (state)
    // y despues recivimos state.posts, pero las estructura de nuestro estado podria cambiar, en un futuro podria
    // ser state.posts.posts, que ya vamos a a ver porque esto podria pasar, pero basicamente lo que queremos es poner
    // esta logica en el Slice, asi el comoponente no nesitsta saber la estructura del estado, y si llegamos a
    // nesesitar cambiar la estructura del estadi solo vamos a tener que cambiar el postsSlice

    const posts = useSelector(state => state.posts);

    // Lo cambiamos por esto solo
    // const posts = useSelector(selectAllPosts);

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
