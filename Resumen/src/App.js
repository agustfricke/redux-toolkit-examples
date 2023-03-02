// 1- Importar el PostsList y correr servidor
import PostsList from "./features/posts/PostsList";
// 2- importamos el addpostform
import AddPostForm from "./features/posts/AddPostForm";

function App() {
  return (
    <main className="App">
      <AddPostForm />
      <PostsList />
    </main>
  );
}

export default App;
