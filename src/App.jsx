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
    const inputRef = useRef()

    function onSubmit(e) {
        e.preventDefault()

        const task = inputRef.current.value

        if (task === "") return

        const key = generateKey(task)
        const item = { key, task, complete: false }

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

    return (
        <div className="App">
            <form onSubmit={onSubmit}>
                New Item: <input type="text" ref={inputRef}></input>
                <button type="submit">Add</button>
            </form>
            <h2>In Progress</h2>
            <ul>
                {items
                    .filter((item) => !item.complete)
                    .map((item, index) => {
                        const { key, task, complete } = item
                        return (
                            <li key={key}>
                                {task}
                                <button
                                    onClick={() => toggleTaskCompleted(item)}
                                >
                                    Complete
                                </button>
                                <button
                                    onClick={() => removeItemFromList(item)}
                                >
                                    &times;
                                </button>
                            </li>
                        )
                    })}
            </ul>
            <h2>Completed</h2>
            <ul>
                {items
                    .filter((item) => item.complete)
                    .map((item, index) => {
                        const { key, task, complete } = item
                        return (
                            <li key={key}>
                                {task}
                                <button
                                    onClick={() => toggleTaskCompleted(item)}
                                >
                                    In Progress
                                </button>
                                <button
                                    onClick={() => removeItemFromList(item)}
                                >
                                    &times;
                                </button>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}

export default App
