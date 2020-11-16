import React, { useState, useEffect, useContext } from 'react'
import "./style.css"
import MdKey from 'react-ionicons/lib/MdKey'
import {MainContext} from "./../Context"
import {Redirect, Link} from "react-router-dom"
import Notification from "./../Feedback/Notification"
const axios = require('axios').default

function Login() {
    let {setLoggedIn, signup, setSignup} = useContext(MainContext)
    let [username, setUsername] = useState("")
    let [pass, setPass] = useState("")
    let [redirect, setRedirect] = useState(false)
    let [showNoti, setShowNoti] = useState([false, {mesg: "", status: ""}])
    let [submited, setSubmited] = useState(false)

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
        setSubmited(true)
        axios.post("/login", {user: username, password: pass}).then( res => {
            clearInputs()
            setLoggedIn(true)
            setRedirect(true)
            setSubmited(false)
        }).catch (err => {
            setShowNoti([true, {mesg: "Wrong id or password. Try again!", status: "faild"}])
            setSubmited(false)
        })
    }

    useEffect(() => {
        let timeId = null

        if (showNoti[0] === true) {
            timeId = setTimeout(() => setShowNoti([false]), 5000)
        }

        return () => {
            clearTimeout(timeId)
        }
    }, [showNoti])

    useEffect(() => {
        if (signup) {
            setShowNoti([true, {mesg: "You successfuly made a new account!", status: "success"}])
            setSignup(false)
        }
    }, [signup, setShowNoti, setSignup])

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
                                <button className={`btn btn--text-center fieldset__input ${submited ? "fieldset__input--hidden" : ""}`} disabled={submited}>
                                    <MdKey className="btn__icon" fontSize="16px" color="#ffffff" />
                                    <span className="btn__text">Login</span>
                                </button>
                            </div>
                        </form>

                        <h5 className="inup-user">New user? <Link to="/signup">Sign up</Link></h5>
                    </div>

                    {showNoti[0] && <Notification msg={showNoti[1].mesg} status={showNoti[1].status} />}
                </div>
            )}
        </>
    )
}

export default Login
