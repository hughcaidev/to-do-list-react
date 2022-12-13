import { useRef, useState } from "react"
import reactLogo from "./assets/react.svg"
// import './App.css'

const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`
}

function App() {
    const [items, setItems] = useState([])
    const inputRef = useRef()

    function onSubmit(e) {
        e.preventDefault()

        const task = inputRef.current.value

        if (task === "") return

        const key = generateKey(task)
        const item = { key, task }

        setItems((prev) => [...prev, item])

        inputRef.current.value = ""
    }

    function removeItemFromList(item) {
        setItems(items.filter((i) => i != item))
    }

    return (
        <div className="App">
            <form onSubmit={onSubmit}>
                New Item: <input type="text" ref={inputRef}></input>
                <button type="submit">Add</button>
            </form>
            <ul>
                {items.map((item, index) => {
                    const { key, task } = item
                    return (
                        <li key={key}>
                            {task}
                            <button onClick={() => removeItemFromList(item)}>
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
