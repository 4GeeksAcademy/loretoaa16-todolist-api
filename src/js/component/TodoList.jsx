import React, { useEffect, useState } from "react";


export const TodoList = () => {
    
    const [newTask, setNewTask] = useState ('');
    const [editTask, setEditTask] = useState ('');
    const [isDone, setIsDone] = useState (false);
    const [todos, setTodos] = useState ([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const host = 'https://playground.4geeks.com/todo';
    const user = 'loretoaa16';

    const getTodos= async () => {
        const uri = `${host}/users/${user}`;
       
        const options = {
                method: 'GET' 
            }

        const response = await fetch(uri, options)
        console.log(response)
        if (!response.ok) {
    
            console.log('Error getting todos', response.status, response.statusText)
            return 
        }

         const data = await response.json()
         console.log("Fetched taks:", data);
        setTodos(data.todos)
    }  


    useEffect(() => {
      getTodos();
      }, [])

    const handleSubmittNewTask = (event) => {
        event.preventDefault();
        postNewTask();
        setNewTask(''); 
      }

    const postNewTask = async () => {
        const dataToSend = {
            label: newTask,
            is_done: false
        }
        const uri = `${host}/todos/${user}`;
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend) 
        };
    
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.error('Error posting new task', response.status, response.statusText);
            return;
        }
    
        const data = await response.json();
        console.log("Task added:", data);
        getTodos(); 
    };

    const handleSubmittEditTask = (event) => {
        event.preventDefault(); 
        putEditTask();
    }

    const putEditTask = async () => {
        const dataToSend = {
            "label": editTask,
            "is_done": isDone
        }
        const uri = `${host}/todos/${editingTaskId}`;
        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend) 
        };
    
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.error('Error editing task', response.status, response.statusText);
            return;
        }
    
        const data = await response.json();
        console.log("Task edited:", data);
        setEditingTaskId(null);
        getTodos(); 
    };

    const handleDelete = async (id) => {
        const uri = `${host}/todos/${id}`;
        const options = {method: 'DELETE', headers: {"Content-Type": "application/json"}}
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.error('Error deleting task', response.status, response.statusText);
            return;
        }
        
        //Update the local state
        console.log("Task deleted successfully");
        getTodos();

    }


return (
    <div className="container">
        <h1 className="text-center">Todo List with React</h1>

        <ul className="list-group">
           <li>
                <form onSubmit={handleSubmittNewTask}>
                    <input type="text" className="form-control" placeholder="Add a new task" value={newTask} onChange={event => setNewTask(event.target.value)} />
                </form>
           </li>
            {todos.map((iterator) =>
                <li key={iterator.id} className="list-group-item d-flex align-items-center">
                   <i className={`fa-regular ${iterator.is_done ? "fa-square-check text-success" : "fa-square"} me-3`}></i>

                    <span className="flex-grow-1 text-start">{iterator.label}</span>
                    
                    <button type="button" className="btn btn-none" data-bs-toggle="modal" data-bs-target={`#editModal${iterator.id}`} onClick={() => {setEditTask(iterator.label); setIsDone(iterator.is_done); setEditingTaskId(iterator.id);}}>
                    <i className="fa-regular fa-pen-to-square text-warning me-2"></i>
                    </button>

                    {todos.map((iterator) => (
                         <div className="modal fade" id={`editModal${iterator.id}`} key={`modal-${iterator.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                         <div className="modal-dialog">
                             <div className="modal-content">
                             <div className="modal-header">
                                 <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                             </div>
                             <div class="modal-body">
                                 <form>
                                     <div className="mb-3">
                                         <label htmlFor="exampleInputEdit" className="form-label">Task:</label>
                                         <input type="text" className="form-control" id="exampleInputEdit" aria-describedby="taskEdit" onChange={(event) => setEditTask(event.target.value)} value = {editTask}/>
                                     </div>
                                     <div className="mb-3 form-check">
                                         <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(event) => setIsDone(event.target.checked)} checked={isDone}/>
                                         <label class="form-check-label" htmlFor="exampleCheck1">Completed</label>
                                     </div>
                                 </form>
                             </div>
                             <div class="modal-footer">
                             <button onClick={handleSubmittEditTask} type="submitt" className="btn btn-primary" data-bs-dismiss="modal">Edit</button>
                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                             </div>
                             </div>
                         </div>
                         </div>
                    ))}

                    
                    <span onClick={() => handleDelete(iterator.id)} className="btn btn-none">
                        <i className="fa fa-trash text-danger"></i>
                    </span>
                    
                </li>
            )}
            <li className="lsit-group-item list-group-item-secondary text-end pe-2">
               {todos.length > 0 ? `${todos.length} task${todos.length > 1 ? "s" : ""}` : "No tasks, add a new task"}
            </li>
        </ul>
    </div>
)
};

