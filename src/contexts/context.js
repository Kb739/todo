import allData from "../localData/fakeData"
import React, { useState, createContext } from "react";
const tasksContext = createContext();

function TasksProvider(props) {

    const [tasks, setTasks] = useState(allData)
    const [categories, setCategories] = useState(() => {
        const arr = [...new Set(tasks.map(task => task.category))]
        return arr;
    })

    return (
        <tasksContext.Provider value={{ tasks, categories }}>
            {props.children}
        </tasksContext.Provider>
    )
}

export { TasksProvider, tasksContext }