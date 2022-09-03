import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js"
import { TasksProvider } from './contexts/context'

import { library } from "@fortawesome/fontawesome-svg-core"
import { faPenToSquare, faSquare, faSquareCheck, faTrash, faStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarR } from "@fortawesome/free-regular-svg-icons"
library.add(faPenToSquare, faSquare, faSquareCheck, faTrash, faStar, faStarR)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <div>
        <TasksProvider>
            <App />
        </TasksProvider>
    </div>)