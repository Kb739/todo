import { nanoid } from 'nanoid'
import React, { useContext, useEffect, useState } from 'react'
import Card from './card'
import taskFilters from "./localData/filters"
import ListForm from "./listForm"
import { tasksContext } from './contexts/context'

function Sidebar() {
    const [selectedFilter, setSelectedFilter] = useState(null)
    const { lists, selectList, filterTasksByFunc, selectedList } = useContext(tasksContext)
    const [input, setInput] = useState(false)

    const listsElements = lists.map(list => {
        const classes = `card card--list ${list.id === selectedList ? 'select' : ''}`
        return (
            <li key={nanoid()} className={classes} onClick={() => {
                setSelectedFilter(null)
                selectList(list.id)
            }}>
                <Card label={list.title} />
            </li >
        )
    })

    const filtersElements = taskFilters.map(filter => {
        const classes = `card card--list ${filter.id === selectedFilter ? 'select' : ''}`
        return (
            <li key={filter.id} className={classes} onClick={() => {
                selectList(null)
                setSelectedFilter(filter.id)
            }}>
                <Card label={filter.label} />
            </li >
        )
    })

    useEffect(() => {
        const _filter = taskFilters.find(filter => selectedFilter === filter.id)
        if (_filter)
            filterTasksByFunc(_filter.fn)
    }, [selectedFilter])

    return (
        <div className='sidebar'>
            <ul className='card-container'>
                {filtersElements}
            </ul>
            <ul className='card-container'>
                {listsElements}
            </ul>
            <button onClick={() => setInput(true)}>
                Add list
            </button>
            {input ? <ListForm submit={() => setInput(false)} /> : ''}
        </div>
    )
}
export default Sidebar