import React from 'react'
import "./App.css"
import Sidebar from './sidebar'
import Content from './content'

export default function App() {
    return (
        <div id='main'>
            <Sidebar />
            <Content />
        </div>
    )
}