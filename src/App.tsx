import React, { useState } from 'react'
import TaskList from './components/ToDoList'
import AddTaskForm from './components/AddTaskForm'
import EditTaskForm from './components/EditTaskForm'
import { useEdittedTask } from './context/EditTaskContext'
// import './App.css'

// import "./styles.css"

function App() {
    const { edittedTask } = useEdittedTask()

    const [isTaskFormVisible, setTaskFormVisibility] = useState(false)

    return (
        <div className="App">
            <h1>To Do List</h1>
            <div className="to-do-list">
                {!isTaskFormVisible ? (
                    <button
                        type="button"
                        onClick={() => setTaskFormVisibility(true)}
                        id="add-task-btn"
                    >
                        + Add Task
                    </button>
                ) : (
                    <AddTaskForm showForm={setTaskFormVisibility} />
                )}
                <TaskList emptyListMessage="Looks like there are no tasks left. Try adding one!" />
                {Object.keys(edittedTask).length !== 0 && <EditTaskForm />}
            </div>
        </div>
    )
}

export default App
