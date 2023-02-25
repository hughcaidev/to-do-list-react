import React from 'react'
import TaskList from './components/ToDoList'
import { useTaskList } from './context/TaskListContext'
import AddTaskForm from './components/AddTaskForm'
import EditTaskForm from './components/EditTaskForm'
import { useEdittedTask } from './context/EditTaskContext'
// import './App.css'

// import "./styles.css"

function App() {
    const { items } = useTaskList()
    const { edittedTask, setEdittedTask } = useEdittedTask()

    const activeTasks = items.filter((item) => !item.complete)
    const completedTasks = items.filter((item) => item.complete)

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
                {edittedTask && (
                    <EditTaskForm currentEditTask={edittedTask} setEditTask={setEdittedTask} />
                )}
            </div>
        </div>
    )
}

export default App
