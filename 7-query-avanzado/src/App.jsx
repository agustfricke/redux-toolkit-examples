import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import PostList from './components/PostList';
import EditPost from './components/EditPost';
import SoloPost from './components/SoloPost';

function App() {

  return (
    <Router>
    <Routes>

      <Route path="/" element={<Layout/>}>

        <Route index element={<PostList/>}/> 

        <Route path="post">
            <Route path='edit/:postId' element={<EditPost/>}/>
            <Route path=':postId' element={<SoloPost/>}/>
        </Route>

      </Route>

    </Routes >
    </Router>
  )
}

export default App
