import React, {useEffect, useRef} from "react"
import "./style.css"

function Notification({msg, status}) {
    let elem = useRef(null)

    useEffect(() => {
        const baseTime = 5000

        let hideTimeId = setTimeout(() => {
            if (elem.current !== null)
                elem.current.style.opacity = 0
        }, baseTime)

        let removeTimeId = setTimeout(() => {
            if (elem.current !== null)
                elem.current.remove()
        }, baseTime + 2000)

        return () => {
            clearTimeout(hideTimeId)
            clearTimeout(removeTimeId)
        }
    })
    
    return (
        <div ref={elem} className={`notification notification--${status}`}>{msg}</div>
    )
}

export default Notification