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

    function getSelectedTask() {
        return tasks.find(task => task.id === selections.taskID)
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

    function updateTask(editedTask) {
        const allTasks = JSON.parse(localStorage.getItem('tasks'))
        const updatedTasks = allTasks.map(task => task.id === editedTask.id ? editedTask : task)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
        setLoading(true)
    }

    function removeTask(id) {
        const allTasks = JSON.parse(localStorage.getItem('tasks'))
        const remainTasks = allTasks.filter(task => task.id !== id)
        localStorage.setItem('tasks', JSON.stringify(remainTasks))
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
            const _filters = f_keys.map((key => ({ id: nanoid(), title: key, sortedBy: "Date", editable: false })))
            localStorage.setItem("lists", JSON.stringify(
                {
                    filters: _filters,
                    containers: [{ id: nanoid(), title: 'default', sortedBy: "Date", editable: false }]
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
            tasks, lists,
            selections, selectList, selectTask,
            getSelectedList, getSelectedTask,
            addNewList,
            addTask, updateTask, removeTask
        }}>
            {props.children}
        </tasksContext.Provider>
    )
}


export { TasksProvider, tasksContext }