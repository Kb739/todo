import React, { useContext } from 'react'
import "./App.css"
import Expand from './expand'
import Sidebar from './sidebar'
import Content from './content'
import { layoutContext } from './contexts/layoutContext'


export default function App() {
    const { activateCollapse } = useContext(layoutContext)

    function blankClick(event) {
        if (event.target.classList.contains('collapser'))
            activateCollapse()
    }

    return (
        <div id='main' className='collapser' onClick={blankClick}>
            <Expand />
            <Sidebar />
            <Content />
        </div>
    )
}