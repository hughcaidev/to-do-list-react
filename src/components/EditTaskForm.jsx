import React, { useEffect, useRef, useState } from 'react'
import { useTaskList } from '../context/TaskListContext'

function EditTaskForm({ currentEditTask, setEditTask }) {
    const { updateTaskInList } = useTaskList()
    const [errorMessage, setErrorMessage] = useState(null)

    const editItemRef = useRef()

    useEffect(() => {
        if (!currentEditTask) {
            return
        }
        const { task } = currentEditTask

        editItemRef.current.value = task
    }, [currentEditTask])

    function updateItem(e) {
        e.preventDefault()

        const updatedTask = editItemRef.current.value

        if (updatedTask === '') {
            setErrorMessage('You need to enter an task')
            return
        }

        updateTaskInList(currentEditTask, updatedTask)

        setEditTask()
    }

    return (
        <form onSubmit={updateItem}>
            <button type="button" onClick={() => setEditTask()}>
                Close
            </button>
            <p>Edit Task</p>
            <label htmlFor="edit-task">
                Task: <input type="text" ref={editItemRef} id="edit-task" />
            </label>
            {errorMessage && <p>{errorMessage}</p>}
            <button type="submit">Update</button>
        </form>
    )
}

export default EditTaskForm
