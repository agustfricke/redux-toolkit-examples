// Ahora tenemos que ir al compoenente y mostrar todas las publicaciones desde la api

// Okey lo primero seria importar el useDispatch
import { useDispatch, useSelector } from "react-redux";
// Lo segundo seria importar los exports que creamos el el slice
import { selectAllPosts, getPostsError, getPostStatus, fetchPosts } from "../features/postsSlice";
// importamos use effect de react
import { useEffect } from "react";
// Se elimina los importes de Autor, Time y Reacciones y se importa el PostsExcerpt
import PostsExcerpt from "./PostsExcerpt";

const PostList = () => {
    // creamos el dispatch para poder utilizarlo
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    // Obtenemos el status y el error con el useSelector
    const postsStatus = useSelector(getPostStatus);
    const error = useSelector(getPostsError);

    // despachamos el async thunk con el useEffect, checkiamos si es idle, para que solo lo despache una sola vez
    useEffect(() => {
        if (postsStatus === 'idle'){
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])

    let content;
    if (postsStatus === 'loading') {
        content = <p>Loading ... </p>
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post}/>)
    } else if (postsStatus === 'failed') {
        content = <p> {error} </p>
    }
    return (
        <div>
            { content }
        </div>
    )
}
export default PostList;
