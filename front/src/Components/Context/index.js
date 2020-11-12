import React, {useState, useEffect} from "react"
import {staticUsers} from "./../Data/users"

export const MainContext = React.createContext()

export const MainContextProvider = (props) => {
    let globalState = {}

    const [loggedIn, setLoggedIn] = useState(false)
    globalState = {...globalState, loggedIn, setLoggedIn}
    
    const [users, setUsers] = useState([])
    globalState = {...globalState, users, setUsers}

    // move this to home component
    // move this to home component
    // move this to home component
    useEffect(() => {
        // if user logged in get users and set them
        setUsers(staticUsers)
    }, [])

    return (
        <MainContext.Provider value={globalState}>
            {props.children}
        </MainContext.Provider>
    )
}
