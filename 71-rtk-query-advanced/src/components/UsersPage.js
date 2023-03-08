import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/usersSlice";
import { Link } from "react-router-dom";


const UsersPage = () => {

    const users = useSelector(selectAllUsers)

    const renderedUsers = users.map(user => (
        <div key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>            
        </div>
    ))

    return (
        <section>
        <h2> All Users </h2>
        { renderedUsers }
        </section>
    )
}
export default UsersPage;
