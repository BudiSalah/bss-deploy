import React, { useEffect, useState, useContext } from "react"
import {MainContext} from "./Context"
import {Redirect} from "react-router-dom"
const axios = require("axios").default

function ProtectorRoute(props) {
    let { loggedIn, setLoggedIn } = useContext(MainContext)
    const [looding, setLooding] = useState(true)

    useEffect(() => {
        // check first if user logged in and set the logged in state
        axios.get("/auth").then(res => {
            const {data} = res
            data.status === "success" ? setLoggedIn(true) : setLoggedIn(false)
            setLooding(false)
        })
    }, [loggedIn, setLoggedIn])

    return (
        <>
            {
                looding ? (
                    <h1>looding!</h1>
                ) : (
                    loggedIn ? (
                        props.children
                    ) : (
                        <Redirect to={{pathname: "/login"}} />
                    )
                )
            }
        </>
    )
}

export default ProtectorRoute