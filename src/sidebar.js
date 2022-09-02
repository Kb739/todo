import React, { useContext } from 'react'
import Card from './card'
import ListForm from "./listForm"
import useToggle from './customHooks/switch'
import { tasksContext } from './contexts/context'

function Sidebar() {
    const { lists, selections, selectList } = useContext(tasksContext)
    const { on, toggle } = useToggle(false)

    const combinedList = Object.keys(lists).reduce((_list, key) => {
        return _list.concat(lists[key])
    }, [])

    const listElements = combinedList.map(list => {

        const classes = `card card--list ${list.id === selections.listID ? 'select' : ''}`
        return (
            <li key={list.id} className={classes} onClick={() => {
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