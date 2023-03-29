// Importamos lo nesesario
import { useSelector } from 'react-redux'
import { selectPostById } from '../features/postsSlice'

// importamos los componentes
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

// Importamos useParams para el ID
import { useParams } from 'react-router-dom';
// Link para redirect
import { Link } from 'react-router-dom';

const SoloPost = () => {
    // Encontramos el match en la URl
    const { postId } = useParams()

    // Encontramos el solo Post pasandole el id de la url que espera recibir en el postSlice
    const post = useSelector((state) => selectPostById(state, Number(postId)))

    // Nos fijamos si existe
    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    // Retonamos el post en jsx
    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p className="postCredit">
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default SoloPost;
