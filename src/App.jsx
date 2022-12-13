import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'

function App() {
  const [items, setItems] = useState([])
  const inputRef = useRef()

  function onSubmit(e){
    e.preventDefault()

    const item = inputRef.current.value

    if (item === "") return
    setItems(prev => [...prev, item])

    inputRef.current.value = ""
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        New Item: <input type="text" ref={inputRef}></input>
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map(item => {
          return <li>{item}</li>
        })}
      </ul>
    </div>
  )
}

export default App
