import React, { useContext } from "react";
import TaskEdit from "./forms/taskEdit"
import useToggle from "./customHooks/switch";
import { tasksContext } from "./contexts/context";

function Card(props) {
    const { on, toggle } = useToggle();
    const { selections: { taskID } } = useContext(tasksContext)

    function formatTime(time) {
        return new Date(time).toDateString()
    }
    function isSelected() {
        return props.id === taskID
    }

    function edit(event) {
        event.stopPropagation()
        toggle();
    }
    return (
        <div >
            <h4>
                {props.label}
            </h4>
            <p>{formatTime(props.time)}</p>
            {isSelected() ? <button onClick={edit}>edit</button> : ''}
            {on ? <TaskEdit close={toggle} /> : ''}
        </div>
    )
}
export default Card