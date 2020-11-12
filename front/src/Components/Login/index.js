import React, { useState, useContext } from 'react'
import "./style.css"
import MdKey from 'react-ionicons/lib/MdKey'
import {MainContext} from "./../Context"
import {Redirect} from "react-router-dom"
const axios = require('axios').default

function Login() {
    let {setLoggedIn} = useContext(MainContext)
    let [username, setUsername] = useState("")
    let [pass, setPass] = useState("")
    let [redirect, setRedirect] = useState(false)

    function loginForm(e) {
        let target = e.target
        if (e.target.id === "username") {
            setUsername(target.value)
        } else {
            setPass(target.value)
        }
    }

    function clearInputs() {
        setUsername("")
        setPass("")
    }

    function submitLogin(e) {
        e.preventDefault()
        axios.post("/login", {user: username, password: pass}).then( res => {
            // if user credentials are correct
            clearInputs()
            
            // set loggedIn state to true
            setLoggedIn(true)

            // redirect the user to home
            setRedirect(true)
        }).catch (err => {
            // send error notification message to the user
            alert("Wrong credentials, Please try again!")
        })
    }

    return (
        <>
            {redirect ? (
                <Redirect to="/"/>
            ) : (
                <div className="Login">
                    <div className="container container--sign-form">
                        <form className="form form--sign" onSubmit={submitLogin}>
                            <div className="fieldset">
                                <label htmlFor="username" className="fieldset__label">Username</label>
                                <input type="text" id="username" className="fieldset__input" value={username} onChange={loginForm} />
                            </div>
                            <div className="fieldset">
                                <label htmlFor="password" className="fieldset__label">Password</label>
                                <input type="password" id="password" className="fieldset__input" value={pass} onChange={loginForm} />
                            </div>
                            <div className="fieldset">
                                <button className="btn btn--text-center fieldset__input">
                                    <MdKey className="btn__icon" fontSize="16px" color="#ffffff" />
                                    <span className="btn__text">Login</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login
