import React, { useContext } from 'react'
import Card from './card'
import { tasksContext } from './contexts/context'

function Content() {
    const { displayTasks } = useContext(tasksContext)
    const taskElements = displayTasks.map(task => {
        const classname = `card card--task`
        return (
            <li key={task.id} className={classname} >
                <Card label={task.title} /></li>
        )
    })
    return (
        <div className='content'>
            <h1>
                category title
            </h1>
            <ul className='card-container'>
                {taskElements}
            </ul>
        </div>
    )
}
export default Content