import { useState, useEffect } from 'react'

export default function useModeType() {

    const [isLightMode, toggleMode] = useState(false);

    useEffect(() => {
        if (localStorage) {
            toggleMode(!!JSON.parse(localStorage.getItem("isLightMode")))
        }
    }, [])

    return [isLightMode, toggleMode]
}