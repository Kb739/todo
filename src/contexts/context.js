import React, { useState, createContext, useEffect } from "react";
import { nanoid } from "nanoid";
const tasksContext = createContext();

function TasksProvider(props) {

    const [tasks, setTasks] = useState([])
    const [lists, setLists] = useState([])
    const [displayTasks, setDisplayTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedList, setSelectedList] = useState(null)

    function selectList(id) {
        setSelectedList(id)
    }

    function filterTasksByList(listName) {
        const filteredTasks = tasks.filter(task => task.category === listName)
        setDisplayTasks(filteredTasks)
    }


    function filterTasksByFunc(fn) {
        const filteredTasks = tasks.filter(fn)
        setDisplayTasks(filteredTasks)
    }

    async function addNewList(newList) {
        const requestOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newList)
        }
        console.log(requestOptions.body)
        try {
            const response = await fetch('http://localhost:5000/lists', requestOptions)
            const newList = await response.json()
            selectList(newList.id)
            setLoading(true)
        } catch (err) {
            console.log(`request unsuccessful : ${err}`)
        }
    }

    async function fetchLists() {
        setLoading(false)
        try {
            const response = await fetch('http://localhost:5000/lists')
            const lists = await response.json()
            setLists(lists)
        } catch (err) {
            console.log(`request unsuccessful : ${err}`)
        }
    }

    useEffect(() => {
        if (loading) {
            fetchLists()
        }
    }, [loading])

    useEffect(() => {
        const _list = lists.find(list => list.id === selectedList)
        if (_list) {
            filterTasksByList(_list.title)
        }
    }, [selectedList])

    return (
        <tasksContext.Provider value={{ displayTasks, lists, selectList, selectedList, filterTasksByFunc, addNewList }}>
            {props.children}
        </tasksContext.Provider>
    )
}


export { TasksProvider, tasksContext }