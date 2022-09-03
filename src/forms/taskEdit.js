import React, { useContext, useState } from 'react'
import { tasksContext } from '../contexts/context'

function TaskEdit(props) {
    const { updateTask, getSelectedTask } = useContext(tasksContext)
    const [taskInfo, setTaskInfo] = useState({ ...getSelectedTask() })

    function handleChange(event) {
        const { name, value } = event.target
        const v = name === 'dueTime' ? new Date(value).getTime() : value;
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

    return (
        <div className='form--container'>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form--cancel' onClick={cancel}>X</div>
                <section>
                    <label className='input'>
                        <h4 className='input--label'>Name:</h4>
                        <input type='text' name="title" value={taskInfo.title} onChange={handleChange} className='textbox' />
                    </label>
                    <label className='input'>
                        <h4 className='input--label'>Description:</h4>
                        <textarea name="description" value={taskInfo.description} onChange={handleChange}
                            rows={4} placeholder='description' className='textbox' />
                    </label>
                    <input type='date' name='dueTime' onChange={handleChange} />
                </section>
                <input className='form--submit' type='submit' value='Submit' />
            </form>
        </div>

    )
}
export default TaskEdit