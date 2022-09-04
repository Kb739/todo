import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { tasksContext } from '../contexts/context'

function TaskEdit(props) {
    const { updateTask, getSelectedTask } = useContext(tasksContext)
    const [taskInfo, setTaskInfo] = useState({ ...getSelectedTask() })

    function handleChange(event) {
        const { name, value } = event.target
        const v = name === 'dueTime' ? value && new Date(value).getTime() : value;
        setTaskInfo(prevInfo => {
            return {
                ...prevInfo,
                [name]: v
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        updateTask(taskInfo)
        props.close()
    }

    function cancel() {
        props.close();
    }

    function timeToDate(time) {
        const date = time && new Date(time).toISOString().slice(0, 10);
        return date;
    }

    return (
        <div className='form--container'>
            <form className='form' onSubmit={handleSubmit}>
                <FontAwesomeIcon className='form--cancel pointer' icon='fa-xmark' size='xl' color='red' onClick={cancel} />
                <section>
                    <label className='input'>
                        <h4 className='input--label'>Name:</h4>
                        <input type='text' name="title" value={taskInfo.title} onChange={handleChange} className='textbox' required={true} />
                    </label>
                    <label className='input'>
                        <h4 className='input--label'>Description:</h4>
                        <textarea name="description" value={taskInfo.description} onChange={handleChange}
                            rows={4} placeholder='description' className='textbox' />
                    </label>
                    <label className='input'>
                        <h4 className='input--label'>Date:</h4>
                        <input type='date' name='dueTime' value={timeToDate(taskInfo.dueTime)} onChange={handleChange} />
                    </label>

                </section>
                <input className='form--submit' type='submit' value='Submit' />
            </form>
        </div>

    )
}
export default TaskEdit