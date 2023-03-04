import { useState } from "react";
import { useDispatch } from "react-redux";
// Sacamos el nanoid
import { postAdded } from "../features/postsSlice";

const AddPost = () => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);

    // De momento el formulario funciona perfecto pero podria ser mejor
    // y podria ser mejor porque de momento el componente nesesita saber los detalles del estado
    //  tiene que mandar un objecto formateado adecuadamente como vemos aqui, y estaria bueno dejar el componente 
    // mas simple y que el slice se encarge de fomatear los datos y de generar los id con el nanoid, asi que vamos a ir al slice
    // a crear lo que se llama un prepare callback
    const onSavePost = () => {
        if (title && content) {
            // Como vemos es mucho mas simple y todo lo demas se va encargar el prepare callback
            dispatch(postAdded(title, content))
            setTitle('')
            setContent('')
        }
    }

    return (
        <form>
            <input value={title} onChange={onTitleChange} placeholder='Title'/>
            <input value={content} onChange={onContentChange} placeholder='Content'/>
            <button onClick={onSavePost} type='button'>POST</button>
        </form>
    )
}
export default AddPost;
