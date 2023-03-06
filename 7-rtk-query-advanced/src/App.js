import PostList from "./components/PostList";
import SoloPost from "./components/SoloPost";
import EditPost from "./components/EditPost";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Router>
      <Routes>
        <Route index element={<PostList/>}/> 
        <Route path='post/:postId' element={<SoloPost/>}/>
        <Route path='edit/:postId' element={<EditPost/>}/>
      </Routes >
      </Router>
  );
}

export default App;
