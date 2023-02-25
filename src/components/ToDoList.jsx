import React from 'react'
import ToDoItem from './ToDoItem'

function TaskList({ tasks, title, emptyListMessage }) {
    return (
        <div>
            <h2>{title}</h2>
            <ul className="list">
                {tasks.length > 0 ? (
                    tasks.map((item) => <ToDoItem item={item} />)
                ) : (
                    <p>{emptyListMessage}</p>
                )}
            </ul>
        </div>
    )
}

export default TaskList
