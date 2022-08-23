import { nanoid } from 'nanoid'
import React, { useContext, useEffect, useState } from 'react'
import Category from './category'
import taskFilters from "./localData/filters"

import { tasksContext } from './contexts/context'

function Sidebar() {
    const [selectedFilter, setSelectedFilter] = useState(null)
    const { categories, selectCategory, filterTasksByFunc, selectedCategory } = useContext(tasksContext)


    const categoriesElements = categories.map(category => {
        const classes = `category ${category.id === selectedCategory ? 'select' : ''}`
        return (
            <li key={nanoid()} className={classes} onClick={() => {
                setSelectedFilter(null)
                selectCategory(category.id)
            }}>
                <Category label={category.title} />
            </li >
        )
    })

    const filtersElements = taskFilters.map(filter => {
        const classes = `category ${filter.id === selectedFilter ? 'select' : ''}`
        return (
            <li key={filter.id} className={classes} onClick={() => {
                selectCategory(null)
                setSelectedFilter(filter.id)
            }}>
                <Category label={filter.label} />
            </li >
        )
    })

    useEffect(() => {
        const foundFilter = taskFilters.find(filter => selectedFilter === filter.id)
        if (foundFilter)
            filterTasksByFunc(foundFilter.fn)
    }, [selectedFilter])

    return (
        <div className='sidebar'>
            <ul className='list'>
                {filtersElements}
            </ul>
            <ul className='list'>
                {categoriesElements}
            </ul>
        </div>
    )
}
export default Sidebar