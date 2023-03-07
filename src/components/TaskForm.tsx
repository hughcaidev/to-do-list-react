import React, { useReducer, useState } from 'react'
import { useEdittedTask } from '../context/EditTaskContext'

function EditTaskForm({ title, submitButtonText, amendTask, closeForm }) {
    const { edittedTask } = useEdittedTask()
    const [errorMessage, setErrorMessage] = useState('')

    function reducer(state, action) {
        const newValue = { ...state, ...action }

        return newValue
    }

    const [state, dispatch] = useReducer(reducer, edittedTask)

    function handleError() {
        const { task } = state

        if (task === '') {
            setErrorMessage('This field is required')
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        handleError()

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
                    id="edit-task"
                    onBlur={handleError}
                />
            </label>
            {errorMessage && <p>{errorMessage}</p>}
            <label htmlFor="due-date">
                <p>Due Date</p>
                <input
                    type="date"
                    value={state.dueDate}
                    onChange={(e) => dispatch({ dueDate: e.target.valueAsDate })}
                    id="complete-date"
                    name="due-date"
                    min={todayDate}
                />
                {state.dueDate !== '' && (
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
