import { nanoid } from "nanoid";
import React, { useState, createContext, useEffect } from "react";
import allFilters from "../localData/filters"

const tasksContext = createContext();
function TasksProvider(props) {

    const [tasks, setTasks] = useState([])
    const [lists, setLists] = useState({ filters: [], containers: [] })
    const [loading, setLoading] = useState(false)
    const [selections, setSelections] = useState({ listID: null, taskID: null })

    function selectList(id) {
        const { listID } = selections;
        if (!listID || listID !== id) {
            setSelections({ listID: id, taskID: null })
        }
    }

    function selectTask(id) {
        const { taskID } = selections;
        if (!taskID || taskID !== id)
            setSelections(prev => ({ ...prev, taskID: id }))
    }

    function getSelectedList() {
        const combinedList = lists.filters.concat(lists.containers)
        return combinedList.find(list => list.id === selections.listID)
    }

    function addNewList(newList) {
        const prev = JSON.parse(localStorage.getItem('lists'))
        const updatedList = {
            ...prev,
            containers: [...prev.containers, { ...newList, id: nanoid() }]
        }
        localStorage.setItem('lists', JSON.stringify(updatedList))
        setLoading(true)
    }

    function fetchLists() {
        setLoading(false)
        const lists = JSON.parse(localStorage.getItem('lists'));
        console.log(lists)
        setLists(() => (
            {
                filters: lists.filters.map(list => ({
                    ...list,
                    ...allFilters.custom[list.title]
                })),
                containers: lists.containers.map(list => ({
                    ...list,
                    ...allFilters.default(list.title)
                }))
            }
        ))

    }

    function addTask(newTask) {
        const allTasks = JSON.parse(localStorage.getItem('tasks'))
        localStorage.setItem('tasks', JSON.stringify([...allTasks, { id: nanoid(), ...newTask }]))
        setLoading(true)
    }

    function fetchTasks() {
        setLoading(false)
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        setTasks(tasks)
    }

    function InitStorage() {

        if (!localStorage.length) {
            const f_keys = Object.keys(allFilters.custom);
            const _filters = f_keys.map((key => ({ id: nanoid(), title: key, sortedBy: "Date" })))
            localStorage.setItem("lists", JSON.stringify(
                {
                    filters: _filters,
                    containers: [{ id: nanoid(), title: 'default', sortedBy: "Date" }]
                }
            ))
            localStorage.setItem('tasks', JSON.stringify([]))
        }
    }
    useEffect(() => {
        InitStorage()
        setLoading(true)
    }, [])

    useEffect(() => {
        if (loading) {
            fetchLists()
            fetchTasks()
        }
    }, [loading])

    return (
        <tasksContext.Provider value={{
            tasks, lists, selections, selectList, selectTask, getSelectedList, addNewList, addTask
        }}>
            {props.children}
        </tasksContext.Provider>
    )
}


export { TasksProvider, tasksContext }