import { useDispatch } from "react-redux";
import { reactionAdded } from "../features/postsSlice";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

const reactionEmoji = {
    like: <AiFillLike/>,
    unlike: <AiFillDislike/>
}

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch()

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
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

    return <div>{reactionButtons}</div>
}
export default ReactionButtons