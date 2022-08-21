import React, { useContext } from 'react'
import Category from './category'

import { tasksContext } from './contexts/context'

function Sidebar() {
    const { tasks, categories } = useContext(tasksContext)
    const elements = categories.map(category => {
        return (
            <li className='category'>
                <Category label={category} />
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