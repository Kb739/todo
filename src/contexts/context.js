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
        const id = nanoid();
        const updatedList = {
            ...prev,
            containers: [...prev.containers, { ...newList, id }]
        }
        localStorage.setItem('lists', JSON.stringify(updatedList))
        selectList(id)
        setLoading(true)
    }

    function updateList(list) {
        const prev = JSON.parse(localStorage.getItem('lists'))
        const editedList = {
            ...prev,
            containers: prev.containers.map(element => list.id === element.id ? list : element)
        }
        localStorage.setItem('lists', JSON.stringify(editedList))
        setLoading(true)
    }

    function removeList(id) {
        const prev = JSON.parse(localStorage.getItem('lists'))
        const editedList = {
            ...prev,
            containers: prev.containers.filter(element => id !== element.id)
        }
        const nonChildTasks = JSON.parse(localStorage.getItem('tasks')).filter(task => task.parentList !== id);
        localStorage.setItem('tasks', JSON.stringify(nonChildTasks))
        localStorage.setItem('lists', JSON.stringify(editedList))

        if (selections.listID === id) {
            const index = lists.containers.findIndex(list => list.id === id);
            selectList(lists.containers[index - 1].id)
        }
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
                    ...allFilters.default(list.id)
                }))
            }
        ))

    }

    function addTask(newTask) {
        const allTasks = JSON.parse(localStorage.getItem('tasks'))
        localStorage.setItem('tasks', JSON.stringify([{ id: nanoid(), ...newTask }, ...allTasks]))
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
            addNewList, updateList, removeList,
            addTask, updateTask, removeTask
        }}>
            {props.children}
        </tasksContext.Provider>
    )
}


export { TasksProvider, tasksContext }