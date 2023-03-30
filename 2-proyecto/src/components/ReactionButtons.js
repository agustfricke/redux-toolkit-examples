import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { reactionAdded } from "../features/postsSlice";

const reactionEmoji = {
    like: <AiFillLike/>,
    unlike: <AiFillDislike/>
}

const ReactionButtons = ({ post }) => {

    const dispatch = useDispatch();    

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button key={name} type='button' onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}>
                { emoji } { post.reactions[name] }
            </button>
        )
    })


    return (
        <div>
            { reactionButtons }
        </div>
    )

}
export default ReactionButtons;

