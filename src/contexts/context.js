import { allTasks, allCategories } from "../localData/fakeData"
import React, { useState, createContext, useEffect } from "react";
import { nanoid } from "nanoid";
const tasksContext = createContext();

function TasksProvider(props) {

    const [tasks, setTasks] = useState(allTasks)
    const [categories, setCategories] = useState(allCategories)
    const [displayTasks, setDisplayTasks] = useState([])

    const [selectedCategory, setSelectedCategory] = useState(null)

    function selectCategory(id) {
        setSelectedCategory(id)
    }

    function filterTasksByCategory(categoryName) {
        const filteredTasks = tasks.filter(task => task.category === categoryName)
        setDisplayTasks(filteredTasks)
    }


    function filterTasksByFunc(fn) {
        const filteredTasks = tasks.filter(fn)
        setDisplayTasks(filteredTasks)
    }

    useEffect(() => {
        const foundCategory = categories.find(category => category.id === selectedCategory)
        if (foundCategory) {
            filterTasksByCategory(foundCategory.title)
        }
    }, [selectedCategory])

    return (
        <tasksContext.Provider value={{ displayTasks, categories, selectCategory, selectedCategory, filterTasksByFunc }}>
            {props.children}
        </tasksContext.Provider>
    )
}


export { TasksProvider, tasksContext }