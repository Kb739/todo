import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useToggle from "./customHooks/switch";
import { tasksContext } from "./contexts/context";
import ListEdit from "./forms/listEdit";

function Card(props) {
    const { selections: { listID }, removeList } = useContext(tasksContext)
    const { id, title, editable } = props.list;
    const { on, toggle } = useToggle(false);

    function deleteList() {
        removeList(id);
    }

    function isSelected() {
        return id === listID
    }

    const selected = isSelected();
    return (
        <>
            <h4 className="list--head collapser">
                {title}
            </h4>
            {editable ?
                <>
                    {selected ? <FontAwesomeIcon className="pointer" icon='fa-pen-to-square' size="lg" onClick={toggle} /> : ''}
                    {selected ? <FontAwesomeIcon className="pointer" onClick={deleteList} icon="fa-trash" /> : ''}
                </> : ''
            }
            {on ? <ListEdit close={toggle} /> : ''}
        </>
    )
}
export default Card