import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import SoloPost from "./components/SoloBlog";
import EditPost from "./components/EditPost"; 
// IMportamos el Layout
import Layout from "./components/Layout";
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<PostList/>} />

        <Route path="post">
          <Route index element={<AddPost/>} />
          <Route path=":postId" element={<SoloPost/>} />
          <Route path="edit/:postId" element={<EditPost/>} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
