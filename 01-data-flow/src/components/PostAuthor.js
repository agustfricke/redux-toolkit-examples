import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/usersSlice";

const PostAuthor = ({ userId }) => {

    const users = useSelector(selectAllUsers)

    const author = users.find(user => user.id === userId);

    return <span> { author ? author.name : 'No user' } </span>
}
export default PostAuthor;
