import BlogList from "./components/BlogList";
import AddBlog from "./components/AddBlog";

function App() {
  
  return (
    <div className="bg-gray-900 min-h-screen">
      <AddBlog/>
      <BlogList/>
    </div>
  );
}

export default App;
