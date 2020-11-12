import React from "react"
import './App.css'
import {MainContextProvider} from "./Components/Context"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Page404 from './Components/Page404'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import Home from './Components/Home'
import Update from './Components/Update'
import AddPlayer from './Components/AddPlayer'

function App() {

  return (
    <MainContextProvider>
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
    </MainContextProvider>
  )
}

export default App
