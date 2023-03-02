// Traemos el arreglo de usuarios
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

// Pasamos el prop
const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers)
    // Encontramos el userId 
    const author = users.find(user => user.id === userId);
    // vemos si hay un autor y si no ponemos no hay autor e importaos a postLiist
    return <span>by {author ? author.name : 'Unknown author'}</span>
}
export default PostAuthor