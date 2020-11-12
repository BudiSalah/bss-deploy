import React, { useEffect, useState, useContext } from "react"
import { MainContext } from "./Context"
import { Redirect } from "react-router-dom"
import Looding from "./Feedback/Looding"
const axios = require("axios").default

function ProtectorRoute(props) {
    let { loggedIn, setLoggedIn, setCredential } = useContext(MainContext)
    const [looding, setLooding] = useState(true)

    useEffect(() => {
        // check first if user logged in and set the logged in state
        if (looding) {
            axios.get("/auth").then(res => {
                const { data } = res
                data.status === "success" ? setLoggedIn(true) : setLoggedIn(false)
                setCredential(data.parse)

                setLooding(false)
            }).catch(err => {
                setLooding(false)
            })
        }
    })

    return (
        <>
            {
                looding ? (
                    <Looding />
                ) : (
                        loggedIn ? (
                            <>
                                <Looding done="done" />
                                {props.children}
                            </>
                        ) : (
                                <Redirect to={{ pathname: "/login" }} />
                            )
                    )
            }
        </>
    )
}

export default ProtectorRoute