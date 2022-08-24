import { allTasks, allLists } from "../localData/fakeData"
import React, { useState, createContext, useEffect } from "react";
import { nanoid } from "nanoid";
const tasksContext = createContext();

function TasksProvider(props) {

    const [tasks, setTasks] = useState(allTasks)
    const [lists, setLists] = useState(allLists)
    const [displayTasks, setDisplayTasks] = useState([])

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

    function addNewList(obj) {
        //api call to create tasks
        //then(fetch data).then(setSelectedList(data[0].id),setTasks(data))
    }

    useEffect(() => {
        const _list = lists.find(list => list.id === selectedList)
        if (_list) {
            filterTasksByList(_list.title)
        }
    }, [selectedList])

    return (
        <tasksContext.Provider value={{ displayTasks, lists, selectList, selectedList, filterTasksByFunc }}>
            {props.children}
        </tasksContext.Provider>
    )
}


export { TasksProvider, tasksContext }