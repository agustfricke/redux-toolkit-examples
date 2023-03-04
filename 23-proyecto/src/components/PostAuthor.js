import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/usersSlice";

const PostAuthor = ({ userId }) => {
    
    // Traemos el estado de los usuarios
    const users = useSelector(selectAllUsers);

    // Encontramos el userId que pasamos a travez del prop que viene de cada publicacion
    const author = users.find(user => user.id === userId);
    
    // Lo encontra? Pone el nombre del usuario/autor y si no mostra que no hay usuario
    return <span> by { author ? author.name : 'Unknown author' } </span>
}
export default PostAuthor;
