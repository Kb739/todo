import React, { useContext, useState } from 'react'
import { tasksContext } from './contexts/context'

function TaskForm(props) {
    const { lists, getSelectedList, addTask } = useContext(tasksContext)
    const { factoryTask } = getSelectedList()

    const [taskInfo, setTaskInfo] = useState({
        ...factoryTask,
        parentList: factoryTask.parentList || 'default'
    })

    const listSelectOptions = lists.containers.map(list => <option key={list.id} value={list.title}>{list.title}</option>)

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
        addTask(taskInfo)
        props.close()
    }
    return (
        <div className='form--container'>
            <form className='form' onSubmit={handleSubmit}>
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
                    {
                        factoryTask.parentList ? ''
                            : <label>
                                <h4>parentList:</h4>
                                <select name='parentList' value={taskInfo.parentList} onChange={handleChange} >
                                    {listSelectOptions}
                                </select>
                            </label>
                    }
                </section>
                <input className='form--submit' type='submit' value='Submit' />
            </form>
        </div>

    )
}
export default TaskForm