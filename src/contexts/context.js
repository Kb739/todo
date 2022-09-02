import React, { useState, createContext, useEffect } from "react";
import allFilters from "../localData/filters"

const tasksContext = createContext();
function TasksProvider(props) {

    const [tasks, setTasks] = useState([])
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedList, setSelectedList] = useState(null)

    function selectList(id) {
        setSelectedList(id)
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
            setLists(() => (
                {
                    filters: lists.filters.map(list => ({
                        ...list,
                        ...allFilters[list.title]
                    })),
                    containers: lists.containers.map(list => ({
                        ...list,
                        ...allFilters.default(list.title)
                    }))
                }
            ))

        } catch (err) {
            console.log(`request unsuccessful : ${err}`)
        }
    }

    useEffect(() => {
        if (loading) {
            fetchLists()
        }
    }, [loading])

    return (
        <tasksContext.Provider value={{
            lists, selectedList, selectList, addNewList
        }}>
            {props.children}
        </tasksContext.Provider>
    )
}


export { TasksProvider, tasksContext }