import React, { useState } from 'react'
function TaskForm(props) {
    const [taskInfo, setTaskInfo] = useState(props.task)

    function handleChange(event) {
        const { name, value } = event.target
        setListInfo(prevInfo => {
            return {
                ...prevInfo,
                [name]: value
            }
        })
    }
    async function handleSubmit(event) {
        event.preventDefault();
        await addNewList(listInfo)
        props.submit()
    }
    return (
        <div className='form--container'>
            <form className='form' onSubmit={(event) => handleSubmit(event)}>
                <section>
                    <label className='input'>
                        <h4 className='input--label'>Name:</h4>
                        <input type='text' name="title" value={listInfo.title} onChange={handleChange} className='textbox' />
                    </label>
                    <label className='input'>
                        <h4 className='input--label'>Description:</h4>
                        <textarea name="description" value={listInfo.description} onChange={handleChange}
                            rows={4} placeholder='description' className='textbox' />
                    </label>
                    {
                        taskInfo.list ? ''
                            : <label>
                                <h4>parentList:</h4>
                                <input type="selection" />
                            </label>
                    }
                </section>
                <input className='form--submit' type='submit' value='Submit' />
            </form>
        </div>

    )
}
export default ListForm