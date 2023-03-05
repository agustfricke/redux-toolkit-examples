import { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from "../api/apiSlice";
import { useState } from "react";

const Tasks = () => {

    const [ newTask, setNewTask] = useState('');

    const { data:tasks, isLoading,isSuccess, isError, error} = useGetTasksQuery();

    const [createTask] = useCreateTaskMutation();

    const [updateTask] = useUpdateTaskMutation();

    const [deleteTask] = useDeleteTaskMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        createTask({ name: newTask, completed: false })
        setNewTask('')
    }

    const newTaskSection = 
        <form onSubmit={handleSubmit}>
            <input type='text' value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder='Type here!'/>
            <button>Create Task</button>
        </form>

    let content;

    if (isLoading) {
        content = <p>Loading ... </p>
    } else if (isSuccess) { 
        content = tasks.map(task => {
            return (
                <div key={task.id}>
                    <input type='checkbox' checked={task.completed} onChange={() => updateTask({ ...task, completed: !task.completed })}/>
                   <label>{task.name}</label> 
                    <button onClick={() => deleteTask(task.id)}> Delete </button>
                </div>
            )
        })
    } else if (isError) {
        content = <p> Error : {error} </p>
    }

    return (
        <>
            { newTaskSection }
            { content }
        </>
    )


}
export default Tasks;
