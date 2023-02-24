import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TaskListProvider } from './context/TaskListContext'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <TaskListProvider>
            <App />
        </TaskListProvider>
    </React.StrictMode>
)
