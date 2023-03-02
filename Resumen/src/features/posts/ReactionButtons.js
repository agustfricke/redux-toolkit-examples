// Importamos
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

// Ponemos los Emoji
const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

// Pasamos el prop post
const ReactionButtons = ({ post }) => {
    // Variable dispatch
    const dispatch = useDispatch()
    // Aqui estamos mapeando todo donde tenemso el key que es el name y el valor el emoji, y bueno cada boton seria un emoji
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        // Depachamos el reactionadded con el postId y la reaccion que esperamos recibir en el postSlice donde tenemos el reducer, importamos esto
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() =>
                    dispatch(reactionAdded({ postId: post.id, reaction: name }))
                }
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })
        // pasamos la contante donde tenemos los botones de arriba
    return <div>{reactionButtons}</div>
}
export default ReactionButtons