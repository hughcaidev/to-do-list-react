import React, { useRef } from 'react'
import { useTaskList } from '../context/TaskListContext'

const generateKey = (pre) => `${pre}_${new Date().getTime()}`

function AddTaskForm() {
    const { addTaskToList } = useTaskList()

    const inputRef = useRef('')

    function addTask(e) {
        e.preventDefault()

        const task = inputRef.current.value

        if (task === '') return

        const item = { key: generateKey(task), task, complete: false }

        addTaskToList(item)

        inputRef.current.value = ''
    }

    return (
        <form onSubmit={addTask}>
            <label htmlFor="new-task">
                New Item:
                <input type="text" ref={inputRef} id="new-task" />
            </label>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTaskForm
