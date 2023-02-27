import React from 'react'
import { useTaskList } from '../context/TaskListContext'
import { useEdittedTask } from '../context/EditTaskContext'

import '../styles.css'

function ToDoItem({ item }) {
    const { removeItemFromList, toggleTaskCompleted } = useTaskList()
    const { setEdittedTask } = useEdittedTask()

    const { key, task, complete, completionDate, dateCompleted } = item
    const dateCompletedFormated = new Date(dateCompleted)

    return (
        <li key={key} className={`item ${complete && 'complete'}`}>
            <div className="item-data">
                <input
                    type="checkbox"
                    id={key}
                    checked={complete}
                    onClick={() => toggleTaskCompleted(item)}
                />
                <div className="task-details">
                    <p className="task-name">{task}</p>

                    <div className="item-content">
                        {completionDate && <p className="due-date">Due: {completionDate}</p>}
                        {dateCompleted && (
                            <p>Completed on {dateCompletedFormated.toLocaleDateString('en-GB')}</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="item--button-container">
                {!complete && (
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

export default ToDoItem
