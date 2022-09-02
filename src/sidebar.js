import { nanoid } from 'nanoid'
import React, { useContext } from 'react'
import Card from './card'
import ListForm from "./listForm"
import useToggle from './customHooks/switch'
import { tasksContext } from './contexts/context'

function Sidebar() {
    const { lists } = useContext(tasksContext)
    const { on, toggle } = useToggle(false)

    const listElements = lists.map(list => {
        const classes = `card card--list ${list.id === selection.id ? 'select' : ''}`
        return (
            <li key={nanoid()} className={classes} onClick={() => {
                selectList(list.id)
            }}>
                <Card label={list.title} />
            </li >
        )
    })

    return (
        <div className='sidebar'>
            <ul className='card-container'>
                {listElements}
            </ul>
            <button onClick={toggle}>
                Add list
            </button>
            {on ? <ListForm close={toggle} /> : ''}
        </div>
    )
}
export default Sidebar