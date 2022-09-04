import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { tasksContext } from '../contexts/context'

function ListEdit(props) {
    const { updateList, getSelectedList, lists } = useContext(tasksContext)
    const [valid, setValid] = useState(true);
    const [listInfo, setListInfo] = useState({ ...getSelectedList() })

    function handleChange(event) {
        const { name, value } = event.target
        if (name === 'title' && !valid)
            setValid(true);
        setListInfo(prevInfo => {
            return {
                ...prevInfo,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (isNameValid(listInfo.title)) {
            updateList(listInfo)
            props.close()
        }
        setValid(false);

    }

    function isNameValid(name) {
        const found = lists.containers.filter(list => list.editable && list.id !== listInfo.id)
            .find(list => name === list.title)
        return !found;
    }

    function cancel() {
        props.close();
    }

    return (
        <div className='form--container'>
            <form className='form' onSubmit={handleSubmit}>
                <FontAwesomeIcon className='form--cancel pointer' icon='fa-xmark' size='xl' color='red' onClick={cancel} />

                <section>
                    <label className='input'>
                        <h4 className='input--label'>Name:</h4>
                        <input type='text' name="title" value={listInfo.title} onChange={handleChange} className='textbox' required={true} />
                        {valid ? '' : <span className="title-error"></span>}
                    </label>
                </section>
                <input className='form--submit' type='submit' value='Submit' />
            </form>
        </div>

    )
}
export default ListEdit