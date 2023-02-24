import { React, useRef, useState } from 'react'
import TaskList from './components/ToDoList'
import { useTaskList } from './context/TaskListContext'
import AddTaskForm from './components/AddTaskForm'
// import './App.css'

// import "./styles.css"

function App() {
    const { items, updateTaskInList } = useTaskList()
    const [currentEditTask, setEditTask] = useState()

    const editItemRef = useRef()

    const activeTasks = items.filter((item) => !item.complete)
    const completedTasks = items.filter((item) => item.complete)

    // function editTask(item) {
    //     setEditTask(item);
    // }

    function updateItem(e) {
        e.preventDefault()

        const updatedTask = editItemRef.current.value

        if (updatedTask === '') return

        updateTaskInList(currentEditTask, updatedTask)

        setEditTask()
    }

    return (
        <div className="App">
            <div className="to-do-list">
                <AddTaskForm />
                <TaskList
                    tasks={activeTasks}
                    title="In Progress"
                    emptyListMessage="Looks like there are no tasks left. Try adding one!"
                />
                <TaskList
                    tasks={completedTasks}
                    title="Completed"
                    emptyListMessage="Try adding a task!"
                />
                {currentEditTask ? (
                    <form onSubmit={updateItem}>
                        Task: <input type="text" ref={editItemRef} />
                        <button type="submit">Update</button>
                    </form>
                ) : null}
            </div>
        </div>
    )
}

export default App
