import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "../features/usersSlice";
import { useGetPostsByUserIdQuery } from "../features/postsSlice";


const SoloUser = () => {

    const { userId } = useParams()

    const user = useSelector(state => selectUserById(state,  Number(userId)))

    const { 
        data: postsForUser,
        isLoading, 
        isSuccess, 
        isError, 
        error
    } = useGetPostsByUserIdQuery(userId)

    let content;
    if (isLoading) {
        content = <p> Loading... </p>
    } else if (isSuccess) {
        const { ids, entities } = postsForUser
        console.log(ids)
        content = ids.map(id => (
            <div key={id}>
                <Link to={`/post/${id}`}> { entities[id].body} </Link>
            </div>
        ))
    } else if (isError) {
        content = <p> { error } </p>
    }

    return (
        <div>
            <h2> Posts from { user?.name } </h2>
        { content } 
        </div>
    )


}
export default SoloUser
