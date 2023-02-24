import React, { useState, useContext } from 'react'

const initialToDoList = [
    { task: 'Task 1', key: 1, complete: false },
    { task: 'Task 2', key: 2, complete: true },
    { task: 'Task 3', key: 3, complete: false }
]

const TaskListContext = React.createContext({})

export function useTaskList() {
    return useContext(TaskListContext)
}

export function TaskListProvider({ children }) {
    const [items, setItems] = useState(initialToDoList)

    function addTaskToList(task) {
        setItems((prev) => [...prev, task])
    }

    function removeItemFromList(item) {
        setItems((prev) => prev.filter((i) => i !== item))
    }

    function updateTaskInList(currentTask, updatedTask) {
        const updateList = items.map((item) => {
            if (item === currentTask) {
                return { ...item, task: updatedTask }
            }

            return item
        })

        setItems(updateList)
    }

    function toggleTaskCompleted(item) {
        const newList = items.map((i) => {
            if (i === item) {
                const updateItem = { ...i, complete: !item.complete }
                return updateItem
            }
            return i
        })

        setItems(newList)
    }

    const foo = {
        items,
        setItems,
        addTaskToList,
        removeItemFromList,
        updateTaskInList,
        toggleTaskCompleted
    }

    return <TaskListContext.Provider value={foo}>{children}</TaskListContext.Provider>
}