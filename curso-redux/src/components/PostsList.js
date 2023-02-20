import { useSelector } from 'react-redux';
import { selectAllPosts } from '../features/posts/postsSlice';
import PostUser from './PostUser';

const PostsList = () => {

    const posts = useSelector(selectAllPosts);

    return (
        <div className='flex justify-center'>
            <div>
                {posts.map(post => (
                <div key={post.id} className='bg-gray-300 m-4 p-3 rounded-lg'>
                    <p>{post.title}</p>
                    <PostUser userId={post.userId}/>
                </div>
                ))}
            </div>
        </div>
    )
}

export default PostsList;