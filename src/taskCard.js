import React, { useContext } from "react";
import TaskEdit from "./forms/taskEdit"
import useToggle from "./customHooks/switch";
import { tasksContext } from "./contexts/context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

    const starElement = <FontAwesomeIcon onClick={toggleImportant}
        icon={isImportant ? "fa-star" : "fa-regular fa-star"}
        color={isImportant ? 'yellow' : 'grey'}
        size='lg' />

    const circleElement = <FontAwesomeIcon onClick={toggleCompletion}
        icon={finished ? 'fa-square-check' : 'fa-square'} size='lg'
        color={finished ? 'lightBlue' : ''}
        className='pointer' />

    const selected = isSelected();
    return (
        <>
            <section>
                <div className="task--head">
                    {circleElement}
                    <h4>
                        {title}
                    </h4>
                </div>
                <p className="task--date">{formatTime(dueTime)}</p>
            </section>
            <section>
                {selected ? <FontAwesomeIcon className="pointer" icon='fa-pen-to-square' size="lg" onClick={toggle} /> : ''}
                {selected ? <FontAwesomeIcon className="pointer" onClick={deleteTask} icon="fa-trash" /> : ''}
            </section>
            <section>
                {starElement}
            </section>

            {on ? <TaskEdit close={toggle} /> : ''}
        </>
    )
}
export default Card