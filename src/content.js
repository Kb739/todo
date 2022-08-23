import React, { useContext } from 'react'
import Task from './task'
import { tasksContext } from './contexts/context'

function Content() {
    const { displayTasks } = useContext(tasksContext)
    const taskElements = displayTasks.map(task => {
        const classname = `task ${task.selected ? 'select' : ''}`
        return (
            <li className={classname}><Task label={task.title} /></li>
        )
    })
    return (
        <div className='content'>
            <h1>
                category title
            </h1>
            <ul className='list'>
                {taskElements}
            </ul>
        </div>
    )
}
export default Content