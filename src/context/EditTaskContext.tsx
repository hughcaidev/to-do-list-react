import React, { useContext, useState } from 'react'
import { TaskProp } from './TaskListContext'

interface EdittedTaskProps {
    edittedTask: TaskProp
    setEdittedTask: (task: TaskProp) => void
}

const EdittedTask = React.createContext({} as EdittedTaskProps)

export function EdittedTaskProvider({ children }) {
    const [edittedTask, setEdittedTask] = useState({} as TaskProp)

    const foo = { edittedTask, setEdittedTask }

    return <EdittedTask.Provider value={foo}>{children}</EdittedTask.Provider>
}

export function useEdittedTask() {
    return useContext(EdittedTask)
}
