import React, { useEffect, useRef, useState } from 'react'
import { useTaskList } from '../context/TaskListContext'

function EditTaskForm({ currentEditTask, setEditTask }) {
    const { updateTaskInList } = useTaskList()
    const [errorMessage, setErrorMessage] = useState('')

    const editItemRef = useRef(null)
    const dateCompleteRef = useRef(null)

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

        if (updatedTaskName === '') {
            setErrorMessage('You need to enter an task')
            return
        }

        const updatedTask = {
            task: editItemRef.current.value,
            completionDate: dateCompleteRef.current.value
        }

        updateTaskInList(currentEditTask, updatedTask)

        setEditTask({})
    }

    function clearDate() {
        dateCompleteRef.current.value = ''
    }

    return (
        <form onSubmit={updateItem}>
            <button type="button" onClick={() => setEditTask({})} className="close-btn">
                &times;
            </button>
            <h2>Edit Task</h2>
            <label htmlFor="edit-task">
                <p>Task (required)</p>
                <input type="text" ref={editItemRef} id="edit-task" />
            </label>
            {errorMessage && <p>{errorMessage}</p>}
            <label htmlFor="complete-date">
                <p>Due Date</p>
                <input type="date" ref={dateCompleteRef} id="complete-date" name="due-date" />
                <button type="button" onClick={clearDate} className="reset-date-btn">
                    Reset date
                </button>
            </label>

            <button type="submit">Update</button>
        </form>
    )
}

export default EditTaskForm
