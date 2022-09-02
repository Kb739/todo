import { useContext, useState } from 'react'
import { tasksContext } from './contexts/context'

function ListForm(props) {
    const { addNewList } = useContext(tasksContext)
    const [listInfo, setListInfo] = useState({
        title: '',
        description: ''
    })
    function handleChange(event) {
        const { name, value } = event.target
        setListInfo(prevInfo => {
            return {
                ...prevInfo,
                [name]: value
            }
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        addNewList(listInfo)
        props.close()
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
                </section>
                <input className='form--submit' type='submit' value='Submit' />
            </form>
        </div>

    )
}
export default ListForm