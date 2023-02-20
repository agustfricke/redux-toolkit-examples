// Okey hablemos de este use selector,
// donde basicamente recibe el estado y despues recibimos state.post
// Pero que pasaria si la estrucuta de nuestro state cambia,
// Ahora sabemos que tenemos state.post pero en un futuro podria ser 
// state.post. algo mas, y basicamente seria mejor tener el useSelector en 
// el slice ya que si la estructura cambia solo tendriamos que modificar
// el archivo donde esta el slice y no en todos los componentes 

import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/postsSlice";
import PostAuthor from "./PostAuthor";


const PostsList = () => {

    const posts = useSelector(selectAllPosts);
    

    return (
        <div className="flex justify-center">
            <div>
            {posts.map(post => (
                
                <div key={post.id}>
                    
            <div className="bg-gray-300 m-4 rounded-lg p-3">
                    <p>{post.title}</p>
                    <PostAuthor userId={post.userId}/>
                </div>
                </div>
            ))}
             </div> 
             </div> 
    );
};
export default PostsList;
