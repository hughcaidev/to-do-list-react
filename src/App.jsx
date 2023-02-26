import React, { useState } from 'react'
import TaskList from './components/ToDoList'
import AddTaskForm from './components/AddTaskForm'
import EditTaskForm from './components/EditTaskForm'
import { useEdittedTask } from './context/EditTaskContext'
// import './App.css'

// import "./styles.css"

function App() {
    const { edittedTask, setEdittedTask } = useEdittedTask()

    const [isTaskFormVisible, setTaskFormVisibility] = useState(false)

    return (
        <div className="App">
            <h1>To do List</h1>
            <div className="to-do-list">
                {!isTaskFormVisible ? (
                    <button onClick={() => setTaskFormVisibility(true)}>Add Task</button>
                ) : (
                    <div>
                        <button onClick={() => setTaskFormVisibility(false)}>&times;</button>
                        <AddTaskForm />
                    </div>
                )}
                <TaskList emptyListMessage="Looks like there are no tasks left. Try adding one!" />
                {edittedTask && (
                    <EditTaskForm currentEditTask={edittedTask} setEditTask={setEdittedTask} />
                )}
            </div>
        </div>
    )
}

export default App
