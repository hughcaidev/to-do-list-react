import React from 'react'
import { useTaskList } from '../context/TaskListContext'
import { useEdittedTask } from '../context/EditTaskContext'

function ToDoItem({ item }) {
    const { removeItemFromList, toggleTaskCompleted } = useTaskList()
    const { setEdittedTask } = useEdittedTask()

    const { key, task, dateCompleted, dueDate } = item
    const dateCompletedFormated = new Date(dateCompleted)

    return (
        <li key={key} className={`item ${dateCompleted && 'complete'}`}>
            <div className="item-data">
                <input
                    type="checkbox"
                    id={key}
                    checked={dateCompleted}
                    onClick={() => toggleTaskCompleted(item)}
                />
                <div className="task-details">
                    <p className="task-name">{task}</p>

                    <div className="item-content">
                        {dueDate && <p className="due-date">Due: {dueDate}</p>}
                        {dateCompleted && (
                            <p>Completed on {dateCompletedFormated.toLocaleDateString('en-GB')}</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="item--button-container">
                {!dateCompleted && (
                    <button type="button" onClick={() => setEdittedTask(item)}>
                        {/* Edit */}
                        &#9998;
                    </button>
                )}
                <button type="button" onClick={() => removeItemFromList(item)}>
                    &times;
                </button>
            </div>
        </li>
    )
}

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
