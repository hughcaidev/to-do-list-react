import React, { useState, useRef } from 'react'
import { useTaskList } from '../context/TaskListContext'

const generateKey = (pre) => `${pre}_${new Date().getTime()}`

function AddTaskForm() {
    const { addTaskToList } = useTaskList()
    const [taskErrorMessage, setTaskErrorMessage] = useState('')

    const inputRef = useRef('')
    const dateCompleteRef = useRef('')

    function addTask(e) {
        e.preventDefault()

        const task = inputRef.current.value
        const completionDate = dateCompleteRef.current.value

        if (task === '') {
            setTaskErrorMessage('This field is required')
            return
        }

        const item = { key: generateKey(task), task, complete: false, completionDate }

        addTaskToList(item)

        inputRef.current.value = ''
    }

    function clearDate() {
        dateCompleteRef.current.value = ''
    }

    return (
        <form onSubmit={addTask}>
            <label htmlFor="new-task">
                New Item:
                <input type="text" ref={inputRef} id="new-task" />
            </label>
            {taskErrorMessage && <p>{taskErrorMessage}</p>}
            <label htmlFor="complete-date">
                Due date:
                <input type="date" ref={dateCompleteRef} id="complete-date" />
                <button type="button" onClick={clearDate}>
                    Reset date
                </button>
            </label>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTaskForm
