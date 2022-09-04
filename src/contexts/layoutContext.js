import { createContext, useState } from "react";

const layoutContext = createContext();
function LayoutProvider(props) {
    const [collapseClass, setCollapseClass] = useState('collapse')

    function activateCollapse() {
        setCollapseClass('collapse');
    }

    function deactivateCollapse() {
        setCollapseClass('')
    }
    return (
        <layoutContext.Provider value={{ collapseClass, activateCollapse, deactivateCollapse }}>
            {props.children}
        </layoutContext.Provider>
    )
}
export { layoutContext, LayoutProvider };