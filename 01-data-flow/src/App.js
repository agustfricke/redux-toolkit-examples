import PostList from "./components/PostsList";
import AddPost from "./components/AddPost";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
        <div className="flex justify-center">
            <div>
                <AddPost/>
                <PostList/>
            </div>
        </div>
    </div>
  );
}

export default App;
