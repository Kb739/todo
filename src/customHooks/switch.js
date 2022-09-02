import { useState } from "react";

export default function useToggle(value) {
    const [on, setOn] = useState(value);

    function toggle() {
        setOn(prev => !prev)
    }
    return { on, toggle }
}