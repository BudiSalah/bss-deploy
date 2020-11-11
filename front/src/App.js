import React, {useEffect, useReducer} from "react"
import './App.css'
import {MainContext} from "./Components/Context"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Page404 from './Components/Page404'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import Home from './Components/Home'
import Update from './Components/Update'
import AddPlayer from './Components/AddPlayer'
import {staticUsers} from "./Components/Data/users"

function App() {

  const defaultState = {
    ready: "No",
    users: []
  }

  function reducer(currentState, action) {
    switch (action.type) {
      case "GET_USERS":
        return {
          ...currentState,
          ready: "Yes",
          users: staticUsers
        }
      default:
        throw new Error("Budi Reducer Error")
    }
  }

  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    dispatch({type: "GET_USERS"})
  }, [])

  return (
    <MainContext.Provider value={state}>
      {console.log(state)}
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/update">
            <Update />
          </Route>
          <Route path="/add-player">
            <AddPlayer />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </MainContext.Provider>
  )
}

export default App
