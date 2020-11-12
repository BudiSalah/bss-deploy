import React, {useState, useEffect} from "react"

function Looding({done}) {
    const [finish, setFinish] = useState(false)

    let styleObj = {
        width: "0",
        height: "4px",
        backgroundColor: "#5321c2",
        animationName: "looding",
        animationFillMode: "forwards",
        animationDuration: "10s"
    }

    useEffect(() => {
        if (done === "done") {
            setTimeout(() => setFinish(true), 1000)
        }
    }, [done])

    return (
        <div 
            className={`looding ${done}`}
            style={!finish ? styleObj : {...styleObj, opacity: "0"}}
        />
    )
}

export default Looding