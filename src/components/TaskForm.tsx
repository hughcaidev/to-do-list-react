import React, { useReducer, useState, useRef } from 'react'
import { useEdittedTask } from '../context/EditTaskContext'

function EditTaskForm({ title, submitButtonText, amendTask, closeForm }) {
    const { edittedTask } = useEdittedTask()
    const [errorMessage, setErrorMessage] = useState('')
    const taskRef = useRef(null)

    function reducer(state, action) {
        const newValue = { ...state, ...action }

        return newValue
    }

    const [state, dispatch] = useReducer(reducer, edittedTask)

    function handleFocus() {
        taskRef.current.classList.remove('error')
        setErrorMessage('')
    }

    function handleBlur() {
        const { task } = state

        if (task === '') {
            taskRef.current.classList.add('error')
            setErrorMessage('This field is required')
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        const { task } = state

        if (task === '') {
            taskRef.current.classList.add('error')
            setErrorMessage('This field is required')
            return
        }

        amendTask(state)
        closeForm()
    }

    function clearDate() {
        dispatch({ dueDate: '' })
    }

    const todayDate = new Date().toISOString().slice(0, 10)

    return (
        <form onSubmit={handleSubmit}>
            <button type="button" onClick={() => closeForm()} className="close-btn">
                &times;
            </button>
            <h2>{title}</h2>
            <label htmlFor="edit-task">
                <p>Task (required)</p>
                <input
                    type="text"
                    value={state.task}
                    onChange={(e) => dispatch({ task: e.target.value })}
                    ref={taskRef}
                    id="edit-task"
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </label>
            <label htmlFor="due-date">
                <p>Due Date</p>
                <input
                    type="date"
                    value={state.dueDate}
                    onChange={(e) => dispatch({ dueDate: e.target.value })}
                    id="complete-date"
                    name="due-date"
                    min={todayDate}
                />
                {state.dueDate && (
                    <button type="button" onClick={clearDate} className="reset-date-btn">
                        Reset date
                    </button>
                )}
            </label>

            <button type="submit">{submitButtonText}</button>
        </form>
    )
}

export default EditTaskForm
