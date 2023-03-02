// Okey ahora creemos el postExerpt para tener los componentes un poco mas ordenados

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo"; 
import ReactionButtons from "./ReactionButtons";

const PostsExcerpt = ({ post }) => {

    return (
        <div key={post.id} className='bg-gray-300 p-2 m-2 rounded-lg'>
        <div className="text-center">
        <p className="text-xl"> {post.title} </p>
        <p> {post.body} </p>
        <PostAuthor userId={post.userId}/>
        <ReactionButtons post={post}/>
        <TimeAgo timestamp={post.date}/>
        </div>
        </div>
    )
}
export default PostsExcerpt;
