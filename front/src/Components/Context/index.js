import React, {useState} from "react"

export const MainContext = React.createContext()

export const MainContextProvider = (props) => {
    let globalState = {}

    const [loggedIn, setLoggedIn] = useState(false)
    globalState = {...globalState, loggedIn, setLoggedIn}
    
    const [users, setUsers] = useState([])
    globalState = {...globalState, users, setUsers}
    
    const [credential, setCredential] = useState({})
    globalState = {...globalState, credential, setCredential}

    return (
        <MainContext.Provider value={globalState}>
            {props.children}
        </MainContext.Provider>
    )
}
