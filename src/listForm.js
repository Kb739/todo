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
    async function handleSubmit(event) {
        event.preventDefault();
        await addNewList(listInfo)
        props.submit()
    }
    return (
        <div className='form'>
            <form onSubmit={(event) => handleSubmit(event)}>
                <label>
                    Name:
                    <input type='text' name="title" value={listInfo.title} onChange={handleChange} />
                </label>
                <input type='submit' value='Submit' />
            </form>
        </div>

    )
}
export default ListForm