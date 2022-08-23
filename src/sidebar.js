import React, { useContext } from 'react'
import Category from './category'

import { tasksContext } from './contexts/context'

function Sidebar() {
    const { displayTasks, categories } = useContext(tasksContext)
    const elements = categories.map(category => {
        const classes = `category ${category.selected ? 'select' : ''}`
        return (
            <li className={classes}>
                <Category label={category.title} />
            </li >
        )
    })

    return (
        <div className='sidebar'>
            <ul className='list'>
                {elements}
            </ul>
        </div>
    )
}
export default Sidebar