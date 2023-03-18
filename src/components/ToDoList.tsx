import React from 'react'
import { useTaskList } from '../context/TaskListContext'
import ToDoItem from './ToDoItem'

function TaskList({ emptyListMessage }) {
    const { items } = useTaskList()

    const activeTasks = items.filter((item) => !item.dateCompleted)
    const completedTasks = items.filter((item) => item.dateCompleted)

    return (
        <div>
            <ul className="list">
                {activeTasks.map((task) => (
                    <ToDoItem item={task} />
                ))}
                {completedTasks.map((task) => (
                    <ToDoItem item={task} />
                ))}
                {items.length === 0 && <p>{emptyListMessage}</p>}
            </ul>
        </div>
    )
}

export default TaskList
