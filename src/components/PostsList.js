import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo"; 
import ReactionButtons from "./ReactionButtons";

const PostList = () => {

    const posts = useSelector(selectAllPosts);

    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));
    
    const renderedPost = orderedPosts.map(post => (
        <div key={post.id} className='bg-gray-300 p-2 m-2 rounded-lg'>
            <div className="text-center">
            <p className="text-xl"> {post.title} </p>
            <p> {post.content} </p>
            <PostAuthor userId={post.userId}/>
            <ReactionButtons post={post}/>
            <TimeAgo timestamp={post.date}/>
        </div>
        </div>
    ))
    return (
        <div>
            { renderedPost }
        </div>
    )
}
export default PostList;
