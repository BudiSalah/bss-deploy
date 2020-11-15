import React from "react"
import './App.css'
import { MainContextProvider } from "./Components/Context"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Page404 from './Components/Page404'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import Update from './Components/Update'
import AddPlayer from './Components/AddPlayer'
import ProtectorRoute from "./Components/ProtectorRoute"

function App() {

  return (
    <MainContextProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <ProtectorRoute>
              <Home />
            </ProtectorRoute>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/update">
            <ProtectorRoute>
              <Update />
            </ProtectorRoute>
          </Route>
          <Route path="/add-player">
            <ProtectorRoute>
              <AddPlayer />
            </ProtectorRoute>
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
