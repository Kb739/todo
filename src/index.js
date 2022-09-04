import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js"
import { TasksProvider } from './contexts/context'
import { LayoutProvider } from "./contexts/layoutContext.js";
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPenToSquare, faSquare, faSquareCheck, faTrash, faStar, faBars } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarR } from "@fortawesome/free-regular-svg-icons"
library.add(faPenToSquare, faSquare, faSquareCheck, faTrash, faStar, faStarR, faBars)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <div>
        <LayoutProvider>
            <TasksProvider>
                <App />
            </TasksProvider>
        </LayoutProvider>

    </div>)