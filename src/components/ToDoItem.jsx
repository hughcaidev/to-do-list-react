import React from 'react'
import { useTaskList } from '../context/TaskListContext'
import { useEdittedTask } from '../context/EditTaskContext'

function ToDoItem({ item }) {
    const { removeItemFromList, toggleTaskCompleted } = useTaskList()
    const { setEdittedTask } = useEdittedTask()

    const { key, task, complete, completionDate, dateCompleted } = item
    const dateCompletedFormated = new Date(dateCompleted)

    return (
        <li key={key} className="item" style={{ listStyle: 'none', padding: '1rem' }}>
            <label htmlFor={key}>
                <input
                    type="checkbox"
                    id={key}
                    checked={complete}
                    onClick={() => toggleTaskCompleted(item)}
                />
                {task}
            </label>
            <div className="item-content">
                {completionDate && <p className="due-date">Due: {completionDate}</p>}
                {dateCompleted && (
                    <p>Completed on {dateCompletedFormated.toLocaleDateString('en-GB')}</p>
                )}
            </div>
            <div className="item--button-container">
                {!complete && (
                    <button type="button" onClick={() => setEdittedTask(item)}>
                        Edit
                    </button>
                )}
                <button type="button" onClick={() => removeItemFromList(item)}>
                    &times;
                </button>
            </div>
        </li>
    )
}

export default ToDoItem
