import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import SoloPost from "./components/SoloBlog";
import EditPost from "./components/EditPost"; 
import UsersList from "./components/UserList";
import UserPage from "./components/UserPage";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from 'react-router-dom';


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

        <Route path="user">
          <Route index element={<UsersList/>} />
          <Route path=":userId" element={<UserPage/>} />
        </Route>

      <Route path='*' element={<Navigate to='/' replace/>}/>

      </Route>
    </Routes>
  );
}

export default App;
