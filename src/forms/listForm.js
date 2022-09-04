import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { tasksContext } from '../contexts/context'

function ListForm(props) {
    const { addNewList, lists } = useContext(tasksContext)
    const [valid, setValid] = useState(true);
    const [listInfo, setListInfo] = useState({
        title: '',
        description: '',
        editable: true
    })
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
    function isNameValid(name) {
        const found = lists.containers.filter(list => list.editable).find(list => name === list.title)
        return !found;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (isNameValid(listInfo.title)) {
            addNewList(listInfo)
            props.close()
        }
        setValid(false);

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
                    {/* <label className='input'>
                        <h4 className='input--label'>Description:</h4>
                        <textarea name="description" value={listInfo.description} onChange={handleChange}
                            rows={4} placeholder='description' className='textbox' />
                    </label> */}
                </section>
                <input className='form--submit' type='submit' value='Submit' />
            </form>
        </div>

    )
}
export default ListForm