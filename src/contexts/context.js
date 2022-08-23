import { allTasks, allCategories } from "../localData/fakeData"
import React, { useState, createContext } from "react";
const tasksContext = createContext();

function TasksProvider(props) {

    const [tasks, setTasks] = useState(allTasks)
    const [categories, setCategories] = useState(allCategories)
    const [displayTasks, setDisplayTasks] = useState(() => {
        const selectedCategory = categories.find(category => category.selected)
        if (selectedCategory)
            return tasks.filter(task => task.category === selectedCategory.title)
        else
            return [];
    })

    return (
        <tasksContext.Provider value={{ displayTasks, categories }}>
            {props.children}
        </tasksContext.Provider>
    )
}

export { TasksProvider, tasksContext }