import React, { useEffect, useRef, useState } from 'react'
import { useTaskList } from '../context/TaskListContext'

function EditTaskForm({ currentEditTask, setEditTask }) {
    const { updateTaskInList } = useTaskList()
    const [errorMessage, setErrorMessage] = useState(null)

    const editItemRef = useRef()
    const dateCompleteRef = useRef()

    useEffect(() => {
        if (!currentEditTask) {
            return
        }
        const { task, completionDate } = currentEditTask

        editItemRef.current.value = task
        dateCompleteRef.current.value = completionDate
    }, [currentEditTask])

    function updateItem(e) {
        e.preventDefault()

        const updatedTaskName = editItemRef.current.value
        const updateCompletionDate = dateCompleteRef.current.value

        const updatedTask = {
            task: updatedTaskName,
            completionDate: updateCompletionDate
        }

        if (updatedTaskName === '') {
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
            <label htmlFor="complete-date">
                Due date:
                <input
                    type="date"
                    ref={dateCompleteRef}
                    id="complete-date"
                    pattern="\d{2}-\d{2}-\d{4}"
                />
            </label>
            <button type="submit">Update</button>
        </form>
    )
}

export default EditTaskForm
