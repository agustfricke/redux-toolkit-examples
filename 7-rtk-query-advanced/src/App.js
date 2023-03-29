import PostList from "./components/PostList";
import SoloPost from "./components/SoloPost";
import EditPost from "./components/EditPost";
import AddNewPost from "./components/AddNewPost";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SOlo user
import SoloUser from "./components/SoloUser";
import Layout from "./components/Layout";
import UsersPage from "./components/UsersPage";

function App() {
  return (
      <Router>
      <Routes>

        <Route path="/" element={<Layout/>}>

            <Route index element={<PostList/>}/> 

            <Route path="post">
                <Route index element={<AddNewPost/>}/>
                <Route path=':postId' element={<SoloPost/>}/>
                <Route path='edit/:postId' element={<EditPost/>}/>
            </Route>

            <Route path="user">
                <Route index element={<UsersPage/>}/>
                <Route path=':userId' element={<SoloUser/>}/>
            </Route>

        </Route>
      </Routes >
      </Router>
  );
}

export default App;
