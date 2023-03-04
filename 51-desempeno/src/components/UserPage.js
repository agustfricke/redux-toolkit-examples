import { useSelector } from 'react-redux'
import { selectUserById } from '../features/usersSlice'
// Importamos lo queacabamos de crear
import { selectAllPosts, selectPostsByUser } from '../features/postsSlice'
import { Link, useParams } from 'react-router-dom'

const UserPage = () => {

    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))

        // Basicamente el problema es este filter, no tiene nada de malo pero cuando hacemos esto 
        // el filter esta returnando un nuevo arreglo cada vez que usemos el useSelector, y el useSelector
        // corre cada vez que una accion es despachada, entonces cada vez que despachamas la cuenta del contador en la barra de navegacion
        // este useSelector se va a activar y va a renderizar nuevamente el componente gracias a este filter, podemos arrgelar esto con
        // un memoized, entonces vallamos nuevamente al postsSlice

    // Ponemos esto
    const postsForUser = useSelector(state => selectPostsByUser(state, Number(userId)))

    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))
    console.log(user)

    return (
        <div>
            <h2>{user?.name}</h2>

            <ol>{postTitles} </ol>
        </div>
    )
}

export default UserPage
