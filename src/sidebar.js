import React from 'react'
import Category from './category'
function Sidebar() {
    return (
        <div className='sidebar'>
            <ul className='list'>
                <li className='category'><Category /></li>
                <li className='category'><Category /></li>
                <li className='category'><Category /></li>
            </ul>
            <ul className='list'>
                <li className='category'><Category /></li>
                <li className='category'><Category /></li>
                <li className='category'><Category /></li>
            </ul>
        </div>
    )
}
export default Sidebar