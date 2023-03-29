// importamos los icons de react icons
import { AiFillDislike, AiFillLike } from "react-icons/ai";
// Importamos el useDispatch
import { useDispatch } from "react-redux";
import { reactionAdded } from "../features/postsSlice";

// creamos un objecto con like y unlike con sus respectivos valores de iconos
const reactionEmoji = {
    like: <AiFillLike/>,
    unlike: <AiFillDislike/>
}

// Le pasamos el prop post
const ReactionButtons = ({ post }) => {

    // Ponemos el dispatch para usarlo
    const dispatch = useDispatch();    

    // Aca tenemos un object lookup donde recibe el objecto reactionEmoji y le ponemos su key y value
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            // Una vez dentro del jsx podemos hacer referencia al name y al emoji
            // Despachamos con onClick pasando el id del post y la reacion qu esperamos recibir en el postSlice
            // Y luego podemos pasar el numero de likes o dislikes con el post.reactions[name]
            <button key={name} type='button' onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}>
                { emoji } { post.reactions[name] }
            </button>
        )
    })

    // Pasamos la contante reacion buttons al jsx

    return (
        <div>
            { reactionButtons }
        </div>
    )

}
export default ReactionButtons;

