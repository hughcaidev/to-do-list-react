import React, { useState, useRef } from 'react'
import { useTaskList } from '../context/TaskListContext'

const generateKey = (pre) => `${pre}_${new Date().getTime()}`

function AddTaskForm({ showForm }) {
    const { addTaskToList } = useTaskList()
    const [taskErrorMessage, setTaskErrorMessage] = useState('')

    const inputRef = useRef(null)
    const dateCompleteRef = useRef(null)

    function handleFocus() {
        inputRef.current.classList.remove('error')
        setTaskErrorMessage('')
    }

    function handleBlur() {
        if (inputRef.current.value === '') {
            inputRef.current.classList.add('error')
            setTaskErrorMessage('This field is required')
        }
    }

    function addTask(e) {
        e.preventDefault()

        const task = inputRef.current.value
        const dueDate = dateCompleteRef.current.value

        if (task === '') {
            setTaskErrorMessage('This field is required')
            inputRef.current.classList.add('error')
            return
        }

        const item = { key: generateKey(task), task, dueDate }

        addTaskToList(item)
        showForm(false)
    }

    function clearDate() {
        dateCompleteRef.current.value = ''
    }

    return (
        <form onSubmit={addTask} id="add-task-form">
            <button type="button" onClick={() => showForm(false)} className="close-btn">
                &times;
            </button>
            <h2>Add Task</h2>
            <label htmlFor="new-task">
                <p>New Item:</p>
                <input
                    type="text"
                    ref={inputRef}
                    id="new-task"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {taskErrorMessage && <p className="error-message">{taskErrorMessage}</p>}
            </label>
            <label htmlFor="complete-date">
                <p>Due date:</p>
                <input type="date" ref={dateCompleteRef} id="complete-date" name="complete-date" />
                <button type="button" onClick={clearDate} className="reset-date-btn">
                    Reset date
                </button>
            </label>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTaskForm
