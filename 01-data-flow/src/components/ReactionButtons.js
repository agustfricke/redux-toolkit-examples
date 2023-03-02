import { useDispatch } from "react-redux";
import { reactionAdded } from "../features/postsSlice";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

const reactionIcon = {
    like: <AiFillLike size={30}/>,
    unlike: <AiFillDislike size={30}/>
}

const ReactionButtons = ({ post }) => {

    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionIcon).map(([name, icon]) => {
        return (
            <button
                key={name}
                type='button'
                onClick={() => 
                        dispatch(reactionAdded({ postId: post.id, reaction: name }))
                }
            >
            { icon } { post.reactions[name]}
            </button>
        )
    })

    return (
        <div> {reactionButtons} </div>
    )
}
export default ReactionButtons;

