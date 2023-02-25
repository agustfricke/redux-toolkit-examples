import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAllBlogs, getBlogError, getBlogsStatus, fetchBlogs} from "../features/blogsSlice";
import { Link } from "react-router-dom";

const BlogList = () => {

    const dispatch = useDispatch();

    const blogs = useSelector(selectAllBlogs);
    const blogStatus = useSelector(getBlogsStatus);
    const error = useSelector(getBlogError);

    useEffect(() => {
        if (blogStatus === 'idle'){
            dispatch(fetchBlogs())
        }
    }, [blogStatus, dispatch])

    let content;

    if (blogStatus === 'loading') {
        content = <p>Loading ...</p>
    } else if (blogStatus === 'succeeded') {
        content = blogs.map(blog => 
            <div key={blog.id} className='bg-gray-300 m-4 p-3 rounded-lg'>
               <p>{blog.body}</p>
                <Link to={`soloBlog/${blog.id}`}>SEE</Link>
                <Link to={`edit/${blog.id}`}>EDIT</Link>
            </div>)
    } else if (blogStatus === 'failed') {
        content = <p className="text-white">{error}</p>
    }

    return (
        <div className="flex justify-center">
            <div>
                { content }
            </div>
        </div>
    )






}
export default BlogList;
