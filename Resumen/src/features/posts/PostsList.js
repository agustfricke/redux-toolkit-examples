// 1- Improar useSlelector
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
// 3- Importamos el postAuthor y lo pnemos el el jsx y test, fecha -> npm i date-fns -> postSlice
import PostAuthor from "./PostAuthor";
// 4- imprtaos timeago
import TimeAgo from "./TimeAgo";
// 7 importamos el reaction Buttons y ponerlo en el jsx
import ReactionButtons from "./ReactionButtons";

const PostsList = () => {
    // 1-a- Estamos suando el selector para traer todos los posts de nuestro initalstate
    // 1-d habalemos de este useSelector porque como vemos recibe el estado y despues tenemos state.posts, pero que pasaria si la escriuctura de nuesto esdtado cambia? Ahora es state.posts pero en un futuro lo podriamos cambiar por algo como state.posts.posts y basicamente tendriamos que cambiar todos los componentes donde estamso mostrando el state.posts, asiq ue por buenas practicas vamos a poner esta logica de state.posts en el SLice, asi si la estrucutra de nuestro estado cambia solo lo vamos a tener que cambiar alli
    // const posts = useSlelector(state => state.posts)

    // 2- Poner todos los posts de manera mas eficiente, ahora el componente no nesesita saber como esta estructoruado nustro estado.
    const posts = useSelector(selectAllPosts)
    // 6- Poner los utimos posts al principio, este  localecompare va a devolver un -1,un 1 o un 0, basado en si uno es mas grade que otro, estamos pondiedo sort para ordenrlo, poemos el slice porque estamos creando un nuevo arreglo que lo estamos pondiedo dentro del orderedPosts -> test
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    // 1- b Mapiando los posts
    const renderedPosts = orderedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    ))
    // 1-c mostrar en jsx
    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}
export default PostsList