import { useEffect, useRef, useState } from "react"
import reactLogo from "./assets/react.svg"
// import './App.css'

const initialToDoList = [
    { task: "Task 1", key: 1, complete: false },
    { task: "Task 2", key: 2, complete: true },
    { task: "Task 3", key: 3, complete: false },
]

const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`
}

function App() {
    const [items, setItems] = useState(initialToDoList)
    const [currentEditTask, setEditTask] = useState()
    const inputRef = useRef()
    const editItemRef = useRef()

    const activeTasks = items.filter((item) => !item.complete)
    const completedTasks = items.filter((item) => item.complete)

    function addTask(e) {
        e.preventDefault()

        const task = inputRef.current.value

        if (task === "") return

        const item = { key: generateKey(task), task, complete: false }

        setItems((prev) => [...prev, item])

        inputRef.current.value = ""
    }

    function removeItemFromList(item) {
        setItems(items.filter((i) => i != item))
    }

    function toggleTaskCompleted(item) {
        const newList = items.map((i) => {
            if (i == item) {
                return { ...i, complete: !i.complete }
            }
            return i
        })

        setItems(newList)
    }

    function editTask(item) {
        setEditTask(item)
    }

    function updateItem(e) {
        e.preventDefault()

        const updatedTask = editItemRef.current.value

        if (updatedTask == "") return

        const updateList = items.map((item) => {
            if (item === currentEditTask) {
                return { ...item, task: updatedTask }
            }

            return item
        })

        setItems(updateList)
        setEditTask()
    }

    return (
        <div className="App">
            <form onSubmit={addTask}>
                New Item: <input type="text" ref={inputRef}></input>
                <button type="submit">Add</button>
            </form>
            <h2>In Progress</h2>
            <ul>
                {activeTasks.map((item, index) => {
                    const { key, task, complete } = item
                    return (
                        <li key={key}>
                            {task}
                            <button onClick={() => editTask(item)}>Edit</button>
                            <button onClick={() => toggleTaskCompleted(item)}>
                                Complete
                            </button>
                            <button onClick={() => removeItemFromList(item)}>
                                &times;
                            </button>
                        </li>
                    )
                })}
            </ul>
            <h2>Completed</h2>
            <ul>
                {completedTasks.map((item, index) => {
                    const { key, task, complete } = item
                    return (
                        <li key={key}>
                            {task}
                            <button onClick={() => toggleTaskCompleted(item)}>
                                In Progress
                            </button>
                            <button onClick={() => removeItemFromList(item)}>
                                &times;
                            </button>
                        </li>
                    )
                })}
            </ul>
            {currentEditTask ? (
                <form onSubmit={updateItem}>
                    Task: <input type="text" ref={editItemRef}></input>
                    <button type="submit">Update</button>
                </form>
            ) : (
                <></>
            )}
        </div>
    )
}

export default App
