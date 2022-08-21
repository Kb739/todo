import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js"
import { TasksProvider } from './contexts/context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <div>
        <TasksProvider>
            <App />
        </TasksProvider>
    </div>)