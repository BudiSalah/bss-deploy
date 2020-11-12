import React, { useContext } from "react"
import {MainContext} from "./Context"
import {Redirect} from "react-router-dom"

function ProtectorRoute(props) {
    let { loggedIn } = useContext(MainContext)

    return (
        <>
            {
                loggedIn ? (
                    props.children
                ) : (
                    <Redirect to={{pathname: "/login"}} />
                )
            }
        </>
    )
}

export default ProtectorRoute