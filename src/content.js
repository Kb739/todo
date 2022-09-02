import { nanoid } from 'nanoid'
import React, { useContext } from 'react'
import Card from './card'
import TaskForm from "./taskForm"
import useToggle from './customHooks/switch'
import { tasksContext } from './contexts/context'

function Content() {
    const { tasks, lists, selectedList } = useContext(tasksContext)
    const { on, toggle } = useToggle(false);
    const _list = lists.find(list => list.id === selectedList)

    function filterTasks() {
        return tasks.filter(_list.filterMethod)
    }

    const taskElements = filterTasks().map(task => {
        const classname = `card card--task`
        return (
            <li key={nanoid()} className={classname} >
                <Card label={task.title} /></li>
        )
    })

    return (
        <div className='content'>
            <section>
                <h1>
                    category title
                </h1>
                <ul className='card-container'>
                    {taskElements}
                </ul>
            </section>
            <button onClick={toggle}>Add Task</button>
            {on ? <TaskForm close={toggle} /> : ''}
        </div>
    )
}
export default Content