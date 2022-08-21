import React from 'react'
import Task from './task'
function Content() {
    return (
        <div className='content'>
            <h1>
                category title
            </h1>
            <ul className='list'>
                <li className='task'><Task /></li>
                <li className='task'><Task /></li>
                <li className='task'><Task /></li>
                <li className='task'><Task /></li>
            </ul>
        </div>
    )
}
export default Content