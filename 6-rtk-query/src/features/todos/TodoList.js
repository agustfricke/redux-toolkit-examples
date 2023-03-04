import {
    useGetTodosQuery,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useAddTodoMutation
} from "../api/apiSlice"
import { useState } from "react"

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery()

    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ userId: 1, title: newTodo, completed: false })
        setNewTodo('')
    }

    const newItemSection =
        <form onSubmit={handleSubmit}>
            <label>Enter a new todo item</label>
            <div>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button>
                CREATE
            </button>
        </form>


    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = todos.map(todo => { 
            return (
                <article key={todo.id}>
                    <div>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                        />
                        <label>{todo.title}</label>
                    </div>
                    <button  onClick={() => deleteTodo({ id: todo.id })}>
                        DELETE
                    </button>
                </article>
            )
        })
    } else if (isError) {
        content = <p>{error}</p>
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}
export default TodoList
