import { useSelector } from "react-redux";
import { selectBlogById, deleteBlog } from "../features/blogsSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SoloBlog = () => {

    const { blogId } = useParams();

    const blog = useSelector((state) => selectBlogById(state, Number(blogId)));

    if (!blog) {
        return (
            <p>No Blogs here!</p>
        )
    }

    return (
        <div>
            <h1 className="text-white">{blog.body}</h1>
            <p className="text-white">{blog.id}</p>
            <Link to={`/edit/${blog.id}`}>Edit Blog</Link>
        </div>
    );
};
export default SoloBlog;
