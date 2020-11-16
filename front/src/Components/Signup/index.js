import React, { useState, useEffect, useContext } from 'react'
import "./style.css"
import IosClipboard from 'react-ionicons/lib/IosClipboard'
import { Redirect, Link } from "react-router-dom"
import Notification from "./../Feedback/Notification"
import { MainContext } from "./../Context"
const axios = require("axios").default

function Signup() {
    let { setSignup } = useContext(MainContext)
    const USER_MIN_LEN = 4
    const USER_MAX_LEN = 30
    const PASS_MIN_LEN = 6
    const PASS_MAX_LEN = 20
    let [username, setUsername] = useState("")
    let [pass, setPass] = useState("")
    let [confirmPass, setConfirmPass] = useState("")
    let [redirect, setRedirect] = useState(false)
    let [showNoti, setShowNoti] = useState([false, { mesg: "", status: "" }])
    let [submited, setSubmited] = useState(false)

    function loginForm(e) {
        let target = e.target
        if (e.target.id === "username") {
            setUsername(target.value)
        } else if (e.target.id === "password") {
            setPass(target.value)
        } else {
            setConfirmPass(target.value)
        }
    }

    function clearInputs() {
        setUsername("")
        setPass("")
        setConfirmPass("")
    }

    function submitSignup(e) {
        e.preventDefault()

        setSubmited(true)

        if (username === "" || username.length < USER_MIN_LEN) {
            setShowNoti([true, { mesg: "Username is too short. Try again!", status: "faild" }])
            setSubmited(false)
            return
        }

        if (username.length > USER_MAX_LEN) {
            setShowNoti([true, { mesg: "Username is too long. Try again!", status: "faild" }])
            setSubmited(false)
            return
        }

        if (pass === "" || pass.length < PASS_MIN_LEN) {
            setShowNoti([true, { mesg: "Password is too short. Try again!", status: "faild" }])
            setSubmited(false)
            return
        }

        if (pass.length > PASS_MAX_LEN) {
            setShowNoti([true, { mesg: "Password is too long. Try again!", status: "faild" }])
            setSubmited(false)
            return
        }

        if (confirmPass !== pass) {
            setShowNoti([true, { mesg: "Passwords not matched. Try again!", status: "faild" }])
            setSubmited(false)
            return
        }

        axios.post("/signup", { name: username, password: pass }).then(res => {
            clearInputs()
            setSignup(true)
            setRedirect(true)
            setSubmited(false)
        }).catch(err => {
            setSubmited(false)
            setShowNoti([true, { mesg: "User already exists!", status: "faild" }])
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

    return (
        <>
            {redirect ? (
                <Redirect to="/login" />
            ) : (
                    <div className="Login">
                        <div className="container container--sign-form">
                            <form className="form form--sign" onSubmit={submitSignup} noValidate>
                                <div className="fieldset">
                                    <label htmlFor="username" className="fieldset__label">Username</label>
                                    <input type="text" id="username" className="fieldset__input" value={username} onChange={loginForm} minLength="4" autoComplete="off" />
                                    <small className="form__info">Minimum {USER_MIN_LEN} maximum {USER_MAX_LEN}</small>
                                </div>
                                <div className="fieldset">
                                    <label htmlFor="password" className="fieldset__label">Password</label>
                                    <input type="password" id="password" className="fieldset__input" value={pass} onChange={loginForm} minLength="6" autoComplete="new-password" />
                                    <small className="form__info">Minimum {PASS_MIN_LEN} maximum {PASS_MAX_LEN}</small>
                                </div>
                                <div className="fieldset">
                                    <label htmlFor="confirm-password" className="fieldset__label">Confirm Password</label>
                                    <input type="password" id="confirm-password" className="fieldset__input" value={confirmPass} onChange={loginForm} minLength="6" autoComplete="off" />
                                </div>
                                <div className="fieldset">
                                    <button className={`btn btn--text-center fieldset__input ${submited ? "fieldset__input--hidden" : ""}`} disabled={submited}>
                                        <IosClipboard className="btn__icon" fontSize="16px" color="#ffffff" />
                                        <span className="btn__text">Signup</span>
                                    </button>
                                </div>
                            </form>

                            <h5 className="inup-user">Already a user? <Link to="/login">Login</Link></h5>
                        </div>

                        {showNoti[0] && <Notification msg={showNoti[1].mesg} status={showNoti[1].status} />}
                    </div>
                )}
        </>
    )
}

export default Signup
