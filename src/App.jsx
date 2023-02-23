import { React, useRef, useState } from 'react';
// import './App.css'

// import "./styles.css"

const initialToDoList = [
    { task: 'Task 1', key: 1, complete: false },
    { task: 'Task 2', key: 2, complete: true },
    { task: 'Task 3', key: 3, complete: false }
];

const generateKey = (pre) => `${pre}_${new Date().getTime()}`;

function App() {
    const [items, setItems] = useState(initialToDoList);
    const [currentEditTask, setEditTask] = useState();
    const inputRef = useRef();
    const editItemRef = useRef();

    const activeTasks = items.filter((item) => !item.complete);
    const completedTasks = items.filter((item) => item.complete);

    function addTask(e) {
        e.preventDefault();

        const task = inputRef.current.value;

        if (task === '') return;

        const item = { key: generateKey(task), task, complete: false };

        setItems((prev) => [...prev, item]);

        inputRef.current.value = '';
    }

    function removeItemFromList(item) {
        setItems(items.filter((i) => i !== item));
    }

    function toggleTaskCompleted(item) {
        const newList = items.map((i) => {
            if (i === item) {
                return { ...i, complete: !i.complete };
            }
            return i;
        });

        setItems(newList);
    }

    function editTask(item) {
        setEditTask(item);
    }

    function updateItem(e) {
        e.preventDefault();

        const updatedTask = editItemRef.current.value;

        if (updatedTask === '') return;

        const updateList = items.map((item) => {
            if (item === currentEditTask) {
                return { ...item, task: updatedTask };
            }

            return item;
        });

        setItems(updateList);
        setEditTask();
    }

    return (
        <div className="App">
            <div className="to-do-list">
                <form onSubmit={addTask}>
                    <label htmlFor="new-task">
                        New Item:
                        <input type="text" ref={inputRef} id="new-task" />
                    </label>
                    <button type="submit">Add</button>
                </form>
                <h2>In Progress</h2>
                <ul className="list">
                    {activeTasks.length > 0 ? (
                        activeTasks.map((item) => {
                            const { key, task } = item;
                            return (
                                <li key={key} className="item">
                                    <p>{task}</p>

                                    <div className="item--button-container">
                                        <button type="button" onClick={() => editTask(item)}>
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => toggleTaskCompleted(item)}
                                        >
                                            Complete
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeItemFromList(item)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <p>Looks like there are no tasks left. Try adding one!</p>
                    )}
                </ul>
                <h2>Completed</h2>
                <ul className="list">
                    {completedTasks.length > 0 ? (
                        completedTasks.map((item) => {
                            const { key, task } = item;
                            return (
                                <li key={key} className="item completed">
                                    <div className="item-content">
                                        <p>{task}</p>
                                        <p className="due-date">Due: 12/10/22</p>
                                    </div>
                                    <div className="item--button-container">
                                        <button
                                            type="button"
                                            onClick={() => toggleTaskCompleted(item)}
                                        >
                                            In Progress
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeItemFromList(item)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <p>Try adding a task!</p>
                    )}
                </ul>
                {currentEditTask ? (
                    <form onSubmit={updateItem}>
                        Task: <input type="text" ref={editItemRef} />
                        <button type="submit">Update</button>
                    </form>
                ) : null}
            </div>
        </div>
    );
}

export default App;
