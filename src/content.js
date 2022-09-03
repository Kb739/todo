import React, { useContext } from 'react'
import Card from './taskCard'
import TaskForm from "./taskForm"
import useToggle from './customHooks/switch'
import { tasksContext } from './contexts/context'

function Content() {
    const { tasks, selections, getSelectedList, selectTask } = useContext(tasksContext)
    const { on, toggle } = useToggle(false);

    function filterTasks() {
        const selectedList = getSelectedList();
        return selectedList ? tasks.filter(selectedList.filterMethod) : [];
    }

    const taskElements = filterTasks().map(task => {
        const classname = `card card--task ${task.id === selections.taskID ? 'select' : ''}`
        return (
            <li key={task.id} className={classname} onClick={() => {
                console.log('select')
                selectTask(task.id);
            }} >
                <Card task={task} />
            </li>
        )
    })

    return (
        <div className='content'>
            <section className='content--tasks'>
                <h1>
                    category title
                </h1>
                <ul className='card-container'>
                    {taskElements}
                </ul>
            </section>
            {selections.listID ? <button className='add' onClick={toggle}>Add Task</button> : ''}
            {on ? <TaskForm close={toggle} /> : ''}
        </div>
    )
}
export default Content