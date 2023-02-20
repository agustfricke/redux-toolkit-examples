// Okey hablemos de este use selector,
// donde basicamente recibe el estado y despues recibimos state.post
// Pero que pasaria si la estrucuta de nuestro state cambia,
// Ahora sabemos que tenemos state.post pero en un futuro podria ser 
// state.post. algo mas, y basicamente seria mejor tener el useSelector en 
// el slice ya que si la estructura cambia solo tendriamos que modificar
// el archivo donde esta el slice y no en todos los componentes 

import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/postsSlice";

const PostsList = () => {

    const posts = useSelector(selectAllPosts);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <p>{post.title}</p>
                </div>
            ))}
        </div>
    );
};
export default PostsList;
