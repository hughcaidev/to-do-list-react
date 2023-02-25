import React from 'react'
import { useTaskList } from '../context/TaskListContext'
import { useEdittedTask } from '../context/EditTaskContext'

function ToDoItem({ item }) {
    const { removeItemFromList, toggleTaskCompleted } = useTaskList()
    const { setEdittedTask } = useEdittedTask()

    const { key, task, complete, completionDate } = item

    return (
        <li key={key} className="item">
            <div className="item-content">
                <p>{task}</p>
                {/* {complete && <p className="due-date">Due: 12/10/22</p>} */}
                {completionDate && <p className="due-date">Due: {completionDate}</p>}
            </div>
            <div className="item--button-container">
                {!complete && (
                    <button type="button" onClick={() => setEdittedTask(item)}>
                        Edit
                    </button>
                )}
                {!complete ? (
                    <button type="button" onClick={() => toggleTaskCompleted(item)}>
                        Complete
                    </button>
                ) : (
                    <button type="button" onClick={() => toggleTaskCompleted(item)}>
                        In Progress
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
