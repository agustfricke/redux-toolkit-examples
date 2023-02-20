import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/usersSlice";

const PostUser = ({ userId }) => {

    const users = useSelector(selectAllUsers);

    const author = users.find(user => user.id === userId);

    return <span> By {author ? author.name : 'No tiene usuario'}</span>
}

export default PostUser;