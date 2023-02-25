import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TaskListProvider } from './context/TaskListContext'
import { EdittedTaskProvider } from './context/EditTaskContext'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <TaskListProvider>
            <EdittedTaskProvider>
                <App />
            </EdittedTaskProvider>
        </TaskListProvider>
    </React.StrictMode>
)
