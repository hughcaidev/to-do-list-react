import React, { useState } from 'react'
import TaskList from './components/ToDoList'
import TaskForm from './components/TaskForm'
import { useEdittedTask } from './context/EditTaskContext'
import { TaskProp, useTaskList } from './context/TaskListContext'
// import './App.css'

// import "./styles.css"

function App() {
    const { edittedTask, setEdittedTask } = useEdittedTask()
    const { updateTaskInList, addTaskToList } = useTaskList()
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
                    <TaskForm
                        title="Add Task"
                        submitButtonText="Add"
                        amendTask={addTaskToList}
                        closeForm={() => setTaskFormVisibility(false)}
                    />
                )}
                <TaskList />
                {edittedTask.task !== '' && (
                    <TaskForm
                        title="Edit Task"
                        submitButtonText="Update"
                        amendTask={updateTaskInList}
                        closeForm={() => setEdittedTask({ task: '', dueDate: '' } as TaskProp)}
                    />
                )}
            </div>
        </div>
    )
}

export default App
