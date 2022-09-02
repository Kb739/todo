import React from "react";

function Card(props) {
    function formatTime(time) {
        return new Date(time).toDateString()
    }
    return (
        <>
            <h4>
                {props.label}
            </h4>
            <p>{formatTime(props.time)}</p>
        </>
    )
}
export default Card