import React, { useReducer } from 'react'
import { useTaskList } from '../context/TaskListContext'
import { useEdittedTask } from '../context/EditTaskContext'

import '../styles.css'

function ToDoItem({ item }) {
    const { removeItemFromList, toggleTaskCompleted } = useTaskList()
    const { setEdittedTask } = useEdittedTask()

    const { key, task, dateCompleted, dueDate } = item
    const dateCompletedFormated = new Date(dateCompleted)
    const dueDateFormated = new Date(dueDate)

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
                        {dueDate && (
                            <p className="due-date">
                                Due: {dueDateFormated.toLocaleDateString('en-GB')}
                            </p>
                        )}
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

function compareByDate(a, b) {
    if (a.dueDate > b.dueDate) {
        return 1
    }

    if (a.dueDate < b.dueDate) {
        return -1
    }

    return 1
}

function TaskList() {
    const { items } = useTaskList()

    const activeTasks = items.filter((item) => !item.dateCompleted).sort(compareByDate)
    const completedTasks = items.filter((item) => item.dateCompleted).sort(compareByDate)

    function reducer(state, action) {
        const newValue = { ...state, ...action }

        return newValue
    }

    const [state, dispatch] = useReducer(reducer, { complete: true, incomplete: true })

    return (
        <div>
            <div>
                <p>Filter</p>
                <label htmlFor="complete">
                    <input
                        type="checkbox"
                        checked={state.complete}
                        onClick={() => dispatch({ complete: !state.complete })}
                        id="complete"
                    />
                    <span>Complete</span>
                </label>
                <label htmlFor="incomplete">
                    <input
                        type="checkbox"
                        checked={state.incomplete}
                        onClick={() => dispatch({ incomplete: !state.incomplete })}
                        id="incomplete"
                    />
                    <span>Incomplete</span>
                </label>
            </div>
            <ul className="list">
                {state.incomplete && activeTasks.map((task) => <ToDoItem item={task} />)}
                {state.complete && completedTasks.map((task) => <ToDoItem item={task} />)}
                {items.length === 0 && <p>Looks like there are no tasks left. Try adding one!</p>}
            </ul>
        </div>
    )
}

export default TaskList
