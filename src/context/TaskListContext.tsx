import React, { useState, useContext, ReactElement } from 'react'

const initialToDoList = [
    { task: 'Task 1', key: 1, complete: false },
    // { task: 'Task 2', key: 2, complete: true, dateCompleted: Date('1677415007518') },
    { task: 'Task 2', key: 2, complete: true, dateCompleted: 1677415007518 },
    { task: 'Task 3', key: 3, complete: false, dueDate: '2023-02-26' }
]

export interface TaskProp {
    task: string
    key: string | number
    // complete: boolean
    dateCompleted?: typeof Date | string | number | null
    dueDate?: string
}

interface TaskListProp {
    items: TaskProp[]
    addTaskToList: (task: Partial<TaskProp>) => void
    removeItemFromList: (task: TaskProp) => void
    updateTaskInList: (updatedTask: Partial<TaskProp>) => void
    toggleTaskCompleted: (task: TaskProp) => void
}

const TaskListContext = React.createContext({} as TaskListProp)

export function TaskListProvider({ children }): ReactElement {
    const [items, setItems] = useState<TaskProp[] | undefined>(initialToDoList)

    function addTaskToList(task) {
        setItems((prev) => [...prev, task])
    }

    function removeItemFromList(item) {
        setItems((prev) => prev.filter((i) => i !== item))
    }

    function updateTaskInList(updatedTask) {
        const updateList = items.map((item) => {
            if (item.key === updatedTask.key) {
                return { ...item, ...updatedTask }
            }

            return item
        })

        setItems(updateList)
    }

    function toggleTaskCompleted(item) {
        const newList = items.map((i) => {
            if (i === item) {
                // const dateCompleted = !item.complete ? Date.now() : null
                const dateCompleted = !item.dateCompleted ? Date.now().valueOf() : null

                // const updateItem = { ...i, complete: !item.complete, dateCompleted }
                const updateItem = { ...i, dateCompleted }

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

export function useTaskList() {
    return useContext(TaskListContext)
}
