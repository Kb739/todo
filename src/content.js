import React, { useContext } from 'react'
import Card from './taskCard'
import TaskForm from "./forms/taskForm"
import useToggle from './customHooks/switch'
import { tasksContext } from './contexts/context'
import { layoutContext } from './contexts/layoutContext'

function Content() {
    const { tasks, selections, getSelectedList, selectTask } = useContext(tasksContext)
    const { collapseClass } = useContext(layoutContext)
    const selectedList = getSelectedList();
    const { on, toggle } = useToggle(false);

    function filterTasks() {
        return selectedList ? tasks.filter(selectedList.filterMethod) : [];
    }

    const taskElements = filterTasks().map(task => {
        const classname = `card card--task 
            ${task.id === selections.taskID ? 'select' : ''} 
            ${task.finished ? 'grey-out' : ''}`
        return (
            <li key={task.id} className={classname} onClick={() => {
                selectTask(task.id);
            }} >
                <Card task={task} />
            </li>
        )
    })

    return (
        <div className='content collapser'>
            <h1 className='content--title'>
                {selectedList && selectedList.title}
            </h1>
            <ul className='card-container scroll'>
                {taskElements}
            </ul>
            {collapseClass ?
                (selections.listID ? <div className='add-task pointer' onClick={toggle}>
                    <p style={{ fontSize: '2rem' }}>+</p> Add Task</div> : '') : ''
            }
            {on ? <TaskForm close={toggle} /> : ''}
        </div>
    )
}
export default Content