import PostsList from "./components/PostsList";
import AddPost from "./components/AddPost";

function App() {
  
  return (
    <div className="bg-gray-900 min-h-screen">
      <AddPost/>
      <PostsList/>
    </div>
  );
}

export default App;
