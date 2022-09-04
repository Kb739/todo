import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { layoutContext } from "./contexts/layoutContext";
function Expand() {
    const { deactivateCollapse } = useContext(layoutContext);

    function revealLists(e) {
        deactivateCollapse();
    }
    return (
        <FontAwesomeIcon onClick={revealLists}
            className="sidebar-button pointer" icon='fa-bars' />
    )
}
export default Expand