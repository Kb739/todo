import React, { useContext } from "react";
import TaskEdit from "./forms/taskEdit"
import useToggle from "./customHooks/switch";
import { tasksContext } from "./contexts/context";

function Card(props) {
    const { selections: { taskID }, updateTask, removeTask } = useContext(tasksContext)
    const { id, title, isImportant, finished, dueTime } = props.task;
    const { on, toggle } = useToggle(false);

    function formatTime(time) {
        return time && new Date(time).toDateString()
    }

    function isSelected() {
        return id === taskID
    }

    function toggleImportant(event) {
        event.stopPropagation()
        updateTask({
            ...props.task,
            isImportant: !isImportant
        })
    }

    function toggleCompletion(event) {
        event.stopPropagation()
        updateTask({
            ...props.task,
            finished: !finished
        })
    }
    function deleteTask(event) {
        event.stopPropagation()
        removeTask(id)
    }

    const starElement = <p onClick={toggleImportant}>{isImportant ? '+' : '-'}</p>
    const circleElement = <p onClick={toggleCompletion}>{finished ? '++' : '--'}</p>

    return (
        <div >
            <h4>
                {title}
            </h4>
            {starElement}
            {circleElement}
            <p onClick={deleteTask}>delete</p>
            <p>{formatTime(dueTime)}</p>
            {isSelected() ? <button onClick={toggle}>edit</button> : ''}
            {on ? <TaskEdit close={toggle} /> : ''}
        </div>
    )
}
export default Card