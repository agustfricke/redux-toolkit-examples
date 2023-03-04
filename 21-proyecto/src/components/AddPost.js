// importamos useState para manejar el estado local para el formulario
import { useState } from "react";
// Importamos useDispatch para depachar el action
import { useDispatch } from "react-redux";
// Importamos nanoid para genrar ids unicos
import { nanoid } from "@reduxjs/toolkit";
// Importamos el action
import { postAdded } from "../features/postsSlice";

const AddPost = () => {

    // creamos la constante disptch para usear el useDispatcc
    const dispatch = useDispatch();

    // Estado temporal
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    // Fin estado temporal para el formulario

    const onSavePost = () => {
        // Check si esta el titluo y content antes de despachar el action
        if (title && content) {
            // Despachamos el action con el id titulo y content
            dispatch(postAdded({ id: nanoid, title, content }))
            // Volvemos los inputs a su estado incial
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
