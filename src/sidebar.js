import React, { useContext } from 'react'
import Card from './card'
import ListForm from "./listForm"
import useToggle from './customHooks/switch'
import { tasksContext } from './contexts/context'
import { layoutContext } from "./contexts/layoutContext";

function Sidebar() {
    const { lists, selections, selectList } = useContext(tasksContext)
    const { collapseClass } = useContext(layoutContext)
    const { on, toggle } = useToggle(false)

    const combinedList = Object.keys(lists).reduce((_list, key) => {
        return _list.concat(lists[key])
    }, [])

    let topSection = [], bottomSection = [];
    combinedList.forEach(list => {
        const classes = `card card--list collapser ${list.id === selections.listID ? 'select' : ''}`
        const element =
            <li key={list.id} className={classes} onClick={() => {
                selectList(list.id)
            }}>
                <Card label={list.title} />
            </li >
        if (list.editable)
            bottomSection.push(element)
        else
            topSection.push(element)
    })

    return (
        <div className={`sidebar ${collapseClass}`}>
            <ul className='card-container'>
                {topSection}
            </ul>
            <ul className='card-container scroll'>
                {bottomSection}
            </ul>
            <div className='card card--list' onClick={toggle}>
                <p style={{ fontSize: '3rem' }}>+</p> Add list
            </div>
            {on ? <ListForm close={toggle} /> : ''}
        </div>
    )
}
export default Sidebar