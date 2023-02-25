import React, { useContext, useState } from 'react'

const EdittedTask = React.createContext({})

export function EdittedTaskProvider({ children }) {
    const [edittedTask, setEdittedTask] = useState('')

    const foo = { edittedTask, setEdittedTask }

    return <EdittedTask.Provider value={foo}>{children}</EdittedTask.Provider>
}

export function useEdittedTask() {
    return useContext(EdittedTask)
}
